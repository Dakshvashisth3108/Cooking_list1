import { GroceryItemType } from '../types';

export function GroceryList({ items }: { items: GroceryItemType[] }) {
  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Aggregated Grocery List
        </h3>
      </div>
      <div className="p-5">
        {categories.length === 0 ? (
            <p className="text-gray-500 text-sm">No items to buy! Everything is covered by pantry.</p>
        ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {categories.map((cat, idx) => (
                    <div key={idx}>
                        <h4 className="font-semibold text-sm text-gray-900 border-b border-gray-100 pb-1 mb-2 capitalize">{cat}</h4>
                        <ul className="text-sm space-y-2">
                            {items.filter(i => i.category === cat).map((item, j) => (
                                <li key={j} className="flex justify-between items-start group">
                                    <label className="flex items-start gap-2 cursor-pointer flex-1">
                                        <input type="checkbox" className="mt-1 flex-shrink-0 text-green-600 focus:ring-green-500 rounded border-gray-300" />
                                        <span className="text-gray-700">
                                            <span className="font-medium">{item.name}</span> <span className="text-gray-500">({item.quantity})</span>
                                            <div className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide">For: {item.usedInMeals.join(', ')}</div>
                                        </span>
                                    </label>
                                    {item.alreadyInPantry && (
                                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] px-1.5 py-0.5 rounded-md self-start mt-0.5 ml-2 whitespace-nowrap">
                                            Have it
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                 ))}
             </div>
        )}
      </div>
    </div>
  );
}
