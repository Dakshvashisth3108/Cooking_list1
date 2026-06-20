import { useState } from 'react';
import type { FormEvent } from 'react';
import { PlannerInput } from '../types';

export function PlannerForm({ onSubmit, loading }: { onSubmit: (data: PlannerInput) => void, loading: boolean }) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: PlannerInput = {
        dayType: formData.get('dayType') as string,
        mealsNeeded: {
            breakfast: formData.get('mealBreakfast') === 'on',
            lunch: formData.get('mealLunch') === 'on',
            dinner: formData.get('mealDinner') === 'on',
            snack: formData.get('mealSnack') === 'on',
        },
        diet: formData.get('diet') as string,
        cuisine: formData.get('cuisine') as string,
        cookingTimePerMeal: parseInt(formData.get('cookingTimePerMeal') as string, 10) || 30,
        dailyBudget: parseInt(formData.get('dailyBudget') as string, 10) || 300,
        servings: parseInt(formData.get('servings') as string, 10) || 1,
        pantryItems: formData.get('pantryItems') as string,
        avoidIngredients: formData.get('avoidIngredients') as string,
        skillLevel: formData.get('skillLevel') as string,
        healthGoal: formData.get('healthGoal') as string,
        notes: formData.get('notes') as string,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
      
      <div>
        <label htmlFor="dayType" className="block text-sm font-semibold text-gray-900 mb-1">What's your day like?</label>
        <select id="dayType" name="dayType" required className="w-full rounded-lg border-gray-300 p-2.5 bg-gray-50 border focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none text-sm">
          <option value="Busy college day">Busy college day</option>
          <option value="Busy workday">Busy workday</option>
          <option value="Gym day">Gym day</option>
          <option value="Relaxed day">Relaxed day</option>
          <option value="Weekend cooking day">Weekend cooking day</option>
          <option value="Travel / long commute day">Travel / long commute day</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Meals Needed</label>
            <div className="space-y-1">
                {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(m => (
                    <label key={m} htmlFor={`meal${m}`} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input id={`meal${m}`} type="checkbox" name={`meal${m}`} defaultChecked={m !== 'Snack'} className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <span className="text-gray-700">{m}</span>
                    </label>
                ))}
            </div>
        </div>
        <div>
           <label htmlFor="pantryItems" className="block text-sm font-semibold text-gray-900 mb-2">Pantry / Have Already</label>
           <textarea id="pantryItems" name="pantryItems" rows={3} placeholder="rice, onions, dal, eggs..." className="w-full text-sm rounded-lg border-gray-300 p-2 border bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none"></textarea>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
            <label htmlFor="diet" className="block text-sm font-semibold text-gray-900 mb-1">Diet</label>
            <select id="diet" name="diet" className="w-full text-sm rounded-lg border-gray-300 p-2 bg-gray-50 border focus:border-indigo-500 outline-none">
                <option value="Vegetarian">Vegetarian</option>
                <option value="Eggetarian">Eggetarian</option>
                <option value="Non-vegetarian">Non-vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="No preference">No preference</option>
            </select>
        </div>
        <div>
           <label htmlFor="cuisine" className="block text-sm font-semibold text-gray-900 mb-1">Cuisine / Style</label>
           <select id="cuisine" name="cuisine" className="w-full text-sm rounded-lg border-gray-300 p-2 bg-gray-50 border focus:border-indigo-500 outline-none">
                <option value="Indian home-style">Indian home-style</option>
                <option value="Quick meals">Quick meals</option>
                <option value="High-protein">High-protein</option>
                <option value="Comfort food">Comfort food</option>
            </select>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="cookingTimePerMeal" className="block text-sm font-semibold text-gray-900 mb-1">Max min/meal</label>
          <select id="cookingTimePerMeal" name="cookingTimePerMeal" defaultValue={30} className="w-full text-sm rounded-lg border-gray-300 p-2 bg-gray-50 border focus:border-indigo-500 outline-none">
              <option value={10}>10 min</option>
              <option value={20}>20 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60+ min</option>
          </select>
        </div>
        <div>
          <label htmlFor="dailyBudget" className="block text-sm font-semibold text-gray-900 mb-1">Budget (₹)</label>
          <input id="dailyBudget" type="number" name="dailyBudget" required min={50} defaultValue={300} className="w-full text-sm rounded-lg border-gray-300 p-2 bg-gray-50 border focus:border-indigo-500 outline-none" />
        </div>
        <div>
          <label htmlFor="servings" className="block text-sm font-semibold text-gray-900 mb-1">Servings</label>
          <input id="servings" type="number" name="servings" required min={1} max={10} defaultValue={1} className="w-full text-sm rounded-lg border-gray-300 p-2 bg-gray-50 border focus:border-indigo-500 outline-none" />
        </div>
      </div>

       <div className="grid grid-cols-2 gap-4">
         <div>
            <label htmlFor="healthGoal" className="block text-sm font-semibold text-gray-900 mb-1">Goal</label>
            <select id="healthGoal" name="healthGoal" className="w-full text-sm rounded-lg border-gray-300 p-2 bg-gray-50 border focus:border-indigo-500 outline-none">
                <option value="Balanced">Balanced</option>
                <option value="High protein">High protein</option>
                <option value="Budget-friendly">Budget-friendly</option>
                <option value="Weight-friendly">Weight-friendly</option>
            </select>
        </div>
        <div>
           <label htmlFor="skillLevel" className="block text-sm font-semibold text-gray-900 mb-1">Skill Level</label>
           <select id="skillLevel" name="skillLevel" className="w-full text-sm rounded-lg border-gray-300 p-2 bg-gray-50 border focus:border-indigo-500 outline-none">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
        </div>
      </div>

      <div className="space-y-4">
          <div>
            <label htmlFor="avoidIngredients" className="block text-sm font-semibold text-gray-900 mb-1">Avoid / Allergies</label>
            <input id="avoidIngredients" type="text" name="avoidIngredients" placeholder="e.g., peanuts, mushrooms" className="w-full text-sm rounded-lg border-gray-300 p-2 border bg-gray-50 focus:bg-white focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-900 mb-1 border-gray-200 pt-2 border-t">Extra Notes (Optional)</label>
            <textarea id="notes" name="notes" rows={2} placeholder="Late night shift, need heavy lunch..." className="w-full text-sm rounded-lg border-gray-300 p-2 border bg-gray-50 focus:bg-white focus:border-indigo-500 outline-none resize-none"></textarea>
          </div>
      </div>

      <button disabled={loading} type="submit" className="w-full py-3.5 px-4 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2">
        {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        ) : (
            <svg className="w-5 h-5 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        )}
        {loading ? 'Fusing logic...' : 'Generate My Cooking Checklist'}
      </button>

    </form>
  );
}
