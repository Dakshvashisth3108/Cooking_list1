interface MealCardProps {
  key?: string | number;
  meal: {
    mealType: string;
    name: string;
    description: string;
    timeMinutes: number;
    estimatedCost: number;
    rationale: string;
    ingredients: string[];
    steps: string[];
    pantryUsed: string[];
    substitutions: string[];
    tags: string[];
  };
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-100 px-2 py-1 rounded-full mb-2 inline-block">
            {meal.mealType}
          </span>
          <h3 className="text-xl font-bold text-gray-900">{meal.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{meal.description}</p>
        </div>
        <div className="text-right flex space-x-2">
            <div className="bg-white px-3 py-1 rounded-md border border-gray-200 text-xs text-gray-700 whitespace-nowrap">⏱ {meal.timeMinutes}m</div>
            <div className="bg-white px-3 py-1 rounded-md border border-gray-200 text-xs text-gray-700 whitespace-nowrap">₹{meal.estimatedCost}</div>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
           <p className="text-sm text-gray-700 italic bg-blue-50 p-3 rounded-lg border border-blue-100 border-l-4 border-l-blue-400">"{meal.rationale}"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h4 className="font-semibold text-sm text-gray-900 border-b border-gray-100 pb-1 mb-2">Ingredients</h4>
                <ul className="text-sm space-y-1 text-gray-600 list-disc pl-4 marker:text-gray-300">
                {meal.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                ))}
                </ul>
            </div>
            {meal.pantryUsed.length > 0 && (
            <div>
                 <h4 className="font-semibold text-sm text-gray-900 border-b border-gray-100 pb-1 mb-2">From Your Pantry</h4>
                <div className="flex flex-wrap gap-2">
                    {meal.pantryUsed.map((ing, idx) => (
                        <span key={idx} className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs px-2 py-1 rounded-md">
                            {ing}
                        </span>
                    ))}
                </div>
            </div>
            )}
        </div>

        <div>
            <h4 className="font-semibold text-sm text-gray-900 border-b border-gray-100 pb-1 mb-2">Instructions</h4>
            <ol className="text-sm space-y-2 text-gray-700 list-decimal pl-4 marker:font-medium marker:text-gray-400">
            {meal.steps.map((step, idx) => (
                <li key={idx} className="pl-1">{step}</li>
            ))}
            </ol>
        </div>

        {meal.substitutions.length > 0 && (
          <div className="pt-2 border-t border-gray-100">
              <h4 className="font-medium text-xs text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Smart Substitutions
              </h4>
             <ul className="text-xs space-y-1 text-gray-500 list-disc pl-4">
             {meal.substitutions.map((sub, idx) => (
                 <li key={idx}>{sub}</li>
             ))}
             </ul>
          </div>
        )}
      </div>
    </div>
  );
}
