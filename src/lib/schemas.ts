import { z } from 'zod';

export const PlannerInputSchema = z.object({
  dayType: z.string().min(1, "Day type is required").max(100),
  mealsNeeded: z.object({
    breakfast: z.boolean(),
    lunch: z.boolean(),
    dinner: z.boolean(),
    snack: z.boolean(),
  }),
  diet: z.string().min(1, "Diet is required").max(100),
  cuisine: z.string().min(1, "Cuisine is required").max(100),
  cookingTimePerMeal: z.number().int().positive("Must be a positive number").max(300),
  dailyBudget: z.number().int().positive("Budget must be positive").max(20000),
  servings: z.number().int().positive().max(20, "Servings must be reasonable"),
  pantryItems: z.string().max(2000, "Too many characters"),
  avoidIngredients: z.string().max(1000, "Too many characters"),
  skillLevel: z.string().min(1, "Skill level is required").max(50),
  healthGoal: z.string().min(1, "Health goal is required").max(100),
  notes: z.string().max(1000, "Notes are too long").optional(),
});

export const MealSchema = z.object({
  mealType: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Snack']),
  name: z.string(),
  description: z.string(),
  timeMinutes: z.number(),
  estimatedCost: z.number(),
  rationale: z.string(),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
  pantryUsed: z.array(z.string()),
  substitutions: z.array(z.string()),
  tags: z.array(z.string()),
});

export const GroceryItemSchema = z.object({
  name: z.string(),
  category: z.string(),
  quantity: z.string(),
  alreadyInPantry: z.boolean(),
  usedInMeals: z.array(z.string()),
});

export const BudgetAnalysisSchema = z.object({
  totalEstimatedCost: z.number(),
  userBudget: z.number(),
  difference: z.number(),
  status: z.enum(['within_budget', 'slightly_above_budget', 'above_budget']),
  expensiveItems: z.array(z.string()),
  savingsSuggestions: z.array(z.string()),
});

export const TodoItemSchema = z.object({
  title: z.string(),
  timeSlot: z.enum(['Morning prep', 'Shopping tasks', 'Lunch prep', 'Evening prep', 'Dinner prep', 'Leftover / storage note', 'Night prep']),
  description: z.string(),
  relatedMeal: z.string().optional(),
});

export const MealPlanResponseSchema = z.object({
  dailySummary: z.object({
    totalMealsPlanned: z.number(),
    estimatedTotalSpend: z.number(),
    pantryItemsUsedCount: z.number(),
    cookingStyleSummary: z.string(),
  }),
  fitExplanation: z.string(),
  meals: z.array(MealSchema),
  groceryList: z.array(GroceryItemSchema),
  budgetAnalysis: BudgetAnalysisSchema,
  todoChecklist: z.array(TodoItemSchema),
});
