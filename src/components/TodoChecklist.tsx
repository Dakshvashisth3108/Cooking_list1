import { TodoItemType } from '../types';

export function TodoChecklist({ items }: { items: TodoItemType[] }) {
  // Use a predefined order for time slots
  const timeSlotOrder = [
    'Morning prep', 
    'Shopping tasks', 
    'Lunch prep', 
    'Evening prep', 
    'Dinner prep', 
    'Leftover / storage note', 
    'Night prep'
  ];

  const grouped = items.reduce((acc, item) => {
    if (!acc[item.timeSlot]) acc[item.timeSlot] = [];
    acc[item.timeSlot].push(item);
    return acc;
  }, {} as Record<string, TodoItemType[]>);

  const sortedSlots = Object.keys(grouped).sort((a, b) => timeSlotOrder.indexOf(a) - timeSlotOrder.indexOf(b));

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm relative">
       <div className="absolute top-0 left-0 w-1 h-full bg-gray-900"></div>
       <div className="bg-gray-50 border-b border-gray-200 px-5 py-4 pl-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            Today's Cooking To-Do
        </h3>
        <p className="text-xs text-gray-500 mt-1">Chronological plan to save time across your meals</p>
      </div>

      <div className="p-5 pl-6 space-y-6">
        {sortedSlots.map((slot, idx) => (
            <div key={idx} className="relative">
                 {/* Timeline line */}
                 {idx < sortedSlots.length - 1 && (
                     <div className="absolute top-4 left-2.5 w-0.5 h-[calc(100%+16px)] bg-gray-100"></div>
                 )}
                 
                 <div className="flex items-start gap-3">
                     <div className="w-5 h-5 mt-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0 z-10 relative shadow-sm border border-white">
                         <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                     </div>
                     <div className="flex-1 pb-1">
                         <h4 className="font-bold text-sm text-gray-900 mb-2 uppercase tracking-tight">{slot}</h4>
                         <ul className="space-y-3">
                             {grouped[slot].map((item, j) => (
                                 <li key={j} className="flex gap-2 items-start bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                                      <input type="checkbox" className="mt-0.5 text-gray-900 focus:ring-gray-900 rounded border-gray-300 w-4 h-4 cursor-pointer" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-900 leading-tight">{item.title}</p>
                                        <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                                        {item.relatedMeal && (
                                            <span className="inline-block px-1.5 py-0.5 bg-gray-50 border border-gray-200 text-gray-500 text-[10px] rounded mt-2 uppercase tracking-wider font-semibold">
                                                For: {item.relatedMeal}
                                            </span>
                                        )}
                                      </div>
                                 </li>
                             ))}
                         </ul>
                     </div>
                 </div>
            </div>
        ))}
      </div>
    </div>
  );
}
