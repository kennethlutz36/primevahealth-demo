// ── Mock Inbox / Questions Data ──────────────────────────────────────
export const INBOX_ITEMS = [
  { id:1, patient:"Sarah Mitchell", init:"SM", cat:"Nutrition",
    question:"Can I swap my usual breakfast for a protein shake on busy mornings?",
    time:"42 min ago", status:"New" },
  { id:2, patient:"James Rivera", init:"JR", cat:"Supplements",
    question:"I missed my magnesium last night. Should I take it this morning or wait?",
    time:"2 hours ago", status:"Needs Response" },
  { id:3, patient:"Emily Chen", init:"EC", cat:"Sleep",
    question:"My sleep score dropped this week. What should I adjust first?",
    time:"3 hours ago", status:"New" },
  { id:4, patient:"Robert Kim", init:"RK", cat:"Protocol",
    question:"I missed two workouts. Should I restart the week or just continue?",
    time:"Yesterday", status:"Needs Review" },
] as const;

export const SUGGESTED_QUESTIONS = [
  "Should I adjust my supplement timing?",
  "What should I do if I miss a protocol action?",
  "Can I substitute this meal?",
  "Is this product appropriate for my protocol?",
  "How should I improve my sleep routine?",
  "Should I prioritize sleep or exercise today?",
] as const;

export const QUESTION_CATEGORIES = [
  "Protocol","Nutrition","Supplements","Sleep","Exercise",
  "Labs","Sourcing","Progress","Other"
] as const;