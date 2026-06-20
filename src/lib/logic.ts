import { GroceryItemType, MealType, BudgetAnalysisType } from '../types';

export function aggregateGroceries(meals: MealType[], pantryText: string): GroceryItemType[] {
  const pantryItems = pantryText.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
  
  const map = new Map<string, { category: string, count: number, usedInMeals: Set<string> }>();

  // Determine an arbitrary category for simplicity if not categorized
  const categorize = (item: string) => {
      const lower = item.toLowerCase();
      if (lower.includes('milk') || lower.includes('paneer') || lower.includes('curd') || lower.includes('ghee')) return 'Dairy / refrigerated';
      if (lower.includes('dal') || lower.includes('rice') || lower.includes('atta') || lower.includes('oats') || lower.includes('poha')) return 'Staples / grains';
      if (lower.includes('chicken') || lower.includes('egg') || lower.includes('fish')) return 'Protein';
      if (lower.includes('salt') || lower.includes('spice') || lower.includes('oil') || lower.includes('chilli')) return 'Spices / condiments';
      if (lower.includes('onion') || lower.includes('tomato') || lower.includes('potato') || lower.includes('veg') || lower.includes('apple') || lower.includes('banana')) return 'Produce';
      return 'Miscellaneous';
  };

  meals.forEach(meal => {
      meal.ingredients.forEach(ing => {
          const name = ing.trim();
          const lowerName = name.toLowerCase();
          
          if (!map.has(lowerName)) {
              map.set(lowerName, {
                  category: categorize(name),
                  count: 0,
                  usedInMeals: new Set()
              });
          }
          const entry = map.get(lowerName)!;
          entry.count += 1;
          entry.usedInMeals.add(meal.mealType);
      });
  });

  const exactPantryMatch = (name: string) => {
      return pantryItems.some(p => name.includes(p) || p.includes(name));
  };

  return Array.from(map.entries()).map(([lowerName, data]) => ({
      name: lowerName.charAt(0).toUpperCase() + lowerName.slice(1),
      category: data.category,
      quantity: `${data.count} unit${data.count > 1 ? 's' : ''}`,
      alreadyInPantry: exactPantryMatch(lowerName),
      usedInMeals: Array.from(data.usedInMeals)
  }));
}

export function calculateBudgetStatus(meals: MealType[], userBudget: number): BudgetAnalysisType {
    const totalEstimatedCost = meals.reduce((sum, meal) => sum + meal.estimatedCost, 0);
    const difference = userBudget - totalEstimatedCost;
    
    let status: 'within_budget' | 'slightly_above_budget' | 'above_budget' = 'within_budget';
    if (difference < 0) {
        status = difference <= -150 ? 'above_budget' : 'slightly_above_budget';
    }

    const expensiveItems = meals
        .filter(m => m.estimatedCost > 150)
        .map(m => `${m.name} (${m.mealType})`);

    const savingsSuggestions = [];
    if (status !== 'within_budget') {
        savingsSuggestions.push('Try swapping premium proteins for lentils or eggs.');
        savingsSuggestions.push('Use more of your existing pantry items for snacks.');
    } else {
        savingsSuggestions.push('Great job staying under budget! You can batch-cook to save more time.');
    }

    return {
        totalEstimatedCost,
        userBudget,
        difference,
        status,
        expensiveItems,
        savingsSuggestions
    };
}
