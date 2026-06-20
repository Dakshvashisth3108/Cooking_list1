# MealMap: Personal Cooking To-Do Planner

MealMap is an AI-powered micro-app built as a PromptWars warm-up round submission. It is designed specifically for busy Indian professionals and college students who want a practical daily cooking plan.

Unlike a generic recipe generator, MealMap translates your day's constraints into an actionable chronological to-do list, optimized for time constraints, budget feasibility, and pantry reuse.

## Why this app aligns well with the challenge
- **Chronological Checklist**: It provides an actionable "Today's Cooking To-Do" list (e.g. chop veggies once for 2 meals), addressing the exact criteria for a "to-do list" rather than just a dumb list of recipes.
- **Budget Feasibility**: Provides explicit budget tracking in INR with savings tips.
- **Substitutions & Deduplication**: Re-uses grocery list and pantry items across the day and dedupes them into a cohesive categorized structure.
- **Problem Statement Alignment**: Geared directly for the Indian context (college/professionals), explicitly addressing their pain points with speed, budget constraints, and ingredient reuse.

## Architecture & Tech Stack

This project uses a hybrid full-stack setup scoped to a single workspace:
- **Frontend**: React 19 + TypeScript + Tailwind CSS built with Vite.
- **Backend**: Express + Vite Middleware (for serving the app and the `/api` route).
- **Validation**: Zod (strict validation of UI inputs and Gemini outputs).
- **AI Agent**: Gemini via `@google/genai` (specifically `gemini-2.5-pro`).
- **Persistence**: LocalStorage (client side only) to keep the app lightweight and stateless on the backend.
- **Resiliency**: If the Gemini API key is missing or validation fails, it seamlessly switches to a rule-based deterministic fallback planner.

## Security Protections Implemented
1. **Server-Side AI API calls**: Gemini API Key strictly remains on the backend.
2. **Untrusted Input Protection**: User notes and free-text fields are documented as "Untrusted" within the system prompt so the AI does not succumb to standard prompt injection attempts.
3. **Payload Bounds**: Implemented `express.json({ limit: '10kb' })` to prevent DoS via massive payload bodies.
4. **Zod Strict Decoding**: Data traversing the AI boundary guarantees strict output mappings. The app degrades gracefully via determinism if validation fails.
5. **No Dangerous Evaluation**: We render purely through simple React structural trees. No `dangerouslySetInnerHTML`.

## Tests Included
Vitest test suite tests core deterministic post-processing logics:
- `aggregateGroceries` deduplicates, categorizes, flags items in pantry accurately based on substrings.
- `calculateBudgetStatus` calculates correct INR limits, computes math safely, triggers `within`, `slightly_above`, `above` alerts accurately.

## Setup Instructions

1. **Install Dependencies**
   Run the following from the root directory:
   ```bash
   npm install
   ```

2. **Setup Gemini API Key**
   Copy the example environment variables file and configure your API key.
   ```bash
   cp .env.example .env.local
   ```
   Add your Gemini API key to `.env.local`:
   ```env
   GEMINI_API_KEY="AIzaSyYourKeyHere..."
   ```
   *Note: In Google AI Studio, ensure that the API Key is configured via your Secrets panel.*

3. **Run the App in Development Mode**
   ```bash
   npm run dev
   ```
   The backend server and API will boot up on `http://localhost:3000`.

4. **Build for Production**
   ```bash
   npm run build
   ```
   This compiles the React bundle with Vite and bundles the Express server with esbuild into a single file payload, removing dependency conflicts and improving cold-boot times. Then start the app:
   ```bash
   npm run start
   ```

