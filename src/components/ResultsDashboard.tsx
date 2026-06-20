import { MealPlanResponse } from '../types';
import { SummaryCard } from './SummaryCard';
import { TodoChecklist } from './TodoChecklist';
import { MealCard } from './MealCard';
import { GroceryList } from './GroceryList';
import { BudgetAnalysis } from './BudgetAnalysis';

export function ResultsDashboard({ plan }: { plan: MealPlanResponse | null }) {
  if (!plan) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl">
         <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
             <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
         </div>
         <h3 className="text-xl font-bold text-gray-900">Your Plan Appears Here</h3>
         <p className="text-gray-500 mt-2 max-w-sm">Fill out the planner form to generate a chronological cooking to-do list, meal plan, and budget analysis.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SummaryCard data={plan} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Today's Meals</h3>
              <div className="space-y-4">
                  {plan.meals.map((meal, idx) => (
                      <MealCard key={idx} meal={meal} />
                  ))}
              </div>
          </div>
          
          <div className="space-y-6">
              <TodoChecklist items={plan.todoChecklist} />
              <BudgetAnalysis data={plan.budgetAnalysis} />
              <GroceryList items={plan.groceryList} />
          </div>
      </div>
    </div>
  );
}
