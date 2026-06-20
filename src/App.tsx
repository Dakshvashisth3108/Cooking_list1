import { useState, useEffect } from 'react';
import { PlannerForm } from './components/PlannerForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { PlannerInput, MealPlanResponse } from './types';

export default function App() {
  const [plan, setPlan] = useState<MealPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mealmap_last_plan');
      if (saved) {
        setPlan(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to restore plan from local storage", e);
    }
  }, []);

  const handleGenerate = async (input: PlannerInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate plan. The server encountered an issue.');
      }
      
      const data: MealPlanResponse = await response.json();
      setPlan(data);
      
      try {
        localStorage.setItem('mealmap_last_plan', JSON.stringify(data));
      } catch (e) {
         // ignore storage quotas limits
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg border border-indigo-700">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </div>
            <h1 className="text-xl font-black tracking-tight text-gray-900">MealMap</h1>
            <span className="hidden sm:inline-block ml-3 px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-200 rounded-md text-[10px] font-bold uppercase tracking-wider">Cooking To-Do Planner</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative">
            <div className="xl:col-span-4 self-start xl:sticky xl:top-24 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto pb-4 hide-scrollbar">
                <div className="mb-6">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Plan Your Day</h2>
                    <p className="text-sm text-gray-500 mt-1">Generate a synchronized cooking checklist to save time in the kitchen.</p>
                </div>
                {error && (
                    <div className="p-4 mb-6 text-sm text-red-900 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <div>
                            <span className="font-bold block mb-1">Oh snap! Something went wrong.</span>
                            {error}
                        </div>
                    </div>
                )}
                <PlannerForm onSubmit={handleGenerate} loading={loading} />
            </div>
            
            <div className="xl:col-span-8 relative">
               {loading && (
                   <div className="absolute inset-0 z-20 bg-gray-50/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl min-h-[400px]">
                       <div className="w-16 h-16 relative">
                           <div className="w-16 h-16 rounded-full border-4 border-indigo-100"></div>
                           <div className="w-16 h-16 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin absolute inset-0"></div>
                       </div>
                       <h3 className="text-xl font-bold text-gray-900 mt-6">Crafting Your Plan</h3>
                       <p className="text-gray-600 mt-2 text-sm text-center max-w-sm">
                           Analyzing your day, verifying pantry stock, and structuring your to-do list...
                       </p>
                   </div>
               )}
               <div className={loading ? 'opacity-30 pointer-events-none transition-opacity duration-300' : 'transition-opacity duration-300'}>
                   <ResultsDashboard plan={plan} />
               </div>
            </div>
        </div>
      </main>
    </div>
  );
}
