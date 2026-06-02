// ── Mock Reports & Analytics Data ────────────────────────────────────
// No revenue, sales, dollar, or commission metrics.
export const REPORT_METRICS = [
  { value:"48",  label:"Active Patients",         delta:"↑ +3 this week", color:"#16A34A", icon:"patients" },
  { value:"81%", label:"Avg Adherence",            delta:"↑ +4% vs last",  color:"#00AEEA", icon:"progress" },
  { value:"8",   label:"Follow-Ups Due",           delta:"This week",      color:"#D97706", icon:"bell" },
  { value:"3",   label:"At-Risk Patients",         delta:"Needs attention", color:"#DC2626", icon:"report" },
  { value:"186", label:"Logs Submitted",           delta:"This week",      color:"#3ED1C2", icon:"today" },
  { value:"64%", label:"Education Done",           delta:"↑ +8%",         color:"#00AEEA", icon:"edu" },
  { value:"4",   label:"Questions Pending",        delta:"Needs response", color:"#F59E0B", icon:"bell" },
  { value:"12",  label:"Partner Engagements",      delta:"This week",      color:"#00AEEA", icon:"settings" },
] as const;

export const REPORT_TYPES = [
  "Weekly Patient Summary","Protocol Performance","Engagement Report",
  "Education Completion","Follow-Up Report","Patient Questions Report",
  "Sourcing Engagement","At-Risk Patient Report"
] as const;

export const ADHERENCE_TREND = [72,75,74,78,80,76,82,84,82,86,87,84,88,86,89,88,90,89,91,90,88,91,92];

export const PROTOCOL_DISTRIBUTION = [
  { label:"Metabolic & Nutrition", value:35, color:"#00AEEA" },
  { label:"Sleep & Recovery",      value:28, color:"#3ED1C2" },
  { label:"Supplement Foundation", value:18, color:"#16C7E8" },
  { label:"Labs & Biomarkers",     value:12, color:"#F59E0B" },
  { label:"Peptide Education",     value:7,  color:"#4A5B78" },
] as const;

export const EDUCATION_COMPLETION = [
  { label:"Protein Intake Basics",      value:78 },
  { label:"Sleep Routine Foundations",  value:65 },
  { label:"GLP-1 Lifestyle Support",    value:52 },
  { label:"Lab Prep Checklist",         value:41 },
  { label:"Supplement Quality Guide",   value:38 },
] as const;