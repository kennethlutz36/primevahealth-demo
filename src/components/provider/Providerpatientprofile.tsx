// ── ProviderPatientProfile ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring, Spark } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge, AI_REPLIES } from '../../data/mockPatients';
import { PROV_PARTNERS } from '../../data/mockSourcing';
import { ProviderLabSection } from '../labs';


const PatientProfilePage = ({ patient, setPage }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySent, setReplySent] = useState(false);
  const risk = riskBadge(patient.risk);
  const adherenceData = [72,78,75,82,88,85,92];

  return (
    <div style={{padding:"28px 32px"}} className="fade">
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>setPage("patients")} style={{color:"#4A5B78"}}>← Patients</button>
        <span style={{color:"#D8EAF3"}}>›</span>
        <span style={{fontWeight:600,fontSize:13,color:"#061A44"}}>{patient.name}</span>
      </div>

      {/* 1. Patient Header */}
      <div style={{background:"linear-gradient(135deg,#061A44,#081F4D)",borderRadius:20,padding:"22px 28px",marginBottom:18,position:"relative",overflow:"hidden",boxShadow:"0 6px 28px rgba(6,26,68,.2)"}}>
        <div style={{position:"absolute",right:-40,top:-40,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,174,234,.18),transparent 70%)"}}/>
        <div style={{position:"relative",zIndex:1,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#00AEEA,#3ED1C2)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:18,fontWeight:800,flexShrink:0}}>{patient.init}</div>
            <div>
              <div style={{fontSize:20,fontWeight:800,color:"#fff",letterSpacing:"-.4px",marginBottom:3}}>{patient.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                <span style={{fontSize:12.5,color:"rgba(255,255,255,.6)"}}>{patient.protocol}</span>
                <span style={{width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,.3)"}}/>
                <span style={{fontSize:12.5,color:"rgba(255,255,255,.6)"}}>Dr. Morgan</span>
                <span style={{width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,.3)"}}/>
                <span style={{fontSize:12.5,color:"rgba(255,255,255,.6)"}}>Follow-up: {patient.followup}</span>
                <span style={{padding:"2px 9px",background:`${risk.bg}22`,border:`1px solid ${risk.border}88`,borderRadius:20,fontSize:11,fontWeight:700,color:risk.color}}>{risk.label}</span>
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {[[`${patient.adh}%`,"Adherence"],["Week 11","Protocol"],["Jun 2","Follow-Up"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center",padding:"9px 14px",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.15)",borderRadius:11}}>
                <div style={{fontSize:16,fontWeight:800,color:"#fff",letterSpacing:"-.3px",lineHeight:1}}>{n}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.5)",fontWeight:600,marginTop:3,textTransform:"uppercase",letterSpacing:".06em"}}>{l}</div>
              </div>
            ))}
            <button className="btn btn-primary btn-sm" style={{marginLeft:6}}>Message</button>
          </div>
        </div>
      </div>

      <div className="patient-profile-grid" style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:18}}>
        <div>
          {/* 2. PrimevaAI Summary */}
          <div style={{background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)",border:"1px solid #E8EFF6",borderRadius:18,padding:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#061A44,#00AEEA)",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="spark" s={13} c="#fff"/></div>
                <div style={{fontWeight:750,fontSize:14,color:"#061A44"}}>PrimevaAI Patient Summary</div>
              </div>
              <div style={{display:"flex",gap:7}}>
                <button className="btn btn-secondary btn-sm">Summarize</button>
                <button className="btn btn-secondary btn-sm">Draft Reply</button>
              </div>
            </div>
            <p style={{fontSize:13.5,color:"#111111",lineHeight:1.75,marginBottom:14}}>{patient.name} completed {patient.adh}% of assigned actions this week. Nutrition logs were consistent, supplement adherence was strong, and sleep quality improved slightly. Consider reinforcing protein consistency and reviewing hydration goals at the next check-in.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
              {[[`${patient.adh}%`,"Adherence","#16A34A"],["5/7","Tasks Done","#00AEEA"],["8.1","Sleep Avg","#00AEEA"],["6 days","Streak","#3ED1C2"]].map(([n,l,c])=>(
                <div key={l} style={{textAlign:"center",padding:"9px",background:"#FFFFFF",borderRadius:9,border:"1px solid #E8EFF6"}}>
                  <div style={{fontWeight:800,fontSize:17,color:c,letterSpacing:"-.5px",lineHeight:1}}>{n}</div>
                  <div style={{fontSize:10.5,color:"#9BA8BE",fontWeight:600,marginTop:3,textTransform:"uppercase",letterSpacing:".04em"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Adherence Risk */}
          <div style={{background:"#FFFFFF",border:`1px solid ${risk.border}`,borderRadius:18,padding:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div style={{fontWeight:750,fontSize:14,color:"#061A44"}}>Adherence Risk Score</div>
              <span style={{padding:"3px 11px",background:risk.bg,border:`1px solid ${risk.border}`,borderRadius:20,fontSize:12,fontWeight:750,color:risk.color}}>{risk.label}</span>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
              {patient.riskReasons.map(r=>(
                <span key={r} style={{padding:"3px 10px",background:`${risk.bg}`,border:`1px solid ${risk.border}`,borderRadius:20,fontSize:12,color:risk.color}}>{r}</span>
              ))}
            </div>
            <div style={{padding:"9px 12px",background:"#F5FAFD",borderRadius:9,border:"1px solid #EEF7FC",fontSize:12.5,color:"#4A5B78",lineHeight:1.55}}>
              <strong style={{color:"#061A44"}}>Recommended action:</strong> {patient.risk==="high"?"Schedule follow-up immediately and review missed protocol items.":patient.risk==="moderate"?"Review missed supplements and check-in with the patient this week.":"Continue current protocol — patient is on track."}
            </div>
          </div>

          {/* 4. Current Protocol */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontWeight:750,fontSize:14,color:"#061A44"}}>Current Protocol</div>
              <span className="badge badge-green">Active</span>
            </div>
            <div style={{fontWeight:700,fontSize:15,color:"#061A44",marginBottom:3}}>{patient.protocol}</div>
            <div style={{fontSize:12.5,color:"#4A5B78",marginBottom:12}}>Week 11 of 16 · Started March 15</div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12}}><span style={{color:"#4A5B78"}}>Progress</span><span style={{fontWeight:700,color:"#061A44"}}>68%</span></div>
            <div className="progress-bar" style={{height:6,marginBottom:14}}><div className="progress-fill" style={{width:"68%"}}/></div>
            <div style={{fontWeight:650,fontSize:13,color:"#061A44",marginBottom:9}}>Today's Required Actions</div>
            {["Daily protein target (120g)","Morning supplement stack","Hydration check-in (2.5L)","Evening sleep wind-down","Weekly provider check-in log"].map((t,i)=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:i<4?"1px solid #EEF7FC":"none"}}>
                <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${i<2?"#16A34A":"#D8EAF3"}`,background:i<2?"#16A34A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {i<2&&<Ic n="check" s={8} c="#fff"/>}
                </div>
                <span style={{fontSize:13,color:i<2?"#9BA8BE":"#111111",textDecoration:i<2?"line-through":"none"}}>{t}</span>
              </div>
            ))}
          </div>

          {/* 5. Recent Daily Logs */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{fontWeight:750,fontSize:14,color:"#061A44",marginBottom:14}}>Recent Daily Logs</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
              {[{label:"Nutrition",items:[["Protein","118g"],["Calories","1,840kcal"],["Water","2.8L"]]},{label:"Supplements",items:[["Protein","Taken"],["Magnesium","Taken"],["Omega-3","Taken"],["Vitamin D3","Missed"]]},{label:"Sleep",items:[["Hours","8h"],["Quality","8/10"],["Bedtime","10:30 PM"]]},{label:"Workout",items:[["Type","Resistance"],["Duration","45 min"],["Intensity","Moderate"]]},{label:"Check-In",items:[["Mood","8/10"],["Energy","7/10"],["Stress","4/10"]]},{label:"Hydration",items:[["Water","2.8L"],["Electrolytes","Yes"]]}].map(s=>(
                <div key={s.label} style={{background:"#F5FAFD",borderRadius:11,padding:13,border:"1px solid #EEF7FC"}}>
                  <div style={{fontWeight:700,fontSize:11,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".06em",marginBottom:9}}>{s.label}</div>
                  {s.items.map(([k,v])=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",fontSize:12}}>
                      <span style={{color:"#4A5B78"}}>{k}</span>
                      <span style={{fontWeight:650,color:v==="Missed"?"#DC2626":"#061A44"}}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* 6. Progress Snapshot */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{fontWeight:750,fontSize:14,color:"#061A44",marginBottom:14}}>Progress Snapshot</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"#4A5B78",marginBottom:9}}>Weekly Adherence</div>
                <div style={{display:"flex",alignItems:"flex-end",gap:4,height:72}}>
                  {adherenceData.map((v,i)=>(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                      <div style={{width:"100%",height:`${(v/100)*64}px`,background:`linear-gradient(180deg,#00AEEA,#16C7E8)`,borderRadius:"3px 3px 0 0"}}/>
                      <span style={{fontSize:9.5,color:"#9BA8BE"}}>{"SMTWTFS"[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"#4A5B78",marginBottom:9}}>Wellness Trends</div>
                {[["Mood","8/10","#00AEEA",80],["Energy","7/10","#3ED1C2",70],["Sleep","8.1","#00AEEA",81],["Stress","4/10","#F59E0B",40]].map(([l,v,c,p])=>(
                  <div key={l} style={{marginBottom:7}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3,fontSize:12}}><span style={{color:"#111111"}}>{l}</span><span style={{fontWeight:700,color:"#061A44"}}>{v}</span></div>
                    <div className="progress-bar"><div className="progress-fill" style={{width:`${p}%`,background:`linear-gradient(90deg,${c},${c}cc)`}}/></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5b. Labs & Biomarkers */}
          <ProviderLabSection patient={patient}/>

          {/* 7. Education Assigned */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontWeight:750,fontSize:14,color:"#061A44"}}>Education Assigned</div>
              <div style={{display:"flex",gap:7}}>
                <button className="btn btn-primary btn-sm" onClick={()=>triggerModal("assignResource")}>Assign Resource</button>
              </div>
            </div>
            {[["Protein Intake Basics","Nutrition","Completed"],["GLP-1 Lifestyle Support","Metabolic","Completed"],["Sleep Routine Foundations","Sleep","In Progress"],["Lab Prep Checklist","Labs","Not Started"]].map(([t,cat,status])=>(
              <div key={t} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #EEF7FC"}}>
                <div><div style={{fontSize:13,fontWeight:600,color:"#061A44"}}>{t}</div><div style={{fontSize:11.5,color:"#9BA8BE",marginTop:1}}>{cat}</div></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span className={`badge ${status==="Completed"?"badge-green":status==="In Progress"?"badge-blue":"badge-gray"}`}>{status}</span>
                  <button className="btn btn-ghost btn-sm" style={{fontSize:11}}>+ Protocol</button>
                </div>
              </div>
            ))}
          </div>

          {/* 8. Patient Questions */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:20,marginBottom:16,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontWeight:750,fontSize:14,color:"#061A44"}}>Patient Questions</div>
            </div>
            {[{q:"Is some redness at the injection site normal?",a:"Yes — mild redness is common and expected. If it persists or worsens, contact us.",time:"Yesterday",answered:true},{q:"Can I take my supplements with my morning coffee?",a:"",time:"This morning",answered:false}].map((msg,i)=>(
              <div key={i} style={{padding:"11px 0",borderBottom:"1px solid #EEF7FC"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <div style={{fontWeight:650,fontSize:13,color:"#061A44"}}>{msg.q}</div>
                  <span style={{fontSize:11,color:"#9BA8BE",flexShrink:0,marginLeft:10}}>{msg.time}</span>
                </div>
                {msg.answered
                  ? <div style={{padding:"8px 12px",background:"#EEF7FC",borderRadius:9,fontSize:12.5,color:"#4A5B78",lineHeight:1.55}}>{msg.a}</div>
                  : <div>
                      {!showReply&&<div style={{display:"flex",gap:7}}>
                        <button className="btn btn-primary btn-sm" onClick={()=>setShowReply(true)}>Reply</button>
                        <button className="btn btn-ghost btn-sm" style={{fontSize:11}} onClick={()=>setReplyText("PrimevaAI suggested: Yes — most supplements can be taken with coffee, but check your specific stack. Ask your provider for guidance on your exact protocol.")}>AI Suggest</button>
                      </div>}
                      {showReply&&!replySent&&<div>
                        <textarea className="form-input" rows={2} style={{resize:"none",marginBottom:8}} value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Type your reply..."/>
                        <div style={{display:"flex",gap:7}}>
                          <button className="btn btn-primary btn-sm" onClick={()=>setReplySent(true)}>Send Reply</button>
                          <button className="btn btn-ghost btn-sm" onClick={()=>setShowReply(false)}>Cancel</button>
                        </div>
                      </div>}
                      {replySent&&<div style={{padding:"7px 12px",background:"#F0FDF4",borderRadius:9,fontSize:12,color:"#16A34A",fontWeight:650}}>Reply sent</div>}
                    </div>
                }
              </div>
            ))}
          </div>

          {/* 9. Provider Notes */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:20,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{fontWeight:750,fontSize:14,color:"#061A44",marginBottom:12}}>Provider Notes</div>
            <div style={{padding:"11px 14px",background:"#F5FAFD",borderRadius:9,border:"1px solid #EEF7FC",fontSize:13,color:"#4A5B78",lineHeight:1.7,marginBottom:14}}>
              Patient is showing strong adherence. Protein targets improving but still slightly below goal some days. Sleep quality trending up. Consider reviewing hydration at next check-in. No clinical concerns at this time.
            </div>
            <textarea className="form-input" rows={3} placeholder="Add operational notes..." style={{resize:"none"}}/>
            <button className="btn btn-secondary btn-sm" style={{marginTop:10}}>Save Note</button>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:16,padding:16,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{fontSize:11,fontWeight:750,color:"#9BA8BE",letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>Patient Details</div>
            {[["Protocol",patient.protocol],["Adherence",`${patient.adh}%`],["Risk",risk.label],["Last Check-In",patient.checkin],["Next Follow-Up",patient.followup]].map(([k,v])=>(
              <div key={k} style={{padding:"8px 0",borderBottom:"1px solid #EEF7FC"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".04em"}}>{k}</div>
                <div style={{fontSize:13,fontWeight:650,color:k==="Risk"?risk.color:"#061A44",marginTop:2}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)",border:"1px solid #E8EFF6",borderRadius:16,padding:16}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <div style={{width:26,height:26,borderRadius:7,background:"linear-gradient(135deg,#061A44,#00AEEA)",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="spark" s={12} c="#fff"/></div>
              <div style={{fontWeight:750,fontSize:13,color:"#061A44"}}>PrimevaAI</div>
            </div>
            <p style={{fontSize:12,color:"#4A5B78",lineHeight:1.55,marginBottom:10}}>Summarize patient, draft a check-in message, or suggest protocol adjustments.</p>
            <button className="btn btn-primary btn-sm" style={{width:"100%"}}>Ask PrimevaAI</button>
          </div>
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:16,padding:16,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{fontWeight:700,fontSize:13,color:"#061A44",marginBottom:10}}>Quick Actions</div>
            {[["Assign Education","edu"],["Assign Protocol","protocol"],["Generate Handout","handout"],["Schedule Follow-Up","today"]].map(([l,icon])=>(
              <button key={l} className="btn btn-secondary btn-sm" style={{width:"100%",justifyContent:"flex-start",marginBottom:7,gap:8}} onClick={()=>l==="Assign Education"&&triggerModal("assignResource")}>
                <Ic n={icon} s={12} c="#00AEEA"/>{l}
              </button>
            ))}
          </div>
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:16,padding:16,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{fontWeight:700,fontSize:13,color:"#061A44",marginBottom:10}}>Adherence Ring</div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <Ring v={patient.adh} size={60}/>
              <div>
                <div style={{fontSize:26,fontWeight:800,color:"#061A44",letterSpacing:"-1px"}}>{patient.adh}%</div>
                <div style={{fontSize:12,color:"#4A5B78"}}>This week</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;