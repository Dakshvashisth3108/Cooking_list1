import { MealPlanResponse } from '../types';
import { formatCurrency } from '../lib/utils';

export function SummaryCard({ data }: { data: MealPlanResponse }) {
  const { dailySummary, fitExplanation } = data;
  return (
    <div className="bg-gray-900 text-white rounded-xl overflow-hidden shadow-md border border-gray-800">
      <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Your Cooking Plan is Ready.</h2>
                  <p className="text-gray-300 mt-1">{dailySummary.cookingStyleSummary}</p>
              </div>
              <div className="flex gap-4">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-center min-w-[80px]">
                      <div className="text-2xl font-bold">{dailySummary.totalMealsPlanned}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-1">Meals</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-center min-w-[80px]">
                      <div className="text-2xl font-bold">{formatCurrency(dailySummary.estimatedTotalSpend)}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-1">Est. Cost</div>
                  </div>
              </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Why this fits your day
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                  {fitExplanation}
              </p>
          </div>
      </div>
    </div>
  );
}
