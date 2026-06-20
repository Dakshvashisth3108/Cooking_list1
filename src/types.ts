import { z } from 'zod';
import { 
  PlannerInputSchema, 
  MealPlanResponseSchema,
  MealSchema,
  GroceryItemSchema,
  BudgetAnalysisSchema,
  TodoItemSchema
} from './lib/schemas';

export type PlannerInput = z.infer<typeof PlannerInputSchema>;
export type MealPlanResponse = z.infer<typeof MealPlanResponseSchema>;
export type MealType = z.infer<typeof MealSchema>;
export type GroceryItemType = z.infer<typeof GroceryItemSchema>;
export type BudgetAnalysisType = z.infer<typeof BudgetAnalysisSchema>;
export type TodoItemType = z.infer<typeof TodoItemSchema>;
