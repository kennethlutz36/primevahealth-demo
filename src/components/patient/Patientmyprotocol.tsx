// ── PatientMyProtocol ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge } from '../../data/mockPatients';
import { PAT_RESOURCES } from '../../data/mockSourcing';
import { PatLabSection, ConnectedHealthMetrics } from '../labs';


const PatProtocol = () => {
  const [tasksDone, setTasksDone] = useState({});
  const [askMsg, setAskMsg] = useState("");
  const [asked, setAsked] = useState(false);

  const protocol = {
    name: "Metabolic Reset",
    subtitle: "Nutrition, supplements, movement, sleep, and daily accountability",
    goal: "Build sustainable wellness habits through structured daily actions, education, and provider-guided accountability.",
    provider: "Dr. Alex Morgan",
    duration: "12 weeks",
    startDate: "March 15, 2026",
    phase: "Weeks 5–8: Progress",
    phaseWeek: "Week 11",
    adh: 92,
    streak: 6,
  };

  const timeline = [
    { label:"Week 1", title:"Foundation", desc:"Establish baseline habits: protein, hydration, supplement timing, and daily check-ins.", done:true },
    { label:"Weeks 2–4", title:"Consistency", desc:"Build consistency in all daily actions. Provider reviews adherence at Week 4.", done:true },
    { label:"Weeks 5–8", title:"Progress", desc:"Refine nutrition targets, adjust supplement timing, and review sleep data.", current:true },
    { label:"Maintenance", title:"Sustain", desc:"Long-term habit integration and protocol review with your provider.", done:false },
  ];

  const actions = [
    { id:"protein", label:"Hit protein target", detail:"120g goal today", why:"Protein supports lean muscle, recovery, appetite regulation, and metabolic rate.", done: tasksDone["protein"] },
    { id:"supps", label:"Complete supplement stack", detail:"Morning supplement routine", why:"Consistent supplement timing improves adherence and effectiveness over time.", done: tasksDone["supps"] },
    { id:"workout", label:"Log workout or recovery", detail:"Resistance training or active recovery", why:"Movement is foundational — even active recovery supports body composition goals.", done: tasksDone["workout"] },
    { id:"hydration", label:"Hydration goal", detail:"2.5L water goal", why:"Hydration supports metabolic function, digestion, and energy levels throughout the day.", done: tasksDone["hydration"] },
    { id:"sleep", label:"Sleep wind-down routine", detail:"Begin by 10 PM", why:"Sleep quality directly affects hormone balance, recovery, and next-day energy.", done: tasksDone["sleep"] },
    { id:"edu", label:"Complete education module", detail:"Supplement Quality Guide — 9 min", why:"Understanding what you take builds confidence and consistency in your protocol.", done: tasksDone["edu"] },
  ];

  const weeklyGoals = [
    { label:"Nutrition Logs", done:4, total:5 },
    { label:"Supplement Completions", done:5, total:5 },
    { label:"Workouts Logged", done:2, total:3 },
    { label:"Sleep Logs", done:4, total:5 },
    { label:"Education Modules", done:0, total:1 },
  ];

  const SOURCING_SUPPORT = [
    { name:"Protein Support Partner", cat:"Supplements", why:"Helps meet daily protein targets — key for metabolic protocols.", offer:"15% off first order" },
    { name:"Electrolyte Partner", cat:"Hydration", why:"Supports hydration consistency throughout your plan.", offer:"Starter bundle available" },
    { name:"Sleep Support Partner", cat:"Sleep", why:"Supports sleep quality and overnight recovery.", offer:"First month 15% off" },
  ];

  const doneCount = actions.filter(a=>a.done).length;

  return (
    <div style={{padding:"28px 32px"}} className="fade">
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
        <div>
          <div style={{fontSize:28,fontWeight:800,color:"#061A44",letterSpacing:"-.5px",lineHeight:1.15}}>My Protocol</div>
          <div style={{fontSize:14,color:"#4A5B78",marginTop:5}}>Assigned by {protocol.provider} · Started {protocol.startDate}</div>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={()=>triggerModal("askProvider")}>Ask Provider</button>
      </div>

      {/* 1. Protocol Overview Hero */}
      <div style={{background:"linear-gradient(135deg,#061A44,#081F4D)",borderRadius:22,padding:"24px 28px",marginBottom:22,position:"relative",overflow:"hidden",boxShadow:"0 6px 28px rgba(6,26,68,.18)"}}>
        <div style={{position:"absolute",right:-30,top:-30,width:180,height:180,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,174,234,.2),transparent 70%)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:8}}>Active Protocol · Wellness Optimization</div>
              <div style={{fontSize:22,fontWeight:800,color:"#fff",letterSpacing:"-.4px",marginBottom:4}}>{protocol.name}</div>
              <div style={{fontSize:13.5,color:"rgba(255,255,255,.6)",marginBottom:14}}>{protocol.subtitle}</div>
              <p style={{fontSize:13,color:"rgba(255,255,255,.5)",maxWidth:480,lineHeight:1.65,marginBottom:18}}>{protocol.goal}</p>
              <div style={{display:"flex",gap:10}}>
                <button className="btn btn-primary btn-sm" onClick={()=>triggerModal("askProvider")}>Ask Provider</button>
                <button style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",borderRadius:9,padding:"6px 16px",fontSize:13,fontWeight:600,cursor:"pointer"}}>View Progress</button>
              </div>
            </div>
<div className="hero-stats" style={{display:"flex",gap:10,flexShrink:0}}>
  {[["92%","Adherence"],[protocol.phaseWeek,"Current Week"],["6 days","Streak"]].map(([n,l])=>(
                <div key={l} style={{textAlign:"center",padding:"12px 16px",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",borderRadius:13}}>
                  <div style={{fontSize:20,fontWeight:800,color:"#fff",letterSpacing:"-.5px",lineHeight:1}}>{n}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.5)",fontWeight:600,marginTop:4,textTransform:"uppercase",letterSpacing:".06em"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop:18}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12}}>
              <span style={{color:"rgba(255,255,255,.5)"}}>Protocol Progress</span>
              <span style={{fontWeight:700,color:"#16C7E8"}}>68%</span>
            </div>
            <div style={{height:5,background:"rgba(255,255,255,.12)",borderRadius:3}}>
              <div style={{width:"68%",height:"100%",background:"linear-gradient(90deg,#00AEEA,#16C7E8)",borderRadius:3}}/>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:"9px 14px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:10,marginBottom:22,fontSize:12,color:"#92400E",lineHeight:1.5}}>
        This protocol was assigned by your provider for educational and wellness support purposes only. Follow your provider's instructions and report any concerns promptly.
      </div>

      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
        <div>

          {/* 2. Protocol Timeline */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 16px rgba(0,174,234,.05)"}}>
            <div style={{fontSize:18,fontWeight:700,color:"#061A44",marginBottom:18}}>Protocol Timeline</div>
            <div style={{position:"relative"}}>
              <div style={{position:"absolute",left:15,top:20,bottom:20,width:2,background:"linear-gradient(180deg,#00AEEA,#D8EAF3)",borderRadius:1}}/>
              {timeline.map((t,i)=>(
                <div key={i} style={{display:"flex",gap:16,marginBottom:i<timeline.length-1?20:0}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:t.done?"linear-gradient(135deg,#00AEEA,#16C7E8)":t.current?"#061A44":"#EEF7FC",border:`2px solid ${t.done||t.current?"transparent":"#D8EAF3"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,zIndex:1,boxShadow:t.current?"0 2px 10px rgba(0,174,234,.3)":"none"}}>
                    {t.done ? <Ic n="check" s={13} c="#fff"/> : t.current ? <div style={{width:8,height:8,borderRadius:"50%",background:"#00AEEA"}}/> : <div style={{width:8,height:8,borderRadius:"50%",background:"#D8EAF3"}}/>}
                  </div>
                  <div style={{paddingTop:4}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <span style={{fontSize:11.5,fontWeight:700,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".06em"}}>{t.label}</span>
                      <span style={{fontWeight:t.current?750:650,fontSize:14,color:t.current?"#00AEEA":t.done?"#061A44":"#4A5B78"}}>{t.title}</span>
                      {t.current&&<span style={{padding:"1px 8px",background:"#EEF7FC",border:"1px solid #E8EFF6",borderRadius:20,fontSize:10.5,fontWeight:700,color:"#00AEEA"}}>Current Phase</span>}
                    </div>
                    <p style={{fontSize:13,color:"#4A5B78",lineHeight:1.55}}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Current Phase */}
          <div style={{background:"#EEF7FC",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 16px rgba(0,174,234,.04)"}}>
            <div style={{fontSize:18,fontWeight:700,color:"#061A44",marginBottom:4}}>Current Phase: Weeks 5–8 — Progress</div>
            <p style={{fontSize:13.5,color:"#4A5B78",lineHeight:1.65,marginBottom:12}}>This phase focuses on refining your daily actions, dialing in protein targets, and improving sleep consistency. Provider review scheduled at the end of Week 8.</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["Protein: 120g daily target","Supplement timing consistency","Sleep log every night","3 workouts this week"].map(f=>(
                <span key={f} style={{padding:"4px 12px",background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:20,fontSize:12.5,color:"#061A44",fontWeight:500}}>{f}</span>
              ))}
            </div>
          </div>

          {/* 4. Today's Protocol Actions */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 16px rgba(0,174,234,.05)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:18,fontWeight:700,color:"#061A44"}}>Today's Protocol Actions</div>
              <span style={{fontSize:13,fontWeight:650,color:doneCount===actions.length?"#16A34A":"#00AEEA"}}>{doneCount}/{actions.length} done</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {actions.map(a=>(
                <div key={a.id} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"14px 16px",background:a.done?"#F0FDF4":"#F5FAFD",border:`1px solid ${a.done?"#BBF7D0":"#D8EAF3"}`,borderRadius:14,cursor:"pointer",transition:"all .18s"}}
                  onClick={()=>setTasksDone(d=>({...d,[a.id]:!d[a.id]}))}>
                  <div style={{width:24,height:24,borderRadius:"50%",border:`2px solid ${a.done?"#16A34A":"#D8EAF3"}`,background:a.done?"#16A34A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,transition:"all .2s"}}>
                    {a.done&&<Ic n="check" s={11} c="#fff"/>}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:650,color:a.done?"#9BA8BE":"#061A44",textDecoration:a.done?"line-through":"none",marginBottom:3}}>{a.label}</div>
                    <div style={{fontSize:12.5,color:"#9BA8BE",marginBottom:6}}>{a.detail}</div>
                    <div style={{fontSize:12,color:"#4A5B78",lineHeight:1.5,fontStyle:"italic"}}>Why it matters: {a.why}</div>
                  </div>
                  {!a.done&&<button style={{background:"transparent",border:"none",cursor:"pointer",fontSize:12,color:"#00AEEA",fontWeight:600,flexShrink:0,fontFamily:"inherit"}} onClick={e=>{e.stopPropagation();triggerModal("askProvider");}}>Ask Provider</button>}
                  {a.done&&<span className="badge badge-green" style={{flexShrink:0}}>Done</span>}
                </div>
              ))}
            </div>
          </div>

          {/* 5. Weekly Goals */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 16px rgba(0,174,234,.05)"}}>
            <div style={{fontSize:18,fontWeight:700,color:"#061A44",marginBottom:16}}>Weekly Goals</div>
            {weeklyGoals.map(g=>(
              <div key={g.label} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:13.5,color:"#111111",fontWeight:500}}>{g.label}</span>
                  <span style={{fontSize:13,fontWeight:700,color:g.done>=g.total?"#16A34A":"#061A44"}}>{g.done}/{g.total}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width:`${Math.min(100,(g.done/g.total)*100)}%`,background:g.done>=g.total?"linear-gradient(90deg,#3ED1C2,#16A34A)":undefined}}/>
                </div>
              </div>
            ))}
          </div>

          {/* 6. Education Assigned */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 16px rgba(0,174,234,.05)"}}>
            <div style={{fontSize:18,fontWeight:700,color:"#061A44",marginBottom:14}}>Education Assigned</div>
            {[["Protein Intake Basics","Nutrition","Completed"],["Hydration & Electrolytes","Nutrition","Completed"],["Sleep Routine Foundations","Sleep","In Progress"],["Supplement Quality Guide","Supplements","Not Started"]].map(([t,cat,s])=>(
              <div key={t} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #EEF7FC"}}>
                <div>
                  <div style={{fontSize:13.5,fontWeight:600,color:"#061A44"}}>{t}</div>
                  <div style={{fontSize:12,color:"#9BA8BE",marginTop:1}}>{cat}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span className={`badge ${s==="Completed"?"badge-green":s==="In Progress"?"badge-blue":"badge-gray"}`}>{s}</span>
                  <button className="btn btn-ghost btn-sm" style={{fontSize:11}}>Open</button>
                </div>
              </div>
            ))}
          </div>

          {/* 7. Progress Toward Protocol */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 16px rgba(0,174,234,.05)"}}>
            <div style={{fontSize:18,fontWeight:700,color:"#061A44",marginBottom:16}}>Progress Toward Protocol</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#4A5B78",marginBottom:10}}>Adherence Trend</div>
                <div style={{display:"flex",alignItems:"flex-end",gap:4,height:70}}>
                  {[72,78,75,82,88,85,92].map((v,i)=>(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                      <div style={{width:"100%",height:`${(v/100)*62}px`,background:`linear-gradient(180deg,#00AEEA,#16C7E8)`,borderRadius:"3px 3px 0 0"}}/>
                      <span style={{fontSize:9,color:"#9BA8BE"}}>{"SMTWTFS"[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#4A5B78",marginBottom:10}}>Consistency</div>
                {[["Protocol Completion","68%",68],["Check-In Streak","6 days",86],["Weekly Consistency","82%",82]].map(([l,v,p])=>(
                  <div key={l} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:12.5}}><span style={{color:"#111111"}}>{l}</span><span style={{fontWeight:700,color:"#061A44"}}>{v}</span></div>
                    <div className="progress-bar"><div className="progress-fill" style={{width:`${p}%`}}/></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 8. Recommended Protocol Support */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 16px rgba(0,174,234,.05)"}}>
            <div style={{fontSize:18,fontWeight:700,color:"#061A44",marginBottom:6}}>Recommended Protocol Support</div>
            <p style={{fontSize:13,color:"#4A5B78",marginBottom:14,lineHeight:1.5}}>Some partner links may generate compensation for Primeva. Recommendations are for educational and wellness support and should be reviewed with your provider.</p>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {SOURCING_SUPPORT.map(s=>(
                <div key={s.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:"#F5FAFD",border:"1px solid #E8EFF6",borderRadius:14}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:14,color:"#061A44"}}>{s.name}</span>
                      <span className="badge badge-blue">{s.cat}</span>
                    </div>
                    <p style={{fontSize:13,color:"#4A5B78",lineHeight:1.5}}>{s.why}</p>
                    <div style={{fontSize:12,color:"#00AEEA",fontWeight:600,marginTop:4}}>Offer: {s.offer}</div>
                  </div>
                  <div style={{display:"flex",gap:8,flexShrink:0,marginLeft:16}}>
                    <button className="btn btn-primary btn-sm">View</button>
                    <button className="btn btn-ghost btn-sm" style={{fontSize:11}} onClick={()=>triggerModal("askProvider")}>Ask Provider</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 9. Upcoming Check-In */}
          <div style={{background:"#EEF7FC",border:"1px solid #E8EFF6",borderRadius:22,padding:22,boxShadow:"0 2px 16px rgba(0,174,234,.04)"}}>
            <div style={{fontSize:18,fontWeight:700,color:"#061A44",marginBottom:8}}>Upcoming Check-In</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:14,color:"#111111",fontWeight:500,marginBottom:4}}>Next provider check-in with Dr. Morgan</div>
                <div style={{fontSize:13,color:"#4A5B78"}}>June 2, 2026 · Virtual · 30 minutes</div>
              </div>
              <button className="btn btn-primary" onClick={()=>triggerModal("askProvider")}>Ask Provider</button>
            </div>
          </div>

        </div>

        {/* Right sidebar */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:18,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{fontSize:11,fontWeight:750,color:"#9BA8BE",letterSpacing:".08em",textTransform:"uppercase",marginBottom:12}}>Protocol Details</div>
            {[["Protocol",protocol.name],["Goal","Metabolic Reset"],["Duration",protocol.duration],["Started",protocol.startDate],["Phase",protocol.phaseWeek],["Adherence",`${protocol.adh}%`]].map(([k,v])=>(
              <div key={k} style={{padding:"8px 0",borderBottom:"1px solid #EEF7FC"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".04em"}}>{k}</div>
                <div style={{fontSize:13.5,fontWeight:650,color:"#061A44",marginTop:2}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)",border:"1px solid #E8EFF6",borderRadius:18,padding:18}}>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
              <div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#061A44,#00AEEA)",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="spark" s={13} c="#fff"/></div>
              <div style={{fontWeight:750,fontSize:13,color:"#061A44"}}>PrimevaAI</div>
            </div>
            <p style={{fontSize:12.5,color:"#4A5B78",lineHeight:1.55,marginBottom:10}}>Ask PrimevaAI to explain any part of your protocol or what to focus on today.</p>
            <button className="btn btn-primary btn-sm" style={{width:"100%"}}>Ask PrimevaAI</button>
          </div>
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:18,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{fontSize:11,fontWeight:750,color:"#9BA8BE",letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Message from Dr. Morgan</div>
            <div style={{padding:"10px 12px",background:"#EEF7FC",borderRadius:10,border:"1px solid #E8EFF6"}}>
              <p style={{fontSize:13,color:"#111111",lineHeight:1.6}}>Great progress this week! Focus on hitting your protein target consistently. Check-in on June 2nd.</p>
              <div style={{fontSize:11,color:"#9BA8BE",marginTop:6}}>Dr. Morgan · Yesterday</div>
            </div>
            <button className="btn btn-secondary btn-sm" style={{width:"100%",marginTop:10}} onClick={()=>triggerModal("askProvider")}>Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatProtocol;
