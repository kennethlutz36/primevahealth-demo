// ── ProviderClinicHandouts ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring, Spark } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge, AI_REPLIES } from '../../data/mockPatients';
import { PROV_PARTNERS } from '../../data/mockSourcing';
import { ProviderLabSection } from '../labs';


const ClinicHandouts = () => {
  const [category, setCategory] = useState("All");
  const [aiPrompt, setAiPrompt] = useState("");
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [includeDisclaimer, setIncludeDisclaimer] = useState(true);
  const [includeSourcing, setIncludeSourcing] = useState(false);
  const [aiCategory, setAiCategory] = useState("Nutrition");

  const cats = ["All","Nutrition","Supplements","Sleep","Fitness","Recovery","Metabolic Health","GLP-1 Lifestyle Support","Peptide Education","Lab Prep","Injection Safety","Hydration","Stress Management","Foundational Wellness"];
  const handouts = [
    { title:"Protein Intake Basics", cat:"Nutrition", desc:"Patient-friendly guide explaining protein targets, meal examples, and simple daily tracking strategies.", time:"8 min" },
    { title:"GLP-1 Lifestyle Support", cat:"GLP-1 Lifestyle Support", desc:"Education around hydration, protein intake, nausea support, meal pacing, and habit consistency during metabolic protocols.", time:"10 min" },
    { title:"Sleep Routine Foundations", cat:"Sleep", desc:"Practical evening routine guide focused on sleep quality, recovery, and circadian rhythm support.", time:"7 min" },
    { title:"Supplement Foundations", cat:"Supplements", desc:"Patient-friendly overview of supplement consistency, quality, timing, and provider-guided use.", time:"8 min" },
    { title:"Hydration & Electrolytes", cat:"Hydration", desc:"Simple guide for daily hydration targets, electrolyte timing, and signs of poor hydration status.", time:"6 min" },
    { title:"Injection Safety Basics", cat:"Injection Safety", desc:"Educational handout covering storage, handling, site rotation, and safe injection workflow for patients.", time:"9 min" },
    { title:"Lab Prep Checklist", cat:"Lab Prep", desc:"Patient-facing checklist for preparing for common wellness and biomarker lab appointments.", time:"5 min" },
    { title:"Recovery Day Guide", cat:"Recovery", desc:"Guide for active recovery, mobility, sleep, hydration, and recovery-supportive nutrition habits.", time:"8 min" },
    { title:"Metabolic Health Basics", cat:"Metabolic Health", desc:"Overview of appetite signaling, energy balance, body composition, and sustainable lifestyle frameworks.", time:"10 min" },
    { title:"Stress Management Fundamentals", cat:"Stress Management", desc:"Practical tools for HRV, breathwork, sleep, and daily stress regulation habits.", time:"8 min" },
    { title:"Foundational Wellness Guide", cat:"Foundational Wellness", desc:"Covers the non-negotiables: sleep, protein, hydration, movement, and consistency.", time:"10 min" },
    { title:"Fitness for Optimization", cat:"Fitness", desc:"Simple resistance training and zone 2 cardio framework for patients at all fitness levels.", time:"9 min" },
  ];
  const filtered = category === "All" ? handouts : handouts.filter(h => h.cat === category);

  return (
    <div style={{ padding:"28px 32px" }} className="fade">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
        <div>
          <div style={{ fontSize:22, fontWeight:800, color:"#061A44", letterSpacing:"-.5px" }}>Clinic Handouts</div>
          <div style={{ fontSize:13, color:"#4A5B78", marginTop:3 }}>Create, customize, and assign patient-friendly education materials for nutrition, supplements, sleep, recovery, and protocol support.</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn btn-secondary btn-sm">Upload Handout</button>
          <button className="btn btn-primary btn-sm"><Ic n="spark" s={13} c="#fff"/> Generate with AI</button>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:26 }}>
        {[["Generate with PrimevaAI","spark","#00AEEA"],["Upload Handout","plus","#3ED1C2"],["Browse Templates","edu","#061A44"],["Assign to Patient","patients","#00AEEA"],["Download PDF Packet","protocol","#4A5B78"]].map(([l,icon,col]) => (
          <div key={l} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:9, padding:"18px 12px", background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:16, cursor:"pointer", transition:"all .2s", textAlign:"center", boxShadow:"0 2px 12px rgba(0,174,234,.05)" }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(0,174,234,.1)"; e.currentTarget.style.borderColor="#B8D9F0"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,174,234,.05)"; e.currentTarget.style.borderColor="#D8EAF3"; }}>
            <div style={{ width:42, height:42, borderRadius:12, background:`${col}14`, border:`1px solid ${col}28`, display:"flex", alignItems:"center", justifyContent:"center" }}><Ic n={icon} s={18} c={col}/></div>
            <div style={{ fontSize:12, fontWeight:650, color:"#061A44", lineHeight:1.35 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"linear-gradient(135deg,rgba(6,26,68,.05),rgba(0,174,234,.06))", border:"1px solid rgba(0,174,234,.18)", borderRadius:18, padding:22, marginBottom:26 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#061A44,#00AEEA)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 3px 12px rgba(0,174,234,.3)" }}><Ic n="spark" s={16} c="#fff"/></div>
          <div>
            <div style={{ fontWeight:750, fontSize:14.5, color:"#061A44" }}>Generate a Handout with PrimevaAI</div>
            <div style={{ fontSize:12.5, color:"#4A5B78" }}>Create patient-friendly handouts from provider prompts in seconds.</div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:12, marginBottom:12 }}>
          <input className="form-input" placeholder='e.g. "Create a handout about protein intake for patients on a metabolic protocol."' value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} onKeyDown={e => e.key==="Enter" && (setGenerating(true), setTimeout(()=>{setGenerating(false);setGenerated(true);},1400))}/>
          <button className="btn btn-primary" onClick={() => { setGenerating(true); setTimeout(()=>{setGenerating(false);setGenerated(true);},1400); }} style={{ minWidth:160 }}>{generating?"Generating...":"Generate Handout"}</button>
        </div>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <div className="form-group" style={{ flex:1, minWidth:130 }}>
            <label className="form-label">Category</label>
            <select className="form-input" style={{ fontSize:13 }} value={aiCategory} onChange={e => setAiCategory(e.target.value)}>{cats.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}</select>
          </div>
          <div className="form-group" style={{ flex:1, minWidth:130 }}>
            <label className="form-label">Reading Level</label>
            <select className="form-input" style={{ fontSize:13 }}><option>Patient-Friendly</option><option>General</option><option>Clinical</option></select>
          </div>
          <div className="form-group" style={{ flex:1, minWidth:130 }}>
            <label className="form-label">Tone</label>
            <select className="form-input" style={{ fontSize:13 }}><option>Supportive & Encouraging</option><option>Clinical & Direct</option><option>Educational</option></select>
          </div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:16, paddingBottom:1 }}>
            {[["Disclaimer",includeDisclaimer,setIncludeDisclaimer],["Sourcing",includeSourcing,setIncludeSourcing]].map(([l,v,set])=>(
              <div key={l} style={{ display:"flex", alignItems:"center", gap:7 }}>
                <button className={`toggle ${v?"toggle-on":"toggle-off"}`} onClick={()=>set(!v)}><div className="toggle-knob" style={{ left:v?21:3 }}/></button>
                <span style={{ fontSize:12, color:"#4A5B78", fontWeight:550 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        {generated && (
          <div style={{ marginTop:16, background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:14, padding:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
              <div>
                <div style={{ fontWeight:750, fontSize:15.5, color:"#061A44", marginBottom:6 }}>Protein Intake Guide — Metabolic Protocol</div>
                <div style={{ display:"flex", gap:7 }}><span className="badge badge-blue">{aiCategory}</span><span className="badge badge-green">Patient-Friendly</span><span className="badge badge-gray">8 min</span></div>
              </div>
              <div style={{ display:"flex", gap:8 }}><button className="btn btn-secondary btn-sm">Save Template</button><button className="btn btn-primary btn-sm">Assign to Patient</button></div>
            </div>
            <p style={{ fontSize:13.5, color:"#4A5B78", lineHeight:1.7, marginBottom:14 }}>Protein is one of the most important nutritional priorities during a metabolic protocol. This guide explains how to hit your daily target, which foods to prioritize, and simple strategies for consistency.</p>
            {[["Why Protein Matters","Protein supports lean muscle, recovery, appetite regulation, and metabolic rate. On a metabolic protocol, adequate protein helps preserve the muscle you have."],
              ["Your Daily Target","A general starting target is 0.7–1g per pound of body weight. Your provider will give you a specific goal based on your protocol."],
              ["Simple Sources","Chicken, fish, eggs, Greek yogurt, cottage cheese, lean beef, and protein shakes. Include a protein source at every meal."],
              ["Tracking Made Simple","Track 3 days per week to start. Use the Primeva app to log your daily protein intake."]
            ].map(([h,b]) => (
              <div key={h} style={{ padding:"10px 0", borderTop:"1px solid #EEF7FC" }}>
                <div style={{ fontWeight:700, fontSize:13.5, color:"#061A44", marginBottom:4 }}>{h}</div>
                <p style={{ fontSize:13, color:"#4A5B78", lineHeight:1.6 }}>{b}</p>
              </div>
            ))}
            {includeDisclaimer && <div style={{ marginTop:14, padding:"10px 14px", background:"#EEF7FC", border:"1px solid #E8EFF6", borderRadius:9, fontSize:11.5, color:"#4A5B78", lineHeight:1.5 }}>This handout is for educational and wellness support only and is not intended to replace medical advice, clinical judgment, or provider guidance.</div>}
          </div>
        )}
      </div>

      <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:20 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${category===c?"#00AEEA":"#D8EAF3"}`, background:category===c?"#EEF7FC":"#FFFFFF", color:category===c?"#00AEEA":"#4A5B78", fontSize:12.5, fontWeight:category===c?700:500, cursor:"pointer", fontFamily:"inherit", transition:"all .15s" }}>{c}</button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:26 }}>
        {filtered.map(h => (
          <div key={h.title} style={{ background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:18, padding:20, boxShadow:"0 2px 14px rgba(0,174,234,.06)", transition:"all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(0,174,234,.1)"; e.currentTarget.style.borderColor="#B8D9F0"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 2px 14px rgba(0,174,234,.06)"; e.currentTarget.style.borderColor="#D8EAF3"; }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}><span className="badge badge-blue">{h.cat}</span><span style={{ fontSize:11.5, color:"#4A5B78" }}>{h.time}</span></div>
            <div style={{ fontWeight:750, fontSize:14.5, color:"#061A44", marginBottom:8, lineHeight:1.35 }}>{h.title}</div>
            <p style={{ fontSize:12.5, color:"#4A5B78", lineHeight:1.6, marginBottom:14 }}>{h.desc}</p>
            <div style={{ display:"flex", gap:6, marginBottom:14 }}><span className="badge badge-green">Provider-Reviewed</span><span className="badge badge-blue">Patient-Friendly</span></div>
            <div style={{ display:"flex", gap:8 }}><button className="btn btn-primary btn-sm" style={{ flex:1 }}>Download PDF</button><button className="btn btn-secondary btn-sm" style={{ flex:1 }}>Assign</button><button className="btn btn-ghost btn-sm">Edit</button></div>
          </div>
        ))}
      </div>

      <div style={{ background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:16, padding:20, marginBottom:18, boxShadow:"0 2px 12px rgba(0,174,234,.05)" }}>
        <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:14 }}>Recent Handout Activity</div>
        {[["Protein Intake Basics","assigned to Sarah Mitchell","2h ago","patients"],["GLP-1 Lifestyle Support","downloaded by Amanda R.","4h ago","protocol"],["Sleep Routine Foundations","customized by Dr. Morgan","Yesterday","settings"],["Hydration & Electrolytes","added to Metabolic Reset protocol","Yesterday","edu"]].map(([a,d,t,icon],i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:i<3?"1px solid #EEF7FC":"none" }}>
            <div style={{ width:32, height:32, borderRadius:9, background:"#EEF7FC", border:"1px solid #E8EFF6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Ic n={icon} s={14} c="#00AEEA"/></div>
            <div style={{ flex:1 }}><span style={{ fontWeight:650, fontSize:13.5, color:"#061A44" }}>{a}</span><span style={{ fontSize:13.5, color:"#4A5B78" }}> {d}</span></div>
            <span style={{ fontSize:12, color:"#9BA8BE" }}>{t}</span>
          </div>
        ))}
      </div>

      <div style={{ padding:"12px 16px", background:"#EEF7FC", border:"1px solid #E8EFF6", borderRadius:10, fontSize:12, color:"#4A5B78", lineHeight:1.6 }}>
        Primeva handouts are provided for educational and wellness support only and are not intended to replace medical advice, clinical judgment, prescribing authority, legal guidance, or regulatory review.
      </div>
    </div>
  );
};

export default ClinicHandouts;