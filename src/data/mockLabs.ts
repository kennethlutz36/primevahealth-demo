// ── Mock Lab & Biomarker Data ─────────────────────────────────────────
// Visibility rule: patients see biomarkers only when visibleToPatient === true

export const LAB_REPORTS = [
  { id:"lr1", patientId:1, fileName:"Sarah_Mitchell_Metabolic_Panel_Apr2026.pdf", labType:"Metabolic Panel", labDate:"Apr 15, 2026", uploadDate:"Apr 16, 2026", uploadedBy:"Sarah Mitchell", uploadedByRole:"patient", reviewStatus:"reviewed", providerNote:"Good overall metabolic picture. LDL slightly elevated — reinforcing protein intake and movement habits at next check-in. Vitamin D improving. No changes to protocol at this time.", patientNote:"Just got these back from my PCP.", reviewedBy:"Dr. Morgan", reviewedAt:"Apr 17, 2026", visibleToPatient:true },
  { id:"lr2", patientId:1, fileName:"Sarah_Mitchell_Baseline_Jan2026.pdf", labType:"Baseline Wellness Panel", labDate:"Jan 8, 2026", uploadDate:"Jan 9, 2026", uploadedBy:"Dr. Morgan", uploadedByRole:"provider", reviewStatus:"reviewed", providerNote:"Baseline established. Vitamin D low-normal, LDL borderline. Starting metabolic reset protocol.", reviewedBy:"Dr. Morgan", reviewedAt:"Jan 10, 2026", visibleToPatient:true },
  { id:"lr3", patientId:2, fileName:"James_Rivera_Labs_May2026.pdf", labType:"Hormone Panel", labDate:"May 20, 2026", uploadDate:"May 21, 2026", uploadedBy:"James Rivera", uploadedByRole:"patient", reviewStatus:"pending", providerNote:"", patientNote:"Uploaded per provider request.", reviewedBy:null, reviewedAt:null, visibleToPatient:false },
];

export const BIOMARKER_RESULTS = [
  // Sarah Mitchell - Apr 2026
  { id:"b1", labReportId:"lr1", patientId:1, name:"Glucose", value:92, unit:"mg/dL", refRange:"70–99", status:"In Range", trend:"Stable", visibleToPatient:true },
  { id:"b2", labReportId:"lr1", patientId:1, name:"HbA1c", value:5.6, unit:"%", refRange:"4.8–5.6", status:"Upper Range", trend:"Improving", visibleToPatient:true },
  { id:"b3", labReportId:"lr1", patientId:1, name:"LDL-C", value:128, unit:"mg/dL", refRange:"<100", status:"Above Selected Range", trend:"Improving", visibleToPatient:true },
  { id:"b4", labReportId:"lr1", patientId:1, name:"HDL-C", value:54, unit:"mg/dL", refRange:">40", status:"In Range", trend:"Stable", visibleToPatient:true },
  { id:"b5", labReportId:"lr1", patientId:1, name:"Triglycerides", value:110, unit:"mg/dL", refRange:"<150", status:"In Range", trend:"Stable", visibleToPatient:true },
  { id:"b6", labReportId:"lr1", patientId:1, name:"Vitamin D", value:31, unit:"ng/mL", refRange:"30–100", status:"Low-Normal", trend:"Improving", visibleToPatient:true },
  { id:"b7", labReportId:"lr1", patientId:1, name:"hs-CRP", value:1.8, unit:"mg/L", refRange:"<3.0", status:"In Range", trend:"Stable", visibleToPatient:true },
  { id:"b8", labReportId:"lr1", patientId:1, name:"Testosterone", value:520, unit:"ng/dL", refRange:"300–1000", status:"In Range", trend:"Stable", visibleToPatient:true },
  { id:"b9", labReportId:"lr1", patientId:1, name:"TSH", value:2.1, unit:"mIU/L", refRange:"0.4–4.5", status:"In Range", trend:"Stable", visibleToPatient:true },
];

export const BIOMARKER_TRENDS = {
  hba1c: { name:"HbA1c", unit:"%", points:[{label:"Jan",v:5.8},{label:"Apr",v:5.6},{label:"Jul",v:5.4}] },
  vitd:  { name:"Vitamin D", unit:"ng/mL", points:[{label:"Jan",v:24},{label:"Apr",v:31},{label:"Jul",v:42}] },
  ldl:   { name:"LDL-C", unit:"mg/dL", points:[{label:"Jan",v:140},{label:"Apr",v:128},{label:"Jul",v:121}] },
  glucose:{ name:"Glucose", unit:"mg/dL", points:[{label:"Jan",v:98},{label:"Apr",v:92},{label:"Jul",v:90}] },
  crp:   { name:"hs-CRP", unit:"mg/L", points:[{label:"Jan",v:2.4},{label:"Apr",v:1.8},{label:"Jul",v:1.5}] },
};

export const LAB_TYPES = [
  "Baseline Wellness Panel","Hormone Panel","Metabolic Panel","Lipid Panel",
  "Micronutrient Panel","Thyroid Panel","Inflammatory Marker Panel",
  "Follow-Up Labs","Other"
] as const;