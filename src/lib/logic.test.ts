import { describe, it, expect } from 'vitest';
import { aggregateGroceries, calculateBudgetStatus } from './logic';
import { MealType } from '../types';

describe('Deterministic Helpers', () => {
  const mockMeals: MealType[] = [
    {
      mealType: 'Breakfast',
      name: 'Oats',
      description: 'Quick oats',
      timeMinutes: 10,
      estimatedCost: 50,
      rationale: 'Quick',
      ingredients: ['Oats', 'Milk', 'Sugar'],
      steps: [],
      pantryUsed: [],
      substitutions: [],
      tags: []
    },
    {
      mealType: 'Lunch',
      name: 'Dal Rice',
      description: 'Lentils',
      timeMinutes: 20,
      estimatedCost: 100,
      rationale: 'Healthy',
      ingredients: ['Rice', 'Toor Dal', 'Salt', 'Spices'],
      steps: [],
      pantryUsed: [],
      substitutions: [],
      tags: []
    }
  ];

  it('should accurately aggregate groceries and map categories', () => {
    const groceries = aggregateGroceries(mockMeals, 'Rice, Sugar');
    
    expect(groceries.length).toBe(7); 
    
    const rice = groceries.find(g => g.name.toLowerCase() === 'rice');
    expect(rice?.alreadyInPantry).toBe(true);
    expect(rice?.usedInMeals).toContain('Lunch');
    expect(rice?.category).toBe('Staples / grains');

    const oats = groceries.find(g => g.name.toLowerCase() === 'oats');
    expect(oats?.alreadyInPantry).toBe(false);
    expect(oats?.usedInMeals).toContain('Breakfast');
    expect(oats?.category).toBe('Staples / grains');
  });

  it('should accurately calculate budget feasibility', () => {
    // Total cost is 50 + 100 = 150
    const status1 = calculateBudgetStatus(mockMeals, 200);
    expect(status1.status).toBe('within_budget');
    expect(status1.difference).toBe(50);
    expect(status1.totalEstimatedCost).toBe(150);

    const status2 = calculateBudgetStatus(mockMeals, 100);
    expect(status2.status).toBe('slightly_above_budget');
    expect(status2.difference).toBe(-50);
    
    const status3 = calculateBudgetStatus(mockMeals, 0);
    expect(status3.status).toBe('above_budget');
    expect(status3.difference).toBe(-150);
  });
});
