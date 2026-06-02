// ── Mock Education Hub Data ──────────────────────────────────────────
export const EDU_CATEGORIES = [
  { id:"peptides",    name:"Peptides",          color:"#061A44", resources:18, handouts:6, modules:4,
    desc:"Education around peptide categories, mechanisms, responsible discussions, sourcing context, and provider-guided implementation." },
  { id:"supplements", name:"Supplements",       color:"#00AEEA", resources:24, handouts:9, modules:6,
    desc:"Education around foundational supplements, timing, consistency, quality, sourcing, and protocol support." },
  { id:"nutrition",   name:"Nutrition",         color:"#3ED1C2", resources:31, handouts:12, modules:8,
    desc:"Resources for protein intake, meal structure, hydration, nutrient timing, metabolic health, and sustainable habits." },
  { id:"exercise",    name:"Exercise",          color:"#16A34A", resources:22, handouts:8, modules:5,
    desc:"Education around strength training, cardiovascular health, mobility, exercise adherence, and performance support." },
  { id:"sleep",       name:"Sleep & Recovery",  color:"#00AEEA", resources:19, handouts:7, modules:5,
    desc:"Resources for sleep quality, circadian rhythm, recovery routines, stress load, HRV, and evening habits." },
  { id:"labs",        name:"Labs & Biomarkers", color:"#F59E0B", resources:15, handouts:5, modules:4,
    desc:"Resources for baseline wellness labs, biomarker trends, lab prep, monitoring workflows, and patient education." },
] as const;

export const FEATURED_RESOURCES = [
  { title:"Protein Intake Basics",      cat:"Nutrition",  time:"8 min",  icon:"today"    },
  { title:"Hydration & Electrolytes",   cat:"Nutrition",  time:"6 min",  icon:"today"    },
  { title:"Supplement Quality Guide",   cat:"Supplements",time:"10 min", icon:"edu"      },
  { title:"Sleep Routine Foundations",  cat:"Sleep",      time:"7 min",  icon:"today"    },
  { title:"Injection Safety Basics",    cat:"Peptides",   time:"12 min", icon:"protocol" },
  { title:"Lab Prep Checklist",         cat:"Labs",       time:"5 min",  icon:"report"   },
  { title:"Recovery Day Guide",         cat:"Exercise",   time:"6 min",  icon:"progress" },
] as const;

export const LEARNING_PATHS = [
  { title:"Metabolic Reset",         modules:6, time:"42 min" },
  { title:"GLP-1 Lifestyle Support", modules:5, time:"35 min" },
  { title:"Supplement Foundations",  modules:4, time:"28 min" },
  { title:"Sleep Optimization",      modules:5, time:"34 min" },
  { title:"Strength & Recovery",     modules:4, time:"30 min" },
  { title:"Peptide Education Basics",modules:5, time:"38 min" },
  { title:"Lab Prep Foundations",    modules:3, time:"22 min" },
] as const;