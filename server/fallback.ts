import { PlannerInput, MealPlanResponse } from '../src/types';

export function generateFallbackPlan(input: PlannerInput): MealPlanResponse {
  const selectedMeals = [];
  if (input.mealsNeeded.breakfast) selectedMeals.push('Breakfast');
  if (input.mealsNeeded.lunch) selectedMeals.push('Lunch');
  if (input.mealsNeeded.dinner) selectedMeals.push('Dinner');
  if (input.mealsNeeded.snack) selectedMeals.push('Snack');
  
  const estimatedTotalSpend = selectedMeals.length * 80;
  let status: 'within_budget' | 'slightly_above_budget' | 'above_budget' = 'within_budget';
  let diff = input.dailyBudget - estimatedTotalSpend;
  if (diff < 0) {
    status = diff < -100 ? 'above_budget' : 'slightly_above_budget';
  }

  const meals = selectedMeals.map((meal) => {
    let name = '';
    let ingredients: string[] = [];
    if (meal === 'Breakfast') {
      name = input.diet === 'Vegetarian' ? 'Poha with Peanuts' : 'Egg Sandwich';
      ingredients = input.diet === 'Vegetarian' ? ['Poha', 'Onion', 'Peanuts', 'Green Chilli'] : ['Eggs', 'Bread', 'Onion', 'Tomato'];
    } else if (meal === 'Lunch') {
      name = 'Dal Tadka with Rice';
      ingredients = ['Toor Dal', 'Rice', 'Tomato', 'Onion', 'Garlic', 'Spices'];
    } else if (meal === 'Dinner') {
      name = 'Vegetable Khichdi';
      ingredients = ['Moong Dal', 'Rice', 'Mixed Veggies', 'Ghee'];
    } else {
      name = 'Fruits';
      ingredients = ['Apple', 'Banana'];
    }

    return {
      mealType: meal as any,
      name,
      description: `A quick, healthy ${meal.toLowerCase()} option suitable for your day.`,
      timeMinutes: Math.min(input.cookingTimePerMeal, 20),
      estimatedCost: 80,
      rationale: `Fits your ${input.dayType} perfectly by being quick and nutritious.`,
      ingredients,
      steps: [
        'Gather ingredients.',
        'Cook on medium heat until done.',
        'Serve hot.'
      ],
      pantryUsed: ['Salt', 'Oil'],
      substitutions: ['Use local vegetables instead if short on time.', 'Substitute with available grains.'],
      tags: ['Quick', 'Fallback'],
    };
  });

  return {
    dailySummary: {
      totalMealsPlanned: meals.length,
      estimatedTotalSpend,
      pantryItemsUsedCount: 2,
      cookingStyleSummary: "Simple, easy, and fallback-mode reliable.",
    },
    fitExplanation: `This fallback plan is designed for a ${input.dayType} with ${input.diet} preferences, prioritizing speed and basic nutrition.`,
    meals,
    groceryList: [
      {
        name: "Basic Veggies (Onion, Tomato)",
        category: "Produce",
        quantity: "1 batch",
        alreadyInPantry: false,
        usedInMeals: ["Breakfast", "Lunch"],
      },
      {
        name: "Dal & Rice",
        category: "Staples / grains",
        quantity: "500g",
        alreadyInPantry: false,
        usedInMeals: ["Lunch", "Dinner"],
      }
    ],
    budgetAnalysis: {
      totalEstimatedCost: estimatedTotalSpend,
      userBudget: input.dailyBudget,
      difference: diff,
      status,
      expensiveItems: [],
      savingsSuggestions: ["Buy seasonal vegetables", "Buy grains in bulk"],
    },
    todoChecklist: [
      {
        title: "Chop veggies for the day",
        timeSlot: "Morning prep",
        description: "Chop onions and tomatoes once to use for both breakfast and lunch.",
        relatedMeal: "Breakfast"
      },
      {
        title: "Soak Dal",
        timeSlot: "Morning prep",
        description: "Soak dal for lunch to speed up cooking.",
        relatedMeal: "Lunch"
      },
      {
        title: "Prepare Dinner",
        timeSlot: "Dinner prep",
        description: "Put khichdi in the pressure cooker.",
        relatedMeal: "Dinner"
      }
    ]
  };
}
