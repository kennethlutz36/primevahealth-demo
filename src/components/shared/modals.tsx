// ── Primeva Modal Components ─────────────────────────────────────────
// AskProviderModal, AssignResourceModal, InvitePatientModal,
// PatFirstLogin, ProviderInbox
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic } from './primitives';
import { PATIENTS, riskBadge } from '../../data/mockPatients';
import { triggerModal } from '../../hooks/useModal';

// ── ASK PROVIDER MODAL ────────────────────────────────────────────────
const AskProviderModal = ({ onClose }) => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Protocol");
  const [sent, setSent] = useState(false);
  const cats = ["Protocol","Nutrition","Supplements","Sleep","Exercise","Labs","Sourcing","Progress","Other"];
  return (
    <div className="modal-overlay" style={{position:"fixed",inset:0,background:"rgba(6,26,68,.45)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={onClose}>
      <div className="modal-inner" style={{background:"#FFFFFF",borderRadius:22,padding:28,width:460,boxShadow:"0 20px 60px rgba(6,26,68,.25)",border:"1px solid #E8EFF6"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontWeight:800,fontSize:17,color:"#061A44"}}>Ask Your Provider</div>
          <button onClick={onClose} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:20,color:"#9BA8BE",lineHeight:1}}>×</button>
        </div>
        {sent ? (
          <div style={{textAlign:"center",padding:"24px 0"}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:"#F0FDF4",border:"2px solid #16A34A",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}>
              <Ic n="check" s={22} c="#16A34A"/>
            </div>
            <div style={{fontWeight:750,fontSize:16,color:"#061A44",marginBottom:6}}>Question Sent!</div>
            <p style={{fontSize:13.5,color:"#4A5B78",lineHeight:1.6,marginBottom:18}}>Dr. Morgan will reply within 1–2 business days. Check your Questions page for updates.</p>
            <button className="btn btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="form-group" style={{marginBottom:14}}>
              <label className="form-label">Your Question</label>
              <textarea className="form-input" rows={4} placeholder="What would you like to ask your provider?" style={{resize:"none"}} value={q} onChange={e=>setQ(e.target.value)}/>
            </div>
            <div className="form-group" style={{marginBottom:14}}>
              <label className="form-label">Category</label>
              <select className="form-input" value={cat} onChange={e=>setCat(e.target.value)}>
                {cats.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{padding:"10px 14px",background:"#EEF7FC",border:"1px solid #E8EFF6",borderRadius:9,marginBottom:16,fontSize:12,color:"#4A5B78",lineHeight:1.5}}>
              PrimevaAI can explain general education while you wait, but clinical decisions should come from your provider.
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>{if(q.trim())setSent(true);}}>Send Question</button>
              <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── ASSIGN RESOURCE MODAL ─────────────────────────────────────────────
const AssignResourceModal = ({ onClose, resource="" }) => {
  const [sent, setSent] = useState(false);
  const resources = ["Protein Intake Basics","Hydration & Electrolytes","Supplement Quality Guide","Sleep Routine Foundations","Injection Safety Basics","Lab Prep Checklist","Recovery Day Guide","GLP-1 Lifestyle Support Guide","Supplement Consistency Guide"];
  return (
    <div className="modal-overlay" style={{position:"fixed",inset:0,background:"rgba(6,26,68,.45)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={onClose}>
      <div className="modal-inner" style={{background:"#FFFFFF",borderRadius:22,padding:28,width:480,boxShadow:"0 20px 60px rgba(6,26,68,.25)",border:"1px solid #E8EFF6"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontWeight:800,fontSize:17,color:"#061A44"}}>Assign Resource</div>
          <button onClick={onClose} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:20,color:"#9BA8BE"}}>×</button>
        </div>
        {sent ? (
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:"#F0FDF4",border:"2px solid #16A34A",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><Ic n="check" s={22} c="#16A34A"/></div>
            <div style={{fontWeight:750,fontSize:16,color:"#061A44",marginBottom:6}}>Resource Assigned!</div>
            <p style={{fontSize:13.5,color:"#4A5B78",marginBottom:18}}>The resource has been assigned to the patient.</p>
            <button className="btn btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="form-group" style={{marginBottom:12}}>
              <label className="form-label">Select Patient</label>
              <select className="form-input">{PATIENTS.map(p=><option key={p.id}>{p.name}</option>)}</select>
            </div>
            <div className="form-group" style={{marginBottom:12}}>
              <label className="form-label">Resource</label>
              <select className="form-input" defaultValue={resource}>{resources.map(r=><option key={r}>{r}</option>)}</select>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Due Date (optional)</label><input className="form-input" type="date"/></div>
              <div className="form-group"><label className="form-label">Include in Protocol</label>
                <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
                  <button className="toggle toggle-on"><div className="toggle-knob" style={{left:21}}/></button>
                  <span style={{fontSize:13,color:"#4A5B78"}}>Yes</span>
                </div>
              </div>
            </div>
            <div className="form-group" style={{marginBottom:16}}>
              <label className="form-label">Provider Note (optional)</label>
              <input className="form-input" placeholder="e.g. Review this before next check-in"/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>setSent(true)}>Assign Resource</button>
              <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── INVITE PATIENT MODAL ──────────────────────────────────────────────
const InvitePatientModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", phone:"", protocol:"Metabolic Reset", startDate:"", checkin:"Weekly", edu:"Foundational Bundle", reminders:true, checkIns:true, nutrition:true, supplements:true, workout:true, sleep:true, questions:true });
  const up = (k,v) => setForm(f=>({...f,[k]:v}));
  const steps = ["Patient Info","Assign Protocol","App Setup","Review & Send"];

  return (
    <div className="modal-overlay" style={{position:"fixed",inset:0,background:"rgba(6,26,68,.45)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={onClose}>
      <div className="modal-inner" style={{background:"#FFFFFF",borderRadius:22,padding:28,width:540,maxHeight:"85vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(6,26,68,.25)",border:"1px solid #E8EFF6"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontWeight:800,fontSize:17,color:"#061A44"}}>Invite Patient</div>
          <button onClick={onClose} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:20,color:"#9BA8BE"}}>×</button>
        </div>

        {/* Step bar */}
        <div style={{display:"flex",alignItems:"center",marginBottom:24}}>
          {steps.map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}} onClick={()=>!sent&&setStep(i+1)}>
                <div style={{width:26,height:26,borderRadius:"50%",background:step>i+1?"linear-gradient(135deg,#00AEEA,#16C7E8)":step===i+1?"#061A44":"#EEF7FC",border:step===i+1?"none":`1px solid ${step>i+1?"transparent":"#D8EAF3"}`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:750,flexShrink:0}}>
                  {step>i+1?<Ic n="check" s={11} c="#fff"/>:i+1}
                </div>
                <span style={{fontSize:12,fontWeight:step===i+1?700:500,color:step===i+1?"#061A44":"#9BA8BE",whiteSpace:"nowrap"}}>{s}</span>
              </div>
              {i<steps.length-1&&<div style={{flex:1,height:1,background:"#D8EAF3",margin:"0 8px"}}/>}
            </div>
          ))}
        </div>

        {sent ? (
          <div style={{textAlign:"center",padding:"24px 0"}}>
            <div style={{width:60,height:60,borderRadius:"50%",background:"linear-gradient(135deg,#00AEEA,#16C7E8)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:"0 4px 20px rgba(0,174,234,.3)"}}><Ic n="check" s={26} c="#fff"/></div>
            <div style={{fontWeight:800,fontSize:18,color:"#061A44",marginBottom:8}}>Invite Prepared!</div>
            <p style={{fontSize:14,color:"#4A5B78",lineHeight:1.65,marginBottom:20}}>Patient invite prepared for {form.firstName} {form.lastName}. The patient will receive access to the Primeva Patient App.</p>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button className="btn btn-primary" onClick={onClose}>Done</button>
              <button className="btn btn-secondary">Copy Invite Link</button>
            </div>
          </div>
        ) : <>
          {step===1&&(
            <div>
              <div style={{fontWeight:700,fontSize:14,color:"#061A44",marginBottom:16}}>Patient Information</div>
              <div className="form-row" style={{marginBottom:14}}>
                <div className="form-group"><label className="form-label">First Name</label><input className="form-input" placeholder="First name" value={form.firstName} onChange={e=>up("firstName",e.target.value)}/></div>
                <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" placeholder="Last name" value={form.lastName} onChange={e=>up("lastName",e.target.value)}/></div>
              </div>
              <div className="form-row" style={{marginBottom:14}}>
                <div className="form-group"><label className="form-label">Email</label><input className="form-input" placeholder="patient@email.com"/></div>
                <div className="form-group"><label className="form-label">Phone (optional)</label><input className="form-input" placeholder="(555) 000-0000"/></div>
              </div>
              <div className="form-group" style={{marginBottom:20}}>
                <label className="form-label">Assigned Provider</label>
                <select className="form-input"><option>Dr. Alex Morgan</option></select>
              </div>
              <button className="btn btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={()=>setStep(2)}>Continue →</button>
            </div>
          )}
          {step===2&&(
            <div>
              <div style={{fontWeight:700,fontSize:14,color:"#061A44",marginBottom:16}}>Assign Protocol</div>
              <div className="form-group" style={{marginBottom:12}}>
                <label className="form-label">Protocol Template</label>
                <select className="form-input" value={form.protocol} onChange={e=>up("protocol",e.target.value)}>
                  {["Metabolic Reset","GLP-1 Lifestyle Support","Supplement Foundation","Sleep Optimization","Strength & Recovery","Lab Prep & Monitoring","Peptide Education Support","Recovery Support"].map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-row" style={{marginBottom:12}}>
                <div className="form-group"><label className="form-label">Start Date</label><input className="form-input" type="date"/></div>
                <div className="form-group"><label className="form-label">Check-In Frequency</label><select className="form-input"><option>Daily</option><option>Weekly</option><option>Bi-weekly</option></select></div>
              </div>
              <div className="form-group" style={{marginBottom:12}}>
                <label className="form-label">Education Bundle</label>
                <select className="form-input"><option>Foundational Bundle</option><option>Metabolic Reset Bundle</option><option>Sleep & Recovery Bundle</option><option>Custom</option></select>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"#EEF7FC",border:"1px solid #E8EFF6",borderRadius:10,marginBottom:20}}>
                <div><div style={{fontWeight:650,fontSize:13.5,color:"#061A44"}}>Sourcing Recommendations</div><div style={{fontSize:12,color:"#4A5B78"}}>Show relevant partner resources in patient app</div></div>
                <button className="toggle toggle-on"><div className="toggle-knob" style={{left:21}}/></button>
              </div>
              <div style={{display:"flex",gap:10}}>
                <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(1)}>← Back</button>
                <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(3)}>Continue →</button>
              </div>
            </div>
          )}
          {step===3&&(
            <div>
              <div style={{fontWeight:700,fontSize:14,color:"#061A44",marginBottom:16}}>Patient App Setup</div>
              {[["Daily Check-Ins","checkIns","Track daily wellness habits"],["Nutrition Logging","nutrition","Log meals and protein intake"],["Supplement Logging","supplements","Track supplement adherence"],["Workout Logging","workout","Log exercise and movement"],["Sleep & Recovery Logging","sleep","Track sleep quality and recovery"],["Questions to Provider","questions","Allow patient to message provider"]].map(([l,k,d])=>(
                <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #EEF7FC"}}>
                  <div><div style={{fontSize:13.5,fontWeight:600,color:"#061A44"}}>{l}</div><div style={{fontSize:12,color:"#4A5B78"}}>{d}</div></div>
                  <button className={`toggle ${form[k]?"toggle-on":"toggle-off"}`} onClick={()=>up(k,!form[k])}>
                    <div className="toggle-knob" style={{left:form[k]?21:3}}/>
                  </button>
                </div>
              ))}
              <div style={{marginTop:20,display:"flex",gap:10}}>
                <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(2)}>← Back</button>
                <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(4)}>Review →</button>
              </div>
            </div>
          )}
          {step===4&&(
            <div>
              <div style={{fontWeight:700,fontSize:14,color:"#061A44",marginBottom:16}}>Review & Send Invite</div>
              <div style={{background:"#F5FAFD",borderRadius:14,padding:18,border:"1px solid #E8EFF6",marginBottom:18}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  {[["Patient",`${form.firstName||"—"} ${form.lastName||""}`],["Protocol",form.protocol],["Provider","Dr. Alex Morgan"],["Check-In",form.checkin]].map(([k,v])=>(
                    <div key={k}><div style={{fontSize:11,fontWeight:700,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".05em"}}>{k}</div><div style={{fontSize:14,fontWeight:700,color:"#061A44",marginTop:3}}>{v}</div></div>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",gap:10}}>
                <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(3)}>← Back</button>
                <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>setSent(true)}>Send Invite</button>
              </div>
            </div>
          )}
        </>}
      </div>
    </div>
  );
};

// ── PATIENT FIRST LOGIN FLOW ──────────────────────────────────────────
const PatFirstLogin = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState([]);
  const [meals, setMeals] = useState([]);
  const [supps, setSupps] = useState([]);
  const [mood, setMood] = useState(7), [energy, setEnergy] = useState(7), [stress, setStress] = useState(4);
  const GOALS = ["Improve nutrition consistency","Support metabolic health","Build supplement routine","Improve sleep quality","Increase strength/exercise consistency","Improve recovery","Prepare for labs","Stay accountable"];
  const MEALS = ["High-Protein Breakfast Bowl","Greek Yogurt + Berries","Chicken Rice Bowl","Protein Smoothie","Salmon Sweet Potato Plate","Egg & Avocado Toast"];
  const SUPPS = ["Magnesium","Creatine","Omega-3","Vitamin D3","Electrolytes","Protein Powder","Multivitamin"];
  const totalSteps = 7;

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(6,26,68,.85)",zIndex:4000,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#FFFFFF",borderRadius:24,padding:36,width:540,maxHeight:"85vh",overflowY:"auto",boxShadow:"0 24px 80px rgba(6,26,68,.4)",border:"1px solid #E8EFF6"}}>
        {/* Progress */}
        <div style={{display:"flex",gap:4,marginBottom:24}}>
          {[...Array(totalSteps)].map((_,i)=>(
            <div key={i} style={{flex:1,height:4,borderRadius:2,background:i<step?"linear-gradient(90deg,#00AEEA,#16C7E8)":"#EEF7FC",transition:"all .3s"}}/>
          ))}
        </div>

        {step===1&&(
          <div>
            <div style={{textAlign:"center",marginBottom:24}}>
              <div style={{width:60,height:60,borderRadius:"50%",background:"linear-gradient(135deg,#061A44,#00AEEA)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",boxShadow:"0 4px 20px rgba(0,174,234,.3)"}}><Ic n="spark" s={26} c="#fff"/></div>
              <div style={{fontSize:24,fontWeight:800,color:"#061A44",marginBottom:8,letterSpacing:"-.4px"}}>Welcome to Primeva</div>
              <p style={{fontSize:14,color:"#4A5B78",lineHeight:1.7,marginBottom:18}}>Your provider assigned a wellness protocol to help you track habits, complete daily actions, and stay accountable.</p>
            </div>
            <div style={{background:"#F5FAFD",borderRadius:14,padding:18,border:"1px solid #E8EFF6",marginBottom:24}}>
              {[["Provider","Dr. Alex Morgan"],["Clinic","Optimum Wellness"],["Protocol","Advanced Recovery Support"]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #EEF7FC"}}>
                  <span style={{fontSize:13,color:"#4A5B78"}}>{k}</span><span style={{fontWeight:700,color:"#061A44",fontSize:13}}>{v}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"11px"}} onClick={()=>setStep(2)}>Get Started →</button>
          </div>
        )}

        {step===2&&(
          <div>
            <div style={{fontWeight:800,fontSize:20,color:"#061A44",marginBottom:6}}>What are your goals?</div>
            <p style={{fontSize:13.5,color:"#4A5B78",marginBottom:18}}>Select all that apply. Your provider will see these to customize your plan.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
              {GOALS.map(g=>{
                const sel=goals.includes(g);
                return <div key={g} onClick={()=>setGoals(gs=>sel?gs.filter(x=>x!==g):[...gs,g])} style={{padding:"11px 14px",background:sel?"#EEF7FC":"#F5FAFD",border:`1px solid ${sel?"#00AEEA":"#D8EAF3"}`,borderRadius:12,cursor:"pointer",fontSize:13,fontWeight:sel?650:500,color:sel?"#00AEEA":"#061A44",transition:"all .15s"}}>{g}</div>;
              })}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(1)}>← Back</button>
              <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(3)}>Continue →</button>
            </div>
          </div>
        )}

        {step===3&&(
          <div>
            <div style={{fontWeight:800,fontSize:20,color:"#061A44",marginBottom:6}}>Reminder Preferences</div>
            <p style={{fontSize:13.5,color:"#4A5B78",marginBottom:18}}>Set your daily reminder times to stay on track.</p>
            {[["Daily Check-In","8:00 AM"],["Supplement Reminder","7:30 AM"],["Workout Reminder","6:00 AM"],["Sleep Routine Reminder","9:30 PM"],["Education Reminders","12:00 PM"]].map(([l,t])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #EEF7FC"}}>
                <span style={{fontSize:13.5,color:"#061A44",fontWeight:600}}>{l}</span>
                <input defaultValue={t} type="time" style={{border:"1px solid #E8EFF6",borderRadius:8,padding:"5px 10px",fontSize:13,color:"#061A44",fontFamily:"inherit",outline:"none"}}/>
              </div>
            ))}
            <div style={{display:"flex",gap:10,marginTop:20}}>
              <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(2)}>← Back</button>
              <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(4)}>Continue →</button>
            </div>
          </div>
        )}

        {step===4&&(
          <div>
            <div style={{fontWeight:800,fontSize:20,color:"#061A44",marginBottom:6}}>Favorite Meals</div>
            <p style={{fontSize:13.5,color:"#4A5B78",marginBottom:18}}>Select meals you eat regularly. These will be saved for quick logging.</p>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
              {MEALS.map(m=>{
                const sel=meals.includes(m);
                return <div key={m} onClick={()=>setMeals(ms=>sel?ms.filter(x=>x!==m):[...ms,m])} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:sel?"#EEF7FC":"#F5FAFD",border:`1px solid ${sel?"#00AEEA":"#D8EAF3"}`,borderRadius:12,cursor:"pointer",transition:"all .15s"}}>
                  <div style={{width:20,height:20,borderRadius:6,border:`2px solid ${sel?"#00AEEA":"#D8EAF3"}`,background:sel?"#00AEEA":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {sel&&<Ic n="check" s={10} c="#fff"/>}
                  </div>
                  <span style={{fontSize:13.5,fontWeight:sel?650:500,color:sel?"#00AEEA":"#061A44"}}>{m}</span>
                </div>;
              })}
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"#F5FAFD",border:"1px dashed #D8EAF3",borderRadius:12,cursor:"pointer"}}>
                <Ic n="plus" s={16} c="#00AEEA"/>
                <span style={{fontSize:13.5,color:"#00AEEA",fontWeight:600}}>Add Custom Meal</span>
              </div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(3)}>← Back</button>
              <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(5)}>Continue →</button>
            </div>
          </div>
        )}

        {step===5&&(
          <div>
            <div style={{fontWeight:800,fontSize:20,color:"#061A44",marginBottom:6}}>Your Supplement Stack</div>
            <p style={{fontSize:13.5,color:"#4A5B78",marginBottom:18}}>Select supplements you currently take. These will be pre-loaded in your daily log.</p>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
              {SUPPS.map(s=>{
                const sel=supps.includes(s);
                return <div key={s} onClick={()=>setSupps(ss=>sel?ss.filter(x=>x!==s):[...ss,s])} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:sel?"#EEF7FC":"#F5FAFD",border:`1px solid ${sel?"#00AEEA":"#D8EAF3"}`,borderRadius:12,cursor:"pointer",transition:"all .15s"}}>
                  <div style={{width:20,height:20,borderRadius:6,border:`2px solid ${sel?"#00AEEA":"#D8EAF3"}`,background:sel?"#00AEEA":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {sel&&<Ic n="check" s={10} c="#fff"/>}
                  </div>
                  <span style={{fontSize:13.5,fontWeight:sel?650:500,color:sel?"#00AEEA":"#061A44"}}>{s}</span>
                </div>;
              })}
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"#F5FAFD",border:"1px dashed #D8EAF3",borderRadius:12,cursor:"pointer"}}>
                <Ic n="plus" s={16} c="#00AEEA"/><span style={{fontSize:13.5,color:"#00AEEA",fontWeight:600}}>Add Custom Supplement</span>
              </div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(4)}>← Back</button>
              <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(6)}>Continue →</button>
            </div>
          </div>
        )}

        {step===6&&(
          <div>
            <div style={{fontWeight:800,fontSize:20,color:"#061A44",marginBottom:6}}>Baseline Check-In</div>
            <p style={{fontSize:13.5,color:"#4A5B78",marginBottom:18}}>This helps your provider understand your starting point.</p>
            {[["Mood",mood,setMood],["Energy",energy,setEnergy],["Stress",stress,setStress]].map(([l,v,set])=>(
              <div key={l} style={{marginBottom:18}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><span style={{fontSize:13.5,fontWeight:600,color:"#061A44"}}>{l}</span><span style={{fontWeight:750,color:"#00AEEA",fontSize:15}}>{v}/10</span></div>
                <input type="range" min="1" max="10" value={v} onChange={e=>set(+e.target.value)} style={{width:"100%",accentColor:"#00AEEA"}}/>
              </div>
            ))}
            <div className="form-group" style={{marginBottom:20}}>
              <label className="form-label">Notes for Your Provider (optional)</label>
              <textarea className="form-input" rows={3} placeholder="Anything you want your provider to know about your starting point..." style={{resize:"none"}}/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(5)}>← Back</button>
              <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(7)}>Complete Setup →</button>
            </div>
          </div>
        )}

        {step===7&&(
          <div style={{textAlign:"center",padding:"16px 0"}}>
            <div style={{width:70,height:70,borderRadius:"50%",background:"linear-gradient(135deg,#00AEEA,#3ED1C2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",boxShadow:"0 6px 28px rgba(0,174,234,.35)"}}><Ic n="check" s={32} c="#fff"/></div>
            <div style={{fontSize:24,fontWeight:800,color:"#061A44",marginBottom:10,letterSpacing:"-.4px"}}>You're Ready!</div>
            <p style={{fontSize:14,color:"#4A5B78",lineHeight:1.7,marginBottom:24}}>Your daily plan is now active. Complete your daily actions, log your habits, and reach out to Dr. Morgan any time.</p>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button className="btn btn-primary" onClick={onClose}>Go to Today</button>
              <button className="btn btn-secondary" onClick={onClose}>View My Protocol</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── PROVIDER INBOX WIDGET ─────────────────────────────────────────────
const ProviderInbox = ({ isProvider }) => {
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState({});
  const [replyText, setReplyText] = useState({});
  const [resolved, setResolved] = useState({});
  if (!isProvider) return null;

  const INBOX = [
    { id:1, patient:"Sarah Mitchell", init:"SM", cat:"Nutrition", question:"Can I swap my usual breakfast for a protein shake on busy mornings?", time:"42 min ago", status:"New" },
    { id:2, patient:"James Rivera", init:"JR", cat:"Supplements", question:"I missed my magnesium last night. Should I take it this morning or wait?", time:"2 hours ago", status:"Needs Response" },
    { id:3, patient:"Emily Chen", init:"EC", cat:"Sleep", question:"My sleep score dropped this week. What should I adjust first?", time:"3 hours ago", status:"New" },
    { id:4, patient:"Robert Kim", init:"RK", cat:"Protocol", question:"I missed two workouts. Should I restart the week or just continue?", time:"Yesterday", status:"Needs Review" },
  ];
  const unresolved = INBOX.filter(i=>!resolved[i.id]);
  const unread = unresolved.length;

  return (
    <div className="inbox-fab-container">
      {open && (
        <div className="inbox-drawer" style={{position:"absolute",bottom:64,right:0,width:380,background:"rgba(255,255,255,.97)",backdropFilter:"blur(20px)",border:"1px solid #E8EFF6",borderRadius:20,boxShadow:"0 16px 56px rgba(6,26,68,.15)",overflow:"hidden"}}>
          <div style={{background:"linear-gradient(135deg,#061A44,#081F4D)",padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:750,fontSize:14,color:"#fff"}}>Provider Inbox</div>
              <div style={{fontSize:11.5,color:"rgba(255,255,255,.55)",marginTop:2}}>Patient questions needing response</div>
            </div>
            <button onClick={()=>setOpen(false)} style={{background:"rgba(255,255,255,.15)",border:"none",cursor:"pointer",color:"#fff",width:28,height:28,borderRadius:"50%",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
          <div style={{maxHeight:360,overflowY:"auto",padding:"10px 0"}}>
            {unresolved.length===0?(
              <div style={{textAlign:"center",padding:"28px 16px",color:"#4A5B78"}}>
                <Ic n="check" s={28} c="#16A34A"/>
                <div style={{fontWeight:700,fontSize:14,color:"#061A44",marginTop:10}}>All caught up!</div>
                <div style={{fontSize:13,marginTop:4}}>No open questions.</div>
              </div>
            ):unresolved.map(item=>(
              <div key={item.id} style={{padding:"12px 16px",borderBottom:"1px solid #EEF7FC"}}>
                <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:8}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#00AEEA,#3ED1C2)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11.5,fontWeight:750,flexShrink:0}}>{item.init}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:7}}>
                      <span style={{fontWeight:700,fontSize:13,color:"#061A44"}}>{item.patient}</span>
                      <span style={{padding:"1px 7px",background:"#EEF7FC",color:"#00AEEA",borderRadius:4,fontSize:10,fontWeight:700}}>{item.cat}</span>
                      <span style={{padding:"1px 7px",background:item.status==="New"?"#EEF7FC":"#FFFBEB",color:item.status==="New"?"#00AEEA":"#D97706",borderRadius:4,fontSize:10,fontWeight:700}}>{item.status}</span>
                    </div>
                    <div style={{fontSize:11,color:"#9BA8BE",marginTop:1}}>{item.time}</div>
                  </div>
                </div>
                <p style={{fontSize:13,color:"#111111",lineHeight:1.55,marginBottom:10,padding:"9px 12px",background:"#F5FAFD",borderRadius:9,border:"1px solid #EEF7FC"}}>"{item.question}"</p>
                {replies[item.id] ? (
                  <div style={{fontSize:12,color:"#16A34A",fontWeight:650,padding:"6px 10px",background:"#F0FDF4",borderRadius:8}}>Reply sent</div>
                ) : (
                  <div>
                    {replyText[item.id]!==undefined?(
                      <div>
                        <textarea style={{width:"100%",border:"1px solid #E8EFF6",borderRadius:9,padding:"8px 11px",fontSize:13,fontFamily:"inherit",outline:"none",resize:"none",background:"#FFFFFF",color:"#111111",marginBottom:8}} rows={2} placeholder="Type your reply..." value={replyText[item.id]} onChange={e=>setReplyText(r=>({...r,[item.id]:e.target.value}))}/>
                        <div style={{display:"flex",gap:7}}>
                          <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={()=>{setReplies(r=>({...r,[item.id]:true}));setResolved(r=>({...r,[item.id]:true}));}}>Send Reply</button>
                          <button className="btn btn-ghost btn-sm" onClick={()=>setReplyText(r=>({...r,[item.id]:undefined}))}>Cancel</button>
                        </div>
                      </div>
                    ):(
                      <div style={{display:"flex",gap:7}}>
                        <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={()=>setReplyText(r=>({...r,[item.id]:""}))}>Reply</button>
                        <button className="btn btn-ghost btn-sm" style={{fontSize:11}} onClick={()=>{setReplyText(r=>({...r,[item.id]:"PrimevaAI suggested: Yes, that's fine — just make sure you still hit your daily protein target. A protein shake is a great option on busy mornings."}));}}>AI Suggest</button>
                        <button className="btn btn-ghost btn-sm" style={{fontSize:11}} onClick={()=>setResolved(r=>({...r,[item.id]:true}))}>Resolve</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{padding:"10px 16px",background:"#F5FAFD",borderTop:"1px solid #EEF7FC",fontSize:11,color:"#9BA8BE",lineHeight:1.5}}>
            Provider Inbox is for wellness support and operational communication. Not for urgent medical issues.
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(o=>!o)} style={{height:46,padding:"0 16px",background:open?"#061A44":"linear-gradient(135deg,#081F4D,#061A44)",border:"none",borderRadius:23,cursor:"pointer",display:"flex",alignItems:"center",gap:9,boxShadow:"0 4px 20px rgba(6,26,68,.3)",transition:"all .2s",fontFamily:"inherit",position:"relative"}}>
        <Ic n="bell" s={17} c="#fff"/>
        <span style={{fontSize:13,fontWeight:650,color:"#fff"}}>Inbox</span>
        {unread>0&&<div style={{position:"absolute",top:-6,right:-4,width:20,height:20,borderRadius:"50%",background:"#DC2626",border:"2px solid #fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:750,color:"#fff"}}>{unread}</div>}
      </button>
    </div>
  );
};

export { AskProviderModal, AssignResourceModal, InvitePatientModal, PatFirstLogin, ProviderInbox };