import { BudgetAnalysisType } from '../types';
import { formatCurrency } from '../lib/utils';

export function BudgetAnalysis({ data }: { data: BudgetAnalysisType }) {
  const isOver = data.status !== 'within_budget';
  const statusColor = data.status === 'within_budget' ? 'text-green-700 bg-green-50 border-green-200' :
                      data.status === 'slightly_above_budget' ? 'text-orange-700 bg-orange-50 border-orange-200' :
                      'text-red-700 bg-red-50 border-red-200';

  return (
    <div className={`rounded-xl border p-5 ${statusColor} shadow-sm`}>
      <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Budget Feasibility
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <div className="bg-white/60 p-3 rounded-lg border border-black/5">
            <div className="text-xs uppercase tracking-wider opacity-70 mb-1">Cost</div>
            <div className="font-bold text-xl">{formatCurrency(data.totalEstimatedCost)}</div>
        </div>
        <div className="bg-white/60 p-3 rounded-lg border border-black/5">
            <div className="text-xs uppercase tracking-wider opacity-70 mb-1">Budget</div>
            <div className="font-bold text-xl">{formatCurrency(data.userBudget)}</div>
        </div>
         <div className="bg-white/60 p-3 rounded-lg border border-black/5 col-span-2 md:col-span-2 flex items-center justify-between">
            <div>
               <div className="text-xs uppercase tracking-wider opacity-70 mb-1">Difference</div>
               <div className={`font-bold text-xl ${isOver ? 'text-red-600' : 'text-green-600'}`}>
                   {isOver ? '+' : ''}{formatCurrency(Math.abs(data.difference))}
               </div>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded-md bg-white border border-black/10">
                {data.status.replace(/_/g, ' ')}
            </span>
        </div>
      </div>

      {isOver && data.expensiveItems.length > 0 && (
         <div className="mb-4">
             <h4 className="text-sm font-bold opacity-80 mb-1">Cost Drivers</h4>
             <p className="text-sm opacity-90">Watch out for: {data.expensiveItems.join(', ')}</p>
         </div>
      )}

      {data.savingsSuggestions.length > 0 && (
         <div className="bg-white/50 p-3 rounded-lg border border-black/10">
             <h4 className="text-xs font-bold uppercase tracking-wide opacity-70 flex items-center gap-1 mb-2">
                 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 Savings Tips
             </h4>
             <ul className="text-sm space-y-1 opacity-90 pl-4 list-disc">
                 {data.savingsSuggestions.map((tip, idx) => (
                     <li key={idx}>{tip}</li>
                 ))}
             </ul>
         </div>
      )}
    </div>
  );
}
