// ── ProviderProtocols ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring, Spark } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge, AI_REPLIES } from '../../data/mockPatients';
import { PROV_PARTNERS } from '../../data/mockSourcing';
import { ProviderLabSection } from '../labs';


const Protocols = () => {
  const [view, setView] = useState("library");
  const [activeProto, setActiveProto] = useState(null);
  const [protoTab, setProtoTab] = useState("overview");
  const [catFilter, setCatFilter] = useState("all");
  const [builderStep, setBuilderStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [protoTasks, setProtoTasks] = useState([
    { name:"Daily protein target (120g)", type:"nutrition", freq:"Daily", time:"Morning", required:true },
    { name:"Morning supplement stack", type:"supplement", freq:"Daily", time:"Morning", required:true },
    { name:"30-minute walk", type:"exercise", freq:"Daily", time:"Any", required:false },
    { name:"Hydration check-in (2.5L goal)", type:"hydration", freq:"Daily", time:"Evening", required:true },
    { name:"Evening sleep wind-down routine", type:"sleep", freq:"Daily", time:"Evening", required:false },
    { name:"Weekly provider check-in log", type:"check-in", freq:"Weekly", time:"Any", required:true },
  ]);

  const PROTO_CATS = [
    "all","Peptides","Supplements","Nutrition","Exercise","Sleep & Recovery","Labs & Biomarkers"
  ];

  const PROTO_TEMPLATES = [
    { id:"metabolic", title:"Metabolic Reset", cat:"Nutrition", catId:"nutrition", duration:"12 weeks", tasks:6, hasEdu:true, hasSourcing:true, hasTracking:true, desc:"A foundational plan focused on protein intake, hydration, meal consistency, movement, and daily accountability.", includes:["Daily check-in","Protein target","Hydration goal","Walking goal","Education assignments","Sourcing recommendations"] },
    { id:"glp1", title:"GLP-1 Lifestyle Support", cat:"Nutrition", catId:"nutrition", duration:"16 weeks", tasks:7, hasEdu:true, hasSourcing:true, hasTracking:true, desc:"A support protocol for patients needing structure around protein, hydration, GI-friendly meals, resistance training, and consistency.", includes:["Protein education","Hydration reminders","Meal pacing","Supplement support","Check-in schedule","Provider follow-up"] },
    { id:"supplement", title:"Supplement Foundation", cat:"Supplements", catId:"supplements", duration:"8 weeks", tasks:4, hasEdu:true, hasSourcing:true, hasTracking:true, desc:"A protocol focused on supplement timing, adherence, education, and sourcing quality.", includes:["Supplement schedule","Daily completion tracking","Education module","Sourcing recommendations"] },
    { id:"sleep", title:"Sleep Optimization", cat:"Sleep & Recovery", catId:"sleep", duration:"8 weeks", tasks:5, hasEdu:true, hasSourcing:true, hasTracking:true, desc:"A protocol focused on evening routines, sleep timing, recovery habits, stress management, and weekly sleep trend review.", includes:["Wind-down task","Caffeine cutoff","Screen routine","Sleep log","Education handout"] },
    { id:"strength", title:"Strength & Recovery", cat:"Exercise", catId:"exercise", duration:"12 weeks", tasks:6, hasEdu:true, hasSourcing:true, hasTracking:true, desc:"A protocol supporting resistance training consistency, mobility, recovery nutrition, and rest-day habits.", includes:["Workout log","Recovery checklist","Protein target","Hydration goal","Mobility task","Recovery education"] },
    { id:"labprep", title:"Lab Prep & Monitoring", cat:"Labs & Biomarkers", catId:"labs", duration:"Ongoing", tasks:4, hasEdu:true, hasSourcing:false, hasTracking:true, desc:"A protocol focused on lab prep, baseline biomarker education, follow-up reminders, and provider review workflows.", includes:["Lab prep checklist","Biomarker education","Follow-up reminders","Provider review workflow"] },
    { id:"peptide", title:"Peptide Education Support", cat:"Peptides", catId:"peptides", duration:"8 weeks", tasks:5, hasEdu:true, hasSourcing:true, hasTracking:false, desc:"A provider-guided education protocol for peptide category education, safety considerations, sourcing quality, and patient understanding.", includes:["Category education","Safety considerations","Sourcing quality guide","Patient Q&A module","Provider check-ins"] },
    { id:"recovery", title:"Recovery Support", cat:"Sleep & Recovery", catId:"sleep", duration:"8 weeks", tasks:6, hasEdu:true, hasSourcing:true, hasTracking:true, desc:"A recovery-focused protocol supporting hydration, protein intake, sleep, mobility, and provider check-ins.", includes:["Recovery checklist","Mobility reminders","Protein support","Hydration goal","Education handout","Follow-up schedule"] },
  ];

  const catColor = id => ({ nutrition:"#3ED1C2", supplements:"#00AEEA", sleep:"#00AEEA", exercise:"#10B981", labs:"#F59E0B", peptides:"#061A44", recovery:"#00AEEA" }[id] || "#00AEEA");

  const filtered = catFilter === "all" ? PROTO_TEMPLATES : PROTO_TEMPLATES.filter(p => p.cat === catFilter);

  const SOURCING_RECS = [
    { name:"Protein Support Partner", cat:"Supplements", why:"Helps patients meet daily protein targets — critical for metabolic and recovery protocols.", note:"Consider for patients struggling with protein consistency.", offer:"15% off first order" },
    { name:"Electrolyte Partner", cat:"Hydration", why:"Supports hydration consistency and electrolyte balance throughout the protocol.", note:"Useful for GLP-1 patients and high-activity protocols.", offer:"Starter bundle available" },
    { name:"Sleep Support Partner", cat:"Sleep", why:"Magnesium glycinate and sleep stacks supporting sleep quality and overnight recovery.", note:"Recommend as foundational sleep support for any protocol.", offer:"First month 15% off" },
    { name:"Lab Testing Partner", cat:"Labs", why:"Comprehensive wellness panels with provider dashboard and biomarker tracking.", note:"Useful for baseline and follow-up monitoring workflows.", offer:"Patient-pay options available" },
    { name:"Recovery Device Partner", cat:"Recovery", why:"Supports recovery routines and patient accountability between provider visits.", note:"Useful for active patients on recovery-focused protocols.", offer:"Clinic discount available" },
    { name:"Pharmacy Partner", cat:"Pharmacies", why:"503A/503B compounding with COA documentation and provider portal access.", note:"Provider remains responsible for all clinical and pharmacy decisions.", offer:"N/A — provider account" },
  ];

  const taskTypeColor = t => ({ nutrition:"#10B981", supplement:"#00AEEA", exercise:"#F59E0B", hydration:"#16C7E8", sleep:"#00AEEA", recovery:"#F97316", education:"#4A5B78", "check-in":"#3ED1C2", "lab reminder":"#EF4444", "provider follow-up":"#061A44" }[t] || "#4A5B78");

  // ── Protocol Detail ──────────────────────────────────────────────────
  if (activeProto) {
    const p = activeProto;
    const tabs = ["overview","tasks","education","sourcing","assign"];
    return (
      <div style={{ padding:"28px 32px" }} className="fade">
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => { setActiveProto(null); setProtoTab("overview"); }} style={{ color:"#4A5B78" }}>← Protocols</button>
          <span style={{ color:"#D8EAF3" }}>›</span>
          <span style={{ fontSize:13, fontWeight:600, color:"#061A44" }}>{p.title}</span>
        </div>

        <div style={{ background:"linear-gradient(135deg,#061A44 0%,#081F4D 60%,#0A4A8A 100%)", borderRadius:20, padding:"28px 32px", marginBottom:20, position:"relative", overflow:"hidden", boxShadow:"0 8px 32px rgba(6,26,68,.18)" }}>
          <div style={{ position:"absolute", right:-40, top:-40, width:260, height:260, borderRadius:"50%", background:`radial-gradient(circle,${catColor(p.catId)}22 0%,transparent 70%)` }}/>
          <div style={{ position:"relative", zIndex:1, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={{ marginBottom:10 }}><span style={{ padding:"3px 12px", background:`${catColor(p.catId)}22`, border:`1px solid ${catColor(p.catId)}44`, borderRadius:20, fontSize:12, fontWeight:700, color:catColor(p.catId) }}>{p.cat}</span></div>
              <h1 style={{ fontSize:24, fontWeight:800, color:"#fff", letterSpacing:"-.4px", marginBottom:8, lineHeight:1.2 }}>{p.title}</h1>
              <p style={{ fontSize:13.5, color:"rgba(255,255,255,.6)", maxWidth:500, lineHeight:1.7, marginBottom:20 }}>{p.desc}</p>
              <div style={{ display:"flex", gap:10 }}>
                <button className="btn btn-primary" style={{ padding:"9px 20px" }}>Assign to Patient</button>
                <button style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", color:"#fff", borderRadius:10, padding:"9px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Customize</button>
                <button style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.13)", color:"rgba(255,255,255,.75)", borderRadius:10, padding:"9px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Generate PDF</button>
              </div>
            </div>
<div className="hero-stats" style={{ display:"flex", gap:10, flexShrink:0 }}>
  {[[p.duration,"Duration"],[p.tasks+" tasks","Daily Actions"],[p.hasEdu?"Included":"—","Education"],[p.hasTracking?"Included":"—","Tracking"]].map(([n,l]) => (
                <div key={l} style={{ textAlign:"center", padding:"12px 16px", background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)", borderRadius:14 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:"#fff", letterSpacing:"-.3px", lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,.5)", fontWeight:600, marginTop:5, textTransform:"uppercase", letterSpacing:".06em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding:"9px 14px", background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:10, marginBottom:18, fontSize:12, color:"#92400E", lineHeight:1.5 }}>
          This tool organizes educational wellness protocols and operational workflows. It is not intended to provide medical advice or replace provider judgment.
        </div>

        <div className="tab-bar" style={{ marginBottom:22 }}>
          {tabs.map(t => <button key={t} className={`tab${protoTab===t?" active":""}`} onClick={() => setProtoTab(t)} style={{ textTransform:"capitalize" }}>
            {t==="assign"?"Review & Assign":t.charAt(0).toUpperCase()+t.slice(1)}
          </button>)}
        </div>

        {protoTab==="overview" && (
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:18 }}>
            <div>
              <div style={{ background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:18, padding:22, marginBottom:16, boxShadow:"0 2px 14px rgba(0,174,234,.05)" }}>
                <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:14 }}>What This Protocol Includes</div>
                {p.includes.map((inc, i) => (
                  <div key={inc} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom: i<p.includes.length-1 ? "1px solid #EEF7FC" : "none" }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:"#EEF7FC", border:"1px solid #E8EFF6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Ic n="check" s={10} c="#00AEEA"/>
                    </div>
                    <span style={{ fontSize:13.5, color:"#111111" }}>{inc}</span>
                  </div>
                ))}
              </div>
              <div style={{ background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:18, padding:22, boxShadow:"0 2px 14px rgba(0,174,234,.05)" }}>
                <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:14 }}>Daily Task Preview</div>
                {protoTasks.map((t, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom: i<protoTasks.length-1 ? "1px solid #EEF7FC" : "none" }}>
                    <span style={{ padding:"2px 9px", background:taskTypeColor(t.type)+"14", color:taskTypeColor(t.type), borderRadius:6, fontSize:11, fontWeight:700, flexShrink:0 }}>{t.type}</span>
                    <span style={{ fontSize:13.5, color:"#111111", flex:1 }}>{t.name}</span>
                    <span style={{ fontSize:12, color:"#9BA8BE" }}>{t.freq}</span>
                    {t.required && <span className="badge badge-blue" style={{ fontSize:10 }}>Required</span>}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:16, padding:18, boxShadow:"0 2px 12px rgba(0,174,234,.05)" }}>
                <div style={{ fontSize:11, fontWeight:750, color:"#9BA8BE", letterSpacing:".08em", textTransform:"uppercase", marginBottom:12 }}>Protocol Details</div>
                {[["Category",p.cat],["Duration",p.duration],["Daily Actions",p.tasks+" tasks"],["Education",p.hasEdu?"Included":"—"],["Adherence Tracking",p.hasTracking?"Included":"—"],["Sourcing Support",p.hasSourcing?"Included":"—"]].map(([k,v]) => (
                  <div key={k} style={{ padding:"9px 0", borderBottom:"1px solid #EEF7FC" }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#9BA8BE", textTransform:"uppercase", letterSpacing:".04em" }}>{k}</div>
                    <div style={{ fontSize:13.5, fontWeight:650, color:"#061A44", marginTop:2 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)", border:"1px solid #E8EFF6", borderRadius:16, padding:18 }}>
                <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:10 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#061A44,#00AEEA)", display:"flex", alignItems:"center", justifyContent:"center" }}><Ic n="spark" s={13} c="#fff"/></div>
                  <div style={{ fontWeight:750, fontSize:13, color:"#061A44" }}>PrimevaAI</div>
                </div>
                <p style={{ fontSize:12.5, color:"#4A5B78", lineHeight:1.55, marginBottom:10 }}>Ask PrimevaAI to customize this protocol, generate a patient handout, or suggest related education.</p>
                <button className="btn btn-primary btn-sm" style={{ width:"100%" }}>Ask PrimevaAI</button>
              </div>
            </div>
          </div>
        )}

        {protoTab==="tasks" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div style={{ fontWeight:750, fontSize:15, color:"#061A44" }}>Daily Actions ({protoTasks.length} tasks)</div>
              <button className="btn btn-secondary btn-sm"><Ic n="plus" s={13} c="#00AEEA"/> Add Task</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
              {protoTasks.map((t, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:14, boxShadow:"0 1px 8px rgba(0,174,234,.04)" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:taskTypeColor(t.type), flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:650, fontSize:14, color:"#061A44" }}>{t.name}</div>
                    <div style={{ display:"flex", gap:8, marginTop:4 }}>
                      <span style={{ padding:"1px 8px", background:taskTypeColor(t.type)+"14", color:taskTypeColor(t.type), borderRadius:4, fontSize:11, fontWeight:650 }}>{t.type}</span>
                      <span style={{ fontSize:12, color:"#9BA8BE" }}>{t.freq} · {t.time}</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    {t.required ? <span className="badge badge-blue" style={{ fontSize:10 }}>Required</span> : <span className="badge badge-gray" style={{ fontSize:10 }}>Optional</span>}
                    <button className="btn btn-ghost btn-sm" style={{ fontSize:11 }}>Edit</button>
                    <button className="btn btn-ghost btn-sm" style={{ fontSize:11, color:"#EF4444" }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-secondary btn-sm"><Ic n="plus" s={13} c="#00AEEA"/> Add Nutrition Task</button>
              <button className="btn btn-secondary btn-sm"><Ic n="plus" s={13} c="#3ED1C2"/> Add Supplement Task</button>
              <button className="btn btn-secondary btn-sm"><Ic n="plus" s={13} c="#10B981"/> Add Exercise Task</button>
              <button className="btn btn-secondary btn-sm"><Ic n="plus" s={13} c="#00AEEA"/> Add Sleep Task</button>
            </div>
          </div>
        )}

        {protoTab==="education" && (
          <div>
            <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:16 }}>Attach Education Resources</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {["Protein Intake Basics","Hydration & Electrolytes","Sleep Routine Foundations","Supplement Consistency Guide","GLP-1 Lifestyle Support","Lab Prep Checklist","Metabolic Health Basics","Recovery Day Guide"].map((edu, i) => (
                <div key={edu} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:12, cursor:"pointer" }}>
                  <div style={{ width:20, height:20, borderRadius:4, border:`2px solid ${i<3?"#00AEEA":"#D8EAF3"}`, background:i<3?"#EEF7FC":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {i<3 && <Ic n="check" s={10} c="#00AEEA"/>}
                  </div>
                  <span style={{ fontSize:13.5, color:"#111111" }}>{edu}</span>
                  {i<3 && <span className="badge badge-blue" style={{ marginLeft:"auto", fontSize:10 }}>Added</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {protoTab==="sourcing" && (
          <div>
            <p style={{ fontSize:12.5, color:"#4A5B78", marginBottom:4, lineHeight:1.5 }}>Some partner links may generate compensation for Primeva. Recommendations are for educational and wellness support only and should be reviewed with the provider when applicable.</p>
            <div style={{ padding:"10px 14px", background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:9, marginBottom:18, fontSize:12, color:"#92400E", lineHeight:1.5 }}>Recommendations should be reviewed with provider judgment before clinical implementation.</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
              {SOURCING_RECS.map(s => (
                <div key={s.name} style={{ background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:18, padding:20, boxShadow:"0 2px 12px rgba(0,174,234,.05)", transition:"all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.borderColor="#B8D9F0"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.borderColor="#D8EAF3"; }}>
                  <div style={{ marginBottom:10 }}><span className="badge badge-blue">{s.cat}</span></div>
                  <div style={{ fontWeight:750, fontSize:14, color:"#061A44", marginBottom:8 }}>{s.name}</div>
                  <div style={{ padding:"9px 12px", background:"#EEF7FC", borderRadius:9, marginBottom:10 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#9BA8BE", textTransform:"uppercase", letterSpacing:".04em", marginBottom:3 }}>Why It Supports This Protocol</div>
                    <p style={{ fontSize:12.5, color:"#061A44", lineHeight:1.5 }}>{s.why}</p>
                  </div>
                  <div style={{ padding:"9px 12px", background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:9, marginBottom:12 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#B45309", textTransform:"uppercase", letterSpacing:".04em", marginBottom:3 }}>Provider Note</div>
                    <p style={{ fontSize:12.5, color:"#78350F", lineHeight:1.5 }}>{s.note}</p>
                  </div>
                  <div style={{ padding:"5px 10px", background:"#EEF7FC", borderRadius:7, fontSize:11.5, color:"#00AEEA", fontWeight:600, marginBottom:12 }}>Patient Offer: {s.offer}</div>
                  <button className="btn btn-primary btn-sm" style={{ width:"100%" }}>Add to Protocol</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {protoTab==="assign" && (
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:18 }}>
            <div className="card">
              <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:20 }}>Protocol Summary</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:20 }}>
                {[["Protocol",p.title],["Category",p.cat],["Duration",p.duration],["Daily Actions",p.tasks+" tasks"],["Education",p.hasEdu?"Included":"—"],["Sourcing",p.hasSourcing?"Included":"—"]].map(([k,v]) => (
                  <div key={k}>
                    <div style={{ fontSize:11, fontWeight:750, color:"#9BA8BE", textTransform:"uppercase", letterSpacing:".05em" }}>{k}</div>
                    <div style={{ fontSize:14, fontWeight:750, color:"#061A44", marginTop:4 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="form-group" style={{ marginBottom:14 }}>
                <label className="form-label">Assign to Patient</label>
                <select className="form-input"><option>Select patient...</option>{PATIENTS.map(p => <option key={p.id}>{p.name}</option>)}</select>
              </div>
              <div className="form-group" style={{ marginBottom:14 }}>
                <label className="form-label">Start Date</label>
                <input className="form-input" type="date" defaultValue="2026-05-27"/>
              </div>
              <div className="form-group" style={{ marginBottom:20 }}>
                <label className="form-label">Provider Notes</label>
                <textarea className="form-input" rows={3} placeholder="Add notes for this patient's protocol..." style={{ resize:"none" }}/>
              </div>
              <div style={{ padding:"10px 14px", background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:9, marginBottom:18, fontSize:11.5, color:"#92400E", lineHeight:1.5 }}>
                This tool organizes educational wellness protocols and operational workflows. It is not intended to provide medical advice or replace provider judgment.
              </div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                <button className="btn btn-primary">Assign to Patient</button>
                <button className="btn btn-secondary">Save Template</button>
                <button className="btn btn-secondary">Generate Patient PDF</button>
                <button className="btn btn-secondary">Generate Clinic Handout</button>
                <button className="btn btn-ghost">Save Draft</button>
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)", border:"1px solid #E8EFF6", borderRadius:16, padding:18 }}>
                <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:10 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#061A44,#00AEEA)", display:"flex", alignItems:"center", justifyContent:"center" }}><Ic n="spark" s={13} c="#fff"/></div>
                  <div style={{ fontWeight:750, fontSize:13, color:"#061A44" }}>PrimevaAI</div>
                </div>
                <p style={{ fontSize:12.5, color:"#4A5B78", lineHeight:1.55, marginBottom:10 }}>Ask PrimevaAI to generate a patient summary, customize this protocol, or create a handout.</p>
                <button className="btn btn-primary btn-sm" style={{ width:"100%" }}>Ask PrimevaAI</button>
              </div>
              <div style={{ background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:14, padding:16 }}>
                <div style={{ fontSize:11, fontWeight:750, color:"#9BA8BE", letterSpacing:".08em", textTransform:"uppercase", marginBottom:10 }}>Recent Assignments</div>
                {PATIENTS.slice(0,3).map(p => (
                  <div key={p.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid #EEF7FC" }}>
                    <span style={{ fontSize:13, color:"#111111" }}>{p.name}</span>
                    <span className="badge badge-green" style={{ fontSize:10 }}>{p.status==="active"?"Active":"Pending"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Protocol Builder ─────────────────────────────────────────────────
  if (view === "builder") {
    const steps = ["Protocol Type","Define Goals","Daily Actions","Add Education","Sourcing","Review & Assign"];
    return (
      <div style={{ padding:"28px 32px" }} className="fade">
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => { setView("library"); setBuilderStep(1); }} style={{ color:"#4A5B78" }}>← Protocols</button>
          <span style={{ color:"#D8EAF3" }}>›</span>
          <span style={{ fontSize:13, fontWeight:600, color:"#061A44" }}>Build Custom Protocol</span>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div><div style={{ fontSize:22, fontWeight:800, color:"#061A44", letterSpacing:"-.5px" }}>Custom Protocol Builder</div><div style={{ fontSize:13, color:"#4A5B78", marginTop:3 }}>Create a tailored wellness protocol to assign to your patient.</div></div>
          <div style={{ display:"flex", gap:8 }}><button className="btn btn-secondary">Save Draft</button><button className="btn btn-primary" onClick={() => setBuilderStep(s => Math.min(s+1, 6))}>Next Step →</button></div>
        </div>
        <div className="step-bar" style={{ marginBottom:28 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display:"flex", alignItems:"center", flex: i < steps.length-1 ? 1 : "none" }}>
              <div className="step" onClick={() => setBuilderStep(i+1)}>
                <div className={`step-num${builderStep>i+1?" done":builderStep===i+1?" active":""}`}>{builderStep>i+1?<Ic n="check" s={11} c="#fff"/>:i+1}</div>
                <span className={`step-name${builderStep===i+1?" active":""}`}>{s}</span>
              </div>
              {i < steps.length-1 && <div className="step-divider"/>}
            </div>
          ))}
        </div>

        {builderStep===1 && (
          <div>
            <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:16 }}>Select Protocol Type</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
              {["Metabolic Optimization","Nutrition Foundation","Supplement Foundation","Sleep Optimization","Strength & Recovery","GLP-1 Lifestyle Support","Hormone Support","Longevity Foundations","Stress Resilience","Lab Monitoring","Post-Procedure Recovery","Custom Protocol"].map(t => (
                <div key={t} onClick={() => setSelectedType(t)}
                  style={{ padding:"16px 14px", background:selectedType===t?"#EEF7FC":"#FFFFFF", border:`1px solid ${selectedType===t?"#00AEEA":"#D8EAF3"}`, borderRadius:14, cursor:"pointer", transition:"all .15s" }}>
                  <div style={{ fontWeight:650, fontSize:13, color:selectedType===t?"#00AEEA":"#061A44", lineHeight:1.4 }}>{t}</div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" onClick={() => setBuilderStep(2)}>Continue →</button>
          </div>
        )}

        {builderStep===2 && (
          <div>
            <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:18 }}>Define Protocol Goals</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
              {[["Protocol Name",`${selectedType||"Custom"} Protocol`,"text"],["Primary Goal","e.g. Improve metabolic health and energy","text"],["Secondary Goal","e.g. Build consistent supplement routine","text"],["Duration","e.g. 12 weeks","text"],["Check-In Frequency","e.g. Weekly","text"],["Patient Readiness","—","select"]].map(([l,ph,type]) => (
                <div key={l} className="form-group">
                  <label className="form-label">{l}</label>
                  {type==="select" ? <select className="form-input"><option>High — Ready to start</option><option>Medium — Needs motivation</option><option>Low — Needs education first</option></select> : <input className="form-input" placeholder={ph} defaultValue={l==="Protocol Name"?ph:""}/>}
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-secondary" onClick={() => setBuilderStep(1)}>← Back</button>
              <button className="btn btn-primary" onClick={() => setBuilderStep(3)}>Continue →</button>
            </div>
          </div>
        )}

        {builderStep===3 && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div style={{ fontWeight:750, fontSize:15, color:"#061A44" }}>Build Daily Actions</div>
              <button className="btn btn-secondary btn-sm"><Ic n="plus" s={13} c="#00AEEA"/> Add Task</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
              {protoTasks.map((t, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 18px", background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:14, boxShadow:"0 1px 8px rgba(0,174,234,.04)" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:taskTypeColor(t.type), flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:650, fontSize:14, color:"#061A44" }}>{t.name}</div>
                    <div style={{ display:"flex", gap:8, marginTop:3 }}>
                      <span style={{ padding:"1px 8px", background:taskTypeColor(t.type)+"14", color:taskTypeColor(t.type), borderRadius:4, fontSize:11, fontWeight:650 }}>{t.type}</span>
                      <span style={{ fontSize:12, color:"#9BA8BE" }}>{t.freq} · {t.time}</span>
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm" style={{ fontSize:11 }}>Edit</button>
                  <button className="btn btn-ghost btn-sm" style={{ fontSize:11 }}>Required / Optional</button>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-secondary" onClick={() => setBuilderStep(2)}>← Back</button>
              <button className="btn btn-primary" onClick={() => setBuilderStep(4)}>Continue →</button>
            </div>
          </div>
        )}

        {builderStep===4 && (
          <div>
            <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:16 }}>Add Education Resources</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
              {["Protein Intake Basics","Hydration & Electrolytes","Sleep Routine Foundations","Supplement Consistency Guide","GLP-1 Lifestyle Support","Lab Prep Checklist","Metabolic Health Basics","Recovery Day Guide"].map((edu, i) => (
                <div key={edu} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", background:i<3?"#EEF7FC":"#FFFFFF", border:`1px solid ${i<3?"#00AEEA":"#D8EAF3"}`, borderRadius:12, cursor:"pointer", transition:"all .15s" }}>
                  <div style={{ width:20, height:20, borderRadius:4, border:`2px solid ${i<3?"#00AEEA":"#D8EAF3"}`, background:i<3?"#FFFFFF":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {i<3 && <Ic n="check" s={10} c="#00AEEA"/>}
                  </div>
                  <span style={{ fontSize:13.5, color:"#111111" }}>{edu}</span>
                  {i<3 && <span className="badge badge-blue" style={{ marginLeft:"auto", fontSize:10 }}>Added</span>}
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-secondary" onClick={() => setBuilderStep(3)}>← Back</button>
              <button className="btn btn-primary" onClick={() => setBuilderStep(5)}>Continue →</button>
            </div>
          </div>
        )}

        {builderStep===5 && (
          <div>
            <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:6 }}>Add Sourcing Recommendations</div>
            <p style={{ fontSize:12.5, color:"#4A5B78", marginBottom:16, lineHeight:1.5 }}>Add relevant partner resources to support this protocol. These will be visible to the patient on their Protocol page.</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:20 }}>
              {SOURCING_RECS.map(s => (
                <div key={s.name} style={{ background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:16, padding:18, boxShadow:"0 2px 12px rgba(0,174,234,.05)" }}>
                  <div style={{ marginBottom:8 }}><span className="badge badge-blue">{s.cat}</span></div>
                  <div style={{ fontWeight:750, fontSize:13.5, color:"#061A44", marginBottom:6 }}>{s.name}</div>
                  <p style={{ fontSize:12, color:"#4A5B78", lineHeight:1.5, marginBottom:10 }}>{s.why}</p>
                  <div style={{ padding:"5px 10px", background:"#EEF7FC", borderRadius:7, fontSize:11.5, color:"#00AEEA", fontWeight:600, marginBottom:12 }}>Patient Offer: {s.offer}</div>
                  <button className="btn btn-primary btn-sm" style={{ width:"100%" }}>Add to Protocol</button>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-secondary" onClick={() => setBuilderStep(4)}>← Back</button>
              <button className="btn btn-primary" onClick={() => setBuilderStep(6)}>Continue →</button>
            </div>
          </div>
        )}

        {builderStep===6 && (
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:18 }}>
            <div className="card">
              <div style={{ fontWeight:750, fontSize:16, color:"#061A44", marginBottom:20 }}>Review & Assign Protocol</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:20 }}>
                {[["Protocol",selectedType||"Custom Protocol"],["Duration","12 weeks"],["Daily Tasks",protoTasks.length+" tasks"],["Education","3 resources"],["Sourcing","3 partners"],["Patient","Unassigned"]].map(([k,v]) => (
                  <div key={k}>
                    <div style={{ fontSize:11, fontWeight:750, color:"#9BA8BE", textTransform:"uppercase", letterSpacing:".05em" }}>{k}</div>
                    <div style={{ fontSize:14, fontWeight:750, color:"#061A44", marginTop:4 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="form-group" style={{ marginBottom:14 }}>
                <label className="form-label">Assign to Patient</label>
                <select className="form-input"><option>Select patient...</option>{PATIENTS.map(p => <option key={p.id}>{p.name}</option>)}</select>
              </div>
              <div className="form-group" style={{ marginBottom:20 }}>
                <label className="form-label">Provider Notes</label>
                <textarea className="form-input" rows={3} placeholder="Notes for this patient's protocol..." style={{ resize:"none" }}/>
              </div>
              <div style={{ padding:"10px 14px", background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:9, marginBottom:18, fontSize:11.5, color:"#92400E", lineHeight:1.5 }}>
                This tool organizes educational wellness protocols and operational workflows. It is not intended to provide medical advice or replace provider judgment.
              </div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                <button className="btn btn-primary">Assign to Patient</button>
                <button className="btn btn-secondary">Save Template</button>
                <button className="btn btn-secondary">Generate Patient PDF</button>
                <button className="btn btn-secondary">Generate Clinic Handout</button>
                <button className="btn btn-ghost" onClick={() => setBuilderStep(5)}>← Back</button>
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)", border:"1px solid #E8EFF6", borderRadius:16, padding:18 }}>
                <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:10 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#061A44,#00AEEA)", display:"flex", alignItems:"center", justifyContent:"center" }}><Ic n="spark" s={13} c="#fff"/></div>
                  <div style={{ fontWeight:750, fontSize:13, color:"#061A44" }}>PrimevaAI</div>
                </div>
                <p style={{ fontSize:12.5, color:"#4A5B78", lineHeight:1.55, marginBottom:10 }}>Ask PrimevaAI to generate a patient summary, refine this protocol, or create an accompanying handout.</p>
                <button className="btn btn-primary btn-sm" style={{ width:"100%" }}>Ask PrimevaAI</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Protocol Library ─────────────────────────────────────────────────
  return (
    <div style={{ padding:"28px 32px" }} className="fade">

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#061A44 0%,#081F4D 60%,#0A4A8A 100%)", borderRadius:20, padding:"28px 32px", marginBottom:22, position:"relative", overflow:"hidden", boxShadow:"0 8px 36px rgba(6,26,68,.18)" }}>
        <div style={{ position:"absolute", right:-50, top:-50, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,174,234,.18) 0%,transparent 70%)" }}/>
        <div style={{ position:"absolute", left:"30%", bottom:-60, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(62,209,194,.1) 0%,transparent 70%)" }}/>
        <div style={{ position:"relative", zIndex:1, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11, fontWeight:750, color:"rgba(255,255,255,.45)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:10 }}>Provider-Guided Wellness Platform</div>
            <h1 style={{ fontSize:26, fontWeight:800, color:"#fff", letterSpacing:"-.6px", marginBottom:8, lineHeight:1.2 }}>Provider-Guided Wellness Protocols</h1>
            <p style={{ fontSize:13.5, color:"rgba(255,255,255,.6)", maxWidth:480, lineHeight:1.7, marginBottom:22 }}>
              Create structured protocols for nutrition, supplements, sleep, recovery, metabolic health, fitness, longevity, and patient accountability.
            </p>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-primary" style={{ padding:"9px 20px" }} onClick={() => setView("builder")}>Create Protocol</button>
              <button style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", color:"#fff", borderRadius:10, padding:"9px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Browse Templates</button>
              <button style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.13)", color:"rgba(255,255,255,.75)", borderRadius:10, padding:"9px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Assign to Patient</button>
            </div>
          </div>
          <div style={{ display:"flex", gap:12, flexShrink:0 }}>
            {[["8","Templates"],["12","Categories"],["48","Active Patients"]].map(([n,l]) => (
              <div key={l} style={{ textAlign:"center", padding:"14px 18px", background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.15)", borderRadius:16 }}>
                <div style={{ fontSize:26, fontWeight:800, color:"#fff", letterSpacing:"-1px", lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:10.5, color:"rgba(255,255,255,.5)", fontWeight:600, marginTop:5, textTransform:"uppercase", letterSpacing:".06em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category filter chips */}
      <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:22 }}>
        {PROTO_CATS.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${catFilter===c?"#00AEEA":"#D8EAF3"}`, background:catFilter===c?"#EEF7FC":"#FFFFFF", color:catFilter===c?"#00AEEA":"#4A5B78", fontSize:12.5, fontWeight:catFilter===c?700:500, cursor:"pointer", fontFamily:"inherit", transition:"all .15s", whiteSpace:"nowrap" }}>
            {c==="all"?"All Protocols":c}
          </button>
        ))}
      </div>

      {/* Protocol cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18, marginBottom:32 }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:20, padding:24, boxShadow:"0 2px 16px rgba(0,174,234,.06)", cursor:"pointer", transition:"all .22s", position:"relative", overflow:"hidden" }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 10px 32px rgba(0,174,234,.12)`; e.currentTarget.style.borderColor="#B8D9F0"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 2px 16px rgba(0,174,234,.06)"; e.currentTarget.style.borderColor="#D8EAF3"; }}
            onClick={() => { setActiveProto(p); setProtoTab("overview"); }}>
            <div style={{ position:"absolute", right:-20, top:-20, width:120, height:120, borderRadius:"50%", background:`radial-gradient(circle,${catColor(p.catId)}08 0%,transparent 70%)` }}/>
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                <div>
                  <div style={{ marginBottom:8 }}><span style={{ padding:"3px 10px", background:`${catColor(p.catId)}12`, color:catColor(p.catId), borderRadius:20, fontSize:11.5, fontWeight:700 }}>{p.cat}</span></div>
                  <div style={{ fontWeight:800, fontSize:18, color:"#061A44", letterSpacing:"-.3px", lineHeight:1.2 }}>{p.title}</div>
                </div>
                <div style={{ fontSize:12, color:"#9BA8BE", textAlign:"right", flexShrink:0, marginLeft:12 }}>
                  <div style={{ fontWeight:700, color:"#061A44" }}>{p.duration}</div>
                  <div>{p.tasks} daily tasks</div>
                </div>
              </div>
              <p style={{ fontSize:13.5, color:"#4A5B78", lineHeight:1.65, marginBottom:16 }}>{p.desc}</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18 }}>
                {p.hasEdu && <span style={{ padding:"3px 10px", background:"#EEF7FC", border:"1px solid #E8EFF6", borderRadius:20, fontSize:11.5, fontWeight:600, color:"#00AEEA" }}>Education Included</span>}
                {p.hasSourcing && <span style={{ padding:"3px 10px", background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:20, fontSize:11.5, fontWeight:600, color:"#16A34A" }}>Sourcing Support</span>}
                {p.hasTracking && <span style={{ padding:"3px 10px", background:"rgba(62,209,194,.1)", border:"1px solid rgba(62,209,194,.25)", borderRadius:20, fontSize:11.5, fontWeight:600, color:"#3ED1C2" }}>Adherence Tracking</span>}
              </div>
              <div style={{ display:"flex", gap:9 }}>
                <button className="btn btn-primary btn-sm" style={{ flex:1, justifyContent:"center" }} onClick={e => { e.stopPropagation(); setActiveProto(p); setProtoTab("overview"); }}>View Template →</button>
                <button className="btn btn-secondary btn-sm" style={{ flex:1, justifyContent:"center" }} onClick={e => e.stopPropagation()}>Assign to Patient</button>
                <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); setView("builder"); }}>Customize</button>
              </div>
            </div>
          </div>
        ))}

        {/* Build custom card */}
        <div style={{ background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)", border:"2px dashed #B8D9F0", borderRadius:20, padding:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", gap:12, cursor:"pointer", transition:"all .2s", minHeight:200 }}
          onClick={() => setView("builder")}
          onMouseEnter={e => { e.currentTarget.style.borderColor="#00AEEA"; e.currentTarget.style.background="rgba(0,174,234,.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="#B8D9F0"; e.currentTarget.style.background="linear-gradient(135deg,#EEF7FC,#F5FAFD)"; }}>
          <div style={{ width:52, height:52, borderRadius:14, background:"#FFFFFF", border:"1px solid #E8EFF6", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 12px rgba(0,174,234,.08)" }}>
            <Ic n="plus" s={22} c="#00AEEA"/>
          </div>
          <div style={{ fontWeight:800, fontSize:16, color:"#061A44" }}>Build Custom Protocol</div>
          <div style={{ fontSize:13, color:"#4A5B78", maxWidth:260, lineHeight:1.55 }}>Create a fully customized wellness protocol tailored to your patient's specific goals and needs.</div>
          <button className="btn btn-primary btn-sm" style={{ marginTop:4 }}>Open Protocol Builder →</button>
        </div>
      </div>
    </div>
  );
};

export default Protocols;
