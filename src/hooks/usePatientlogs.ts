// ── usePatientLogs hook ───────────────────────────────────────────────
// Manages daily nutrition and supplement log state for PatientToday.

import { useState } from 'react';

export interface Meal {
  name: string;
  type: string;
  protein: number;
  cal: number;
  carbs?: number;
  fat?: number;
  notes?: string;
}

export interface Supplement {
  name: string;
  dose: string;
  time: string;
  done: boolean;
  skipped: boolean;
  skipReason: string;
  notes: string;
}

const DEFAULT_MEALS: Meal[] = [
  { name: "Chicken Rice Bowl", type: "Lunch", protein: 45, cal: 520, carbs: 55, fat: 12, notes: "" }
];

const DEFAULT_SUPPS: Supplement[] = [
  { name: "Protein Powder", dose: "30g",      time: "Morning", done: true,  skipped: false, skipReason: "", notes: "" },
  { name: "Omega-3",        dose: "2 caps",   time: "Morning", done: false, skipped: false, skipReason: "", notes: "" },
  { name: "Vitamin D3",     dose: "5000 IU",  time: "Morning", done: false, skipped: false, skipReason: "", notes: "" },
];

export const FAV_MEALS: Meal[] = [
  { name: "High-Protein Breakfast Bowl", type: "Breakfast",    protein: 42, cal: 480, carbs: 38, fat: 14 },
  { name: "Greek Yogurt + Berries",       type: "Snack",        protein: 18, cal: 220, carbs: 28, fat: 4  },
  { name: "Chicken Rice Bowl",            type: "Lunch",        protein: 45, cal: 520, carbs: 55, fat: 12 },
  { name: "Protein Smoothie",             type: "Post-Workout", protein: 35, cal: 340, carbs: 40, fat: 8  },
  { name: "Salmon Sweet Potato Plate",    type: "Dinner",       protein: 42, cal: 490, carbs: 42, fat: 16 },
  { name: "Egg & Avocado Toast",          type: "Breakfast",    protein: 22, cal: 410, carbs: 32, fat: 20 },
];

export const FAV_SUPPS = [
  "Magnesium","Creatine","Omega-3","Vitamin D3",
  "Electrolytes","Protein Powder","Multivitamin"
] as const;

export const MEAL_TYPES = ["Breakfast","Lunch","Dinner","Snack","Pre-Workout","Post-Workout"] as const;
export const SUPP_TIMES = ["Morning","Mid-Morning","Afternoon","Evening","Bedtime"] as const;
export const SKIP_REASONS = ["Forgot","Side effect concern","Out of stock","Intentional — ask provider","Other"] as const;

export const PROTEIN_GOAL = 140;

export function usePatientLogs() {
  const [meals, setMeals] = useState<Meal[]>(DEFAULT_MEALS);
  const [supps, setSupps] = useState<Supplement[]>(DEFAULT_SUPPS);
  const [saved, setSaved] = useState(false);

  const addMeal = (meal: Meal) => setMeals(ms => [...ms, meal]);
  const removeMeal = (index: number) => setMeals(ms => ms.filter((_, i) => i !== index));

  const addSupp = (supp: Supplement) => setSupps(ss => [...ss, supp]);
  const toggleSupp = (index: number) => setSupps(ss =>
    ss.map((s, i) => i === index ? { ...s, done: !s.done, skipped: false } : s)
  );
  const skipSupp = (index: number, reason: string) => setSupps(ss =>
    ss.map((s, i) => i === index ? { ...s, skipped: true, done: false, skipReason: reason } : s)
  );

  const totalProtein = meals.reduce((a, m) => a + (Number(m.protein) || 0), 0);

  return {
    meals, supps, saved, totalProtein,
    addMeal, removeMeal, addSupp, toggleSupp, skipSupp,
    saveLog: () => setSaved(true),
  };
}