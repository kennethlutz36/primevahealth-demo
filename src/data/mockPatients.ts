// ── Mock Patient Data ─────────────────────────────────────────────────

export const PATIENTS = [
  { id: 1, name: "Sarah Mitchell", init: "SM", protocol: "Metabolic Reset", status: "active", adh: 92, checkin: "Today", sleep: [7,8,7,9,8,9,8], followup: "Jun 2", risk: "low", riskReasons: ["Strong adherence", "Consistent logs", "No missed check-ins"] },
  { id: 2, name: "James Rivera", init: "JR", protocol: "GLP-1 Lifestyle Support", status: "due", adh: 68, checkin: "Yesterday", sleep: [5,6,5,4,6,5,4], followup: "May 27", risk: "moderate", riskReasons: ["Missed supplement logs", "Follow-up overdue", "Inconsistent check-ins"] },
  { id: 3, name: "Emily Chen", init: "EC", protocol: "Sleep Optimization", status: "active", adh: 84, checkin: "Today", sleep: [7,8,9,8,8,9,9], followup: "Jun 5", risk: "low", riskReasons: ["Good adherence", "Consistent sleep logs", "Minor energy dip"] },
  { id: 4, name: "Robert Kim", init: "RK", protocol: "Strength & Recovery", status: "review", adh: 57, checkin: "3 days ago", sleep: [4,5,4,3,5,4,4], followup: "May 26", risk: "high", riskReasons: ["No activity in 3+ days", "Low workout completion", "Unanswered question", "Low protocol completion"] },
  { id: 5, name: "Lisa Patel", init: "LP", protocol: "Supplement Foundation", status: "active", adh: 88, checkin: "Today", sleep: [8,8,9,8,9,8,9], followup: "Jun 8", risk: "low", riskReasons: ["Strong supplement adherence", "Consistent logs", "Education on track"] },
];

export const riskBadge = (r: string) => ({
  low:      { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0", label: "Low Risk" },
  moderate: { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A", label: "Moderate Risk" },
  high:     { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA", label: "High Risk" },
}[r] || { bg: "#F5FAFD", color: "#4A5B78", border: "#D8EAF3", label: "Unknown" });

export const AI_REPLIES: Record<string, string> = {
  "Summarize patient progress": "Sarah Mitchell leads the panel at 92% adherence. Sleep averaged 8.2/10. All 7 education modules completed. Recommend extending protocol by 4 weeks. James Rivera (68%) and Robert Kim (57%) need attention this week.",
  "Patients needing follow-up": "James Rivera: 68% adherence, missed 2 supplement logs. Robert Kim: 57% adherence, 3-day check-in gap. Both flagged for follow-up. Consider a brief check-in message to James about supplement timing.",
  "What should I focus on today?": "Good morning, Sarah! Priority today: hit your 120g protein target, complete your morning supplement stack, and log last night's sleep. Your 6-day streak is strong — keep it going!",
  "Summarize my progress": "Great week — adherence hit 92%, up from 85%. Sleep quality averaged 8.1/10. You completed 5/7 protocol tasks daily. Focus area: evening supplement timing consistency.",
};