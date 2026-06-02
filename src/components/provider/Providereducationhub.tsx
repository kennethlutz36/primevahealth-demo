// ── ProviderEducationHub ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring, Spark } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge, AI_REPLIES } from '../../data/mockPatients';
import { PROV_PARTNERS } from '../../data/mockSourcing';
import { ProviderLabSection } from '../labs';


const Education = ({ isProvider = true }) => {
  const [section, setSection] = useState("categories");
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState(null);

  const CATS = [
    { id:"peptides", label:"Peptides", color:"#061A44", desc:"Peptide categories, mechanisms, responsible discussions, sourcing context, and provider-guided implementation.", resources:14, handouts:5, modules:12 },
    { id:"supplements", label:"Supplements", color:"#00AEEA", desc:"Foundational supplements, timing, consistency, quality standards, sourcing, and protocol support.", resources:10, handouts:7, modules:8 },
    { id:"nutrition", label:"Nutrition", color:"#3ED1C2", desc:"Protein intake, meal structure, hydration, nutrient timing, metabolic health, and sustainable eating habits.", resources:12, handouts:10, modules:9 },
    { id:"exercise", label:"Exercise", color:"#10B981", desc:"Strength training, cardiovascular health, mobility, exercise adherence, and performance support.", resources:9, handouts:6, modules:8 },
    { id:"sleep", label:"Sleep & Recovery", color:"#00AEEA", desc:"Sleep quality, circadian rhythm, recovery routines, stress load, HRV, and evening behavior patterns.", resources:11, handouts:8, modules:10 },
    { id:"labs", label:"Labs & Biomarkers", color:"#F59E0B", desc:"Baseline wellness labs, biomarker trends, lab prep, monitoring workflows, and patient education.", resources:10, handouts:8, modules:9 },
  ];

  const PATHS = [
    { title:"Metabolic Reset", audience:"Patient", lessons:6, desc:"Core habits for metabolic health — protein, movement, hydration, and consistency.", prog:0 },
    { title:"GLP-1 Lifestyle Support", audience:"Patient", lessons:8, desc:"Structured support for protein, hydration, GI-friendly meals, and consistency.", prog:35 },
    { title:"Supplement Foundations", audience:"Patient", lessons:4, desc:"Supplement timing, adherence, consistency, and quality education.", prog:100 },
    { title:"Sleep Optimization", audience:"Patient", lessons:5, desc:"Evening routines, sleep timing, recovery habits, and stress management.", prog:60 },
    { title:"Strength & Recovery", audience:"Provider", lessons:7, desc:"Training consistency, mobility, recovery nutrition, and rest-day habits.", prog:20 },
    { title:"Peptide Education Basics", audience:"Provider", lessons:7, desc:"Foundational peptide education — categories, safety, sourcing context.", prog:45 },
    { title:"Lab Prep Foundations", audience:"Patient", lessons:4, desc:"How to prepare for wellness labs and understand biomarker monitoring.", prog:0 },
  ];

  const RESOURCES = [
    { title:"Protein Intake Basics", cat:"Nutrition", type:"Handout", time:"8 min", desc:"Protein targets, meal examples, and simple daily tracking strategies." },
    { title:"Hydration & Electrolytes", cat:"Nutrition", type:"Handout", time:"6 min", desc:"Daily hydration targets, electrolyte timing, and signs of poor hydration." },
    { title:"Supplement Quality Guide", cat:"Supplements", type:"Article", time:"9 min", desc:"How to evaluate supplement quality — testing standards, COAs, and sourcing." },
    { title:"Sleep Routine Foundations", cat:"Sleep & Recovery", type:"Handout", time:"7 min", desc:"Practical evening routine guide for sleep quality and circadian rhythm." },
    { title:"Injection Safety Basics", cat:"Peptides", type:"Handout", time:"9 min", desc:"Storage, handling, site rotation, and safe injection workflow for patients." },
    { title:"Lab Prep Checklist", cat:"Labs & Biomarkers", type:"Handout", time:"5 min", desc:"Patient-facing checklist for preparing for wellness and biomarker labs." },
    { title:"Recovery Day Guide", cat:"Sleep & Recovery", type:"Handout", time:"8 min", desc:"Active recovery, mobility, sleep, hydration, and recovery nutrition." },
  ];

  const TOOLS = [
    { label:"Assign Education to Patient", icon:"patients" },
    { label:"Add Resource to Protocol", icon:"protocol" },
    { label:"Generate Clinic Handout", icon:"handout" },
    { label:"Create Patient PDF", icon:"protocol" },
    { label:"Ask PrimevaAI", icon:"spark" },
  ];

  const SAFETY = [
    { title:"Sourcing Quality Guide", desc:"How to evaluate sourcing partners, COAs, and quality documentation." },
    { title:"Patient Safety Education", desc:"Red flags, side effect awareness, and when to contact a provider." },
    { title:"Supplement Quality Checklist", desc:"Standards to review when evaluating supplement products for patients." },
    { title:"Injection Safety Basics", desc:"Safe injection technique, hygiene, and what to do if something feels wrong." },
    { title:"Lab Prep Standards", desc:"How to prepare patients for common wellness and biomarker lab appointments." },
    { title:"Educational Disclaimers", desc:"Standardized educational use language for clinical communications." },
  ];

  const audienceColor = a => ({ Provider:"#00AEEA", Patient:"#3ED1C2", Staff:"#F59E0B" }[a] || "#00AEEA");

  const navSections = isProvider
    ? [{id:"categories",label:"Core Categories"},{id:"paths",label:"Learning Paths"},{id:"resources",label:"Featured Resources"},{id:"tools",label:"Provider Tools"},{id:"safety",label:"Safety & Quality"}]
    : [{id:"categories",label:"My Learning"},{id:"paths",label:"Learning Paths"},{id:"resources",label:"Resources"},{id:"safety",label:"Safety & FAQs"}];

  if (activeCat) {
    const cat = CATS.find(c => c.id === activeCat);
    return (
      <div style={{padding:"28px 32px"}} className="fade">
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
          <button className="btn btn-ghost btn-sm" onClick={()=>setActiveCat(null)} style={{color:"#4A5B78"}}>← Education Hub</button>
          <span style={{color:"#D8EAF3"}}>›</span>
          <span style={{fontSize:13,fontWeight:600,color:"#061A44"}}>{cat.label}</span>
        </div>
        <div style={{background:`linear-gradient(135deg,#061A44,#081F4D)`,borderRadius:20,padding:"26px 30px",marginBottom:20,position:"relative",overflow:"hidden",boxShadow:"0 8px 32px rgba(6,26,68,.18)"}}>
          <div style={{position:"absolute",right:-40,top:-40,width:240,height:240,borderRadius:"50%",background:`radial-gradient(circle,${cat.color}22,transparent 70%)`}}/>
          <div style={{position:"relative",zIndex:1,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{marginBottom:10}}><span style={{padding:"3px 12px",background:`${cat.color}22`,border:`1px solid ${cat.color}44`,borderRadius:20,fontSize:12,fontWeight:700,color:cat.color}}>{cat.label}</span></div>
              <h1 style={{fontSize:24,fontWeight:800,color:"#fff",letterSpacing:"-.4px",marginBottom:8,lineHeight:1.3}}>{cat.label}</h1>
              <p style={{fontSize:13.5,color:"rgba(255,255,255,.6)",maxWidth:500,lineHeight:1.7,marginBottom:20}}>{cat.desc}</p>
              <div style={{display:"flex",gap:10}}>
                <button className="btn btn-primary" style={{padding:"9px 20px"}}>View All Resources</button>
                {isProvider && <button style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",borderRadius:10,padding:"9px 20px",fontSize:13,fontWeight:600,cursor:"pointer"}}>Assign to Patient</button>}
              </div>
            </div>
            <div style={{display:"flex",gap:12,flexShrink:0}}>
              {[[cat.resources,"Resources"],[cat.handouts,"Handouts"],[cat.modules,"Modules"]].map(([n,l])=>(
                <div key={l} style={{textAlign:"center",padding:"12px 16px",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",borderRadius:14}}>
                  <div style={{fontSize:24,fontWeight:800,color:"#fff",letterSpacing:"-1px",lineHeight:1}}>{n}</div>
                  <div style={{fontSize:10.5,color:"rgba(255,255,255,.5)",fontWeight:600,marginTop:4,textTransform:"uppercase",letterSpacing:".06em"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{padding:"9px 14px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:10,marginBottom:18,fontSize:12,color:"#92400E",lineHeight:1.5}}>
          Primeva resources are for educational and wellness support only and are not intended to replace clinical judgment, medical advice, or regulatory review.
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {[...Array(6)].map((_,i)=>(
            <div key={i} style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:20,boxShadow:"0 2px 14px rgba(0,174,234,.05)",transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor="#B8D9F0";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="#D8EAF3";}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span className="badge badge-blue">{cat.label}</span>
                <span style={{fontSize:11.5,color:"#9BA8BE"}}>{[8,10,12,9,11,14][i]} min</span>
              </div>
              <div style={{fontWeight:750,fontSize:14,color:"#061A44",marginBottom:6,lineHeight:1.35}}>{cat.label} — {["Foundations","Core Concepts","Patient Education","Implementation","Monitoring","Advanced Reference"][i]}</div>
              <p style={{fontSize:12.5,color:"#4A5B78",lineHeight:1.6,marginBottom:14}}>Provider and patient education covering {cat.label.toLowerCase()} essentials, implementation support, and clinical context.</p>
              <div style={{display:"flex",gap:7}}>
                <button className="btn btn-primary btn-sm" style={{flex:1}}>Open</button>
                {isProvider && <button className="btn btn-secondary btn-sm" style={{flex:1}}>Assign</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{padding:"28px 32px"}} className="fade">
      {/* Compact hero */}
      <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:20,padding:"24px 28px",marginBottom:22,boxShadow:"0 2px 20px rgba(0,174,234,.06)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-60,top:-60,width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,174,234,.05),transparent 70%)"}}/>
        <div style={{position:"absolute",left:-30,bottom:-30,width:160,height:160,borderRadius:"50%",background:"radial-gradient(circle,rgba(62,209,194,.05),transparent 70%)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:11,fontWeight:750,color:"#00AEEA",letterSpacing:".1em",textTransform:"uppercase",marginBottom:6}}>
            {isProvider ? "Provider Education Library" : "Your Wellness Education"}
          </div>
          <h1 style={{fontSize:22,fontWeight:800,color:"#061A44",letterSpacing:"-.4px",marginBottom:6,lineHeight:1.25}}>
            Wellness Education for Provider-Guided Optimization
          </h1>
          <p style={{fontSize:13.5,color:"#4A5B78",maxWidth:560,lineHeight:1.65,marginBottom:16}}>
            {isProvider
              ? "Browse focused education across peptides, supplements, nutrition, exercise, sleep, recovery, and labs."
              : "Your provider has curated a personalized learning path to support your protocol and lifestyle goals."}
          </p>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:9,background:"#F5FAFD",border:"1px solid #E8EFF6",borderRadius:11,padding:"9px 14px",flex:1,maxWidth:400}}>
              <Ic n="search" s={14} c="#9BA8BE"/>
              <input placeholder="Search education, handouts, and wellness topics..." style={{border:"none",background:"transparent",outline:"none",fontSize:13.5,color:"#061A44",width:"100%",fontFamily:"inherit"}} value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            {isProvider && <div style={{display:"flex",gap:20,marginLeft:"auto"}}>
              {[["120+","Resources"],["6","Categories"],["40+","Handouts"]].map(([n,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <div style={{fontSize:20,fontWeight:800,color:"#061A44",letterSpacing:"-1px",lineHeight:1}}>{n}</div>
                  <div style={{fontSize:10.5,color:"#9BA8BE",fontWeight:600,marginTop:3,textTransform:"uppercase",letterSpacing:".06em"}}>{l}</div>
                </div>
              ))}
            </div>}
          </div>
        </div>
      </div>

      <div className="tab-bar" style={{marginBottom:22}}>
        {navSections.map(s=><button key={s.id} className={`tab${section===s.id?" active":""}`} onClick={()=>setSection(s.id)}>{s.label}</button>)}
      </div>

      {section==="categories" && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {CATS.filter(c=>!search||c.label.toLowerCase().includes(search.toLowerCase())||c.desc.toLowerCase().includes(search.toLowerCase())).map(cat=>(
            <div key={cat.id} style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:24,boxShadow:"0 2px 16px rgba(0,174,234,.06)",cursor:"pointer",transition:"all .22s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 10px 32px rgba(0,174,234,.12)";e.currentTarget.style.borderColor="#B8D9F0";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 16px rgba(0,174,234,.06)";e.currentTarget.style.borderColor="#D8EAF3";}}
              onClick={()=>setActiveCat(cat.id)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div style={{width:44,height:44,borderRadius:13,background:`${cat.color}12`,border:`1px solid ${cat.color}28`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <div style={{fontWeight:800,fontSize:18,color:cat.color}}>{cat.label.charAt(0)}</div>
                </div>
                <div style={{width:8,height:8,borderRadius:"50%",background:cat.color,flexShrink:0,marginTop:4}}/>
              </div>
              <div style={{fontWeight:750,fontSize:15,color:"#061A44",marginBottom:8,lineHeight:1.3}}>{cat.label}</div>
              <p style={{fontSize:13,color:"#4A5B78",lineHeight:1.65,marginBottom:16}}>{cat.desc}</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
                {[[cat.resources,"Resources"],[cat.handouts,"Handouts"],[cat.modules,"Modules"]].map(([n,l])=>(
                  <div key={l} style={{textAlign:"center",padding:"8px 4px",background:"#F5FAFD",borderRadius:9,border:"1px solid #EEF7FC"}}>
                    <div style={{fontWeight:800,fontSize:18,color:"#061A44",letterSpacing:"-.5px",lineHeight:1}}>{n}</div>
                    <div style={{fontSize:10,color:"#9BA8BE",fontWeight:600,marginTop:3,textTransform:"uppercase",letterSpacing:".04em"}}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button className="btn btn-primary btn-sm" style={{flex:1,justifyContent:"center"}} onClick={e=>{e.stopPropagation();setActiveCat(cat.id);}}>View Resources →</button>
                {isProvider && <button className="btn btn-secondary btn-sm" style={{flex:1,justifyContent:"center"}} onClick={e=>e.stopPropagation()}>Assign</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {section==="paths" && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
          {PATHS.map(p=>(
            <div key={p.title} style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:22,boxShadow:"0 2px 14px rgba(0,174,234,.05)",transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor="#B8D9F0";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="#D8EAF3";}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div style={{fontWeight:750,fontSize:15,color:"#061A44",lineHeight:1.3}}>{p.title}</div>
                <span style={{padding:"3px 10px",background:audienceColor(p.audience)+"14",color:audienceColor(p.audience),borderRadius:20,fontSize:11,fontWeight:700,flexShrink:0,marginLeft:10}}>{p.audience}</span>
              </div>
              <p style={{fontSize:13,color:"#4A5B78",lineHeight:1.6,marginBottom:10}}>{p.desc}</p>
              <div style={{fontSize:12.5,color:"#9BA8BE",marginBottom:12}}>{p.lessons} lessons</div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12}}>
                <span style={{color:"#4A5B78"}}>Progress</span>
                <span style={{fontWeight:700,color:"#061A44"}}>{p.prog}%</span>
              </div>
              <div className="progress-bar" style={{marginBottom:16}}><div className="progress-fill" style={{width:`${p.prog}%`,background:p.prog===100?"linear-gradient(90deg,#3ED1C2,#16A34A)":undefined}}/></div>
              <div style={{display:"flex",gap:8}}>
                <button className="btn btn-primary btn-sm" style={{flex:1,justifyContent:"center"}}>{p.prog===0?"Start":p.prog===100?"Review":"Continue"}</button>
                {isProvider && <button className="btn btn-secondary btn-sm" style={{flex:1,justifyContent:"center"}}>Assign to Patient</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {section==="resources" && (
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:28}}>
            {RESOURCES.map(r=>(
              <div key={r.title} style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:20,boxShadow:"0 2px 14px rgba(0,174,234,.05)",transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor="#B8D9F0";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="#D8EAF3";}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <span className="badge badge-blue">{r.cat}</span>
                  <div style={{display:"flex",gap:6}}>
                    <span style={{padding:"2px 8px",background:"#EEF7FC",color:"#00AEEA",borderRadius:4,fontSize:11,fontWeight:700}}>{r.type}</span>
                    <span style={{fontSize:11.5,color:"#9BA8BE"}}>{r.time}</span>
                  </div>
                </div>
                <div style={{fontWeight:750,fontSize:14.5,color:"#061A44",marginBottom:8,lineHeight:1.35}}>{r.title}</div>
                <p style={{fontSize:12.5,color:"#4A5B78",lineHeight:1.6,marginBottom:16}}>{r.desc}</p>
                <div style={{display:"flex",gap:8}}>
                  <button className="btn btn-primary btn-sm" style={{flex:1}}>Open</button>
                  {isProvider && <button className="btn btn-secondary btn-sm" style={{flex:1}}>Assign</button>}
                  {isProvider && <button className="btn btn-ghost btn-sm">+ Protocol</button>}
                </div>
              </div>
            ))}
          </div>
          <div style={{fontWeight:750,fontSize:15,color:"#061A44",marginBottom:6}}>Related Sourcing Options</div>
          <p style={{fontSize:12,color:"#4A5B78",marginBottom:14,lineHeight:1.5}}>Some partner links may generate compensation for Primeva. Recommendations are for educational and wellness support and should be reviewed with the provider when applicable.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
            {[{name:"Protein Support Partner",cat:"Nutrition",desc:"Quality protein products for daily intake targets.",offer:"15% off first order"},{name:"Electrolyte Partner",cat:"Hydration",desc:"Hydration and electrolyte products for daily wellness.",offer:"Starter bundle available"},{name:"Sleep Support Partner",cat:"Sleep",desc:"Magnesium and sleep support stacks.",offer:"First month 15% off"},{name:"Lab Testing Partner",cat:"Labs",desc:"Comprehensive wellness panels with provider dashboard.",offer:"Patient-pay options"}].map(s=>(
              <div key={s.name} style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:16,padding:18,boxShadow:"0 2px 12px rgba(0,174,234,.05)",transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor="#B8D9F0";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="#D8EAF3";}}>
                <div style={{marginBottom:8}}><span className="badge badge-blue">{s.cat}</span></div>
                <div style={{fontWeight:750,fontSize:13.5,color:"#061A44",marginBottom:5}}>{s.name}</div>
                <p style={{fontSize:12,color:"#4A5B78",lineHeight:1.5,marginBottom:10}}>{s.desc}</p>
                <div style={{padding:"5px 10px",background:"#EEF7FC",borderRadius:7,fontSize:11.5,color:"#00AEEA",fontWeight:600,marginBottom:12}}>Offer: {s.offer}</div>
                <button className="btn btn-blue-outline btn-sm" style={{width:"100%"}}>View Partner</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {section==="tools" && isProvider && (
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:24}}>
            {TOOLS.map(t=>(
              <div key={t.label} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,padding:"20px 12px",background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,cursor:"pointer",transition:"all .2s",textAlign:"center",boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor="#B8D9F0";e.currentTarget.style.boxShadow="0 6px 20px rgba(0,174,234,.1)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="#D8EAF3";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,174,234,.05)";}}>
                <div style={{width:44,height:44,borderRadius:13,background:"linear-gradient(135deg,rgba(0,174,234,.1),rgba(22,199,232,.06))",border:"1px solid rgba(0,174,234,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Ic n={t.icon} s={18} c="#00AEEA"/>
                </div>
                <div style={{fontSize:12.5,fontWeight:650,color:"#061A44",lineHeight:1.35}}>{t.label}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
            {[{title:"Provider Launch Kit",type:"Kit",items:8,desc:"Everything needed to introduce wellness protocols and education in your clinic."},{title:"Staff Training Guide",type:"Guide",items:6,desc:"Step-by-step onboarding for clinical and front desk staff."},{title:"Patient Consent Templates",type:"Template",items:3,desc:"Educational consent documentation for your wellness practice."},{title:"Protocol Review Checklist",type:"Checklist",items:12,desc:"Review workflow before assigning wellness protocols to patients."},{title:"Patient Adherence Toolkit",type:"Kit",items:5,desc:"Tools and strategies for improving patient adherence and engagement."},{title:"Wellness Category Quick Reference",type:"Reference",items:1,desc:"One-page reference for all 6 wellness education categories."}].map(r=>(
              <div key={r.title} style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:20,boxShadow:"0 2px 14px rgba(0,174,234,.05)",transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor="#B8D9F0";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="#D8EAF3";}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <span className="badge badge-blue">{r.type}</span>
                  <span style={{fontSize:11.5,color:"#9BA8BE"}}>{r.items} {r.items===1?"item":"items"}</span>
                </div>
                <div style={{fontWeight:750,fontSize:14,color:"#061A44",marginBottom:6}}>{r.title}</div>
                <p style={{fontSize:12.5,color:"#4A5B78",lineHeight:1.55,marginBottom:16}}>{r.desc}</p>
                <div style={{display:"flex",gap:8}}>
                  <button className="btn btn-primary btn-sm" style={{flex:1}}>Download</button>
                  <button className="btn btn-secondary btn-sm" style={{flex:1}}>Customize</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {section==="safety" && (
        <div>
          <div style={{padding:"12px 16px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:10,marginBottom:20,fontSize:13,color:"#92400E",lineHeight:1.6,fontWeight:500}}>
            Primeva resources are provided for educational and wellness support only and are not intended to diagnose, treat, cure, or prevent any disease or replace clinical judgment, medical advice, or regulatory review.
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
            {(isProvider ? SAFETY : [
              {title:"Injection Safety Basics",desc:"Safe injection technique, hygiene, and when to reach out to your provider."},
              {title:"Storage and Handling Guide",desc:"How to store your wellness products before and after reconstitution."},
              {title:"Questions to Ask Your Provider",desc:"Important questions before starting or continuing any wellness protocol."},
              {title:"Side Effects: What to Watch For",desc:"Common effects, red flag symptoms, and when to contact your provider."},
              {title:"What Is Research Use Only?",desc:"Plain-language explanation of RUO and what it means for your protocol."},
              {title:"Your Role in Your Own Wellness",desc:"Understanding consent, consistency, and your responsibilities as a patient."},
            ]).map(m=>(
              <div key={m.title} style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:20,boxShadow:"0 2px 14px rgba(0,174,234,.05)",transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor="#B8D9F0";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="#D8EAF3";}}>
                <div style={{marginBottom:10}}><span style={{padding:"2px 9px",background:"#FFFBEB",color:"#D97706",borderRadius:20,fontSize:11,fontWeight:700,border:"1px solid #FDE68A"}}>Safety & Quality</span></div>
                <div style={{fontWeight:750,fontSize:14,color:"#061A44",marginBottom:6,lineHeight:1.35}}>{m.title}</div>
                <p style={{fontSize:12.5,color:"#4A5B78",lineHeight:1.55,marginBottom:14}}>{m.desc}</p>
                <button className="btn btn-primary btn-sm" style={{width:"100%"}}>View Module</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;