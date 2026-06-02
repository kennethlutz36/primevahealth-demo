// ── PatientQuestions ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge } from '../../data/mockPatients';
import { PAT_RESOURCES } from '../../data/mockSourcing';
import { PatLabSection, ConnectedHealthMetrics } from '../labs';


const PatQuestions = () => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("Protocol");
  const [sent, setSent] = useState(false);
  const [messages] = useState([
    { type:"patient", text:"Is some redness at the injection site normal?", time:"Yesterday 9:14 AM", category:"Protocol" },
    { type:"provider", text:"Yes — mild redness at the injection site is common and typically resolves within 24 hours. If it persists, worsens, or you develop swelling or warmth, contact us right away.", time:"Yesterday 11:32 AM", from:"Dr. Morgan" },
    { type:"patient", text:"Can I take my supplements with my morning coffee?", time:"This morning 7:45 AM", category:"Supplements" },
    { type:"status", text:"Awaiting reply from Dr. Morgan", time:"" },
  ]);
  const SUGGESTED = ["Should I adjust my supplement timing?","What should I do if I miss a protocol action?","Can I substitute this meal?","Is this product appropriate for my protocol?","How can I improve my sleep routine?","When is my next check-in?"];

  return (
    <div style={{padding:"28px 32px"}} className="fade">
      <div style={{marginBottom:22}}>
        <div style={{fontSize:22,fontWeight:800,color:"#061A44",letterSpacing:"-.5px"}}>Questions</div>
        <div style={{fontSize:13,color:"#4A5B78",marginTop:3}}>Ask your provider questions about your protocol, supplements, nutrition, sleep, or progress.</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:20}}>
        <div>
          {/* Ask Your Provider */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:22,marginBottom:18,boxShadow:"0 2px 14px rgba(0,174,234,.05)"}}>
            <div style={{fontWeight:750,fontSize:15,color:"#061A44",marginBottom:14}}>Ask Your Provider</div>
            <div className="form-group" style={{marginBottom:12}}>
              <label className="form-label">Your Question</label>
              <textarea className="form-input" rows={4} placeholder="What would you like to ask your provider?" style={{resize:"none"}} value={question} onChange={e=>{setQuestion(e.target.value);setSent(false);}}/>
            </div>
            <div className="form-group" style={{marginBottom:18}}>
              <label className="form-label">Category</label>
              <select className="form-input" value={category} onChange={e=>setCategory(e.target.value)}>
                {["Protocol","Nutrition","Supplements","Sleep","Exercise","Sourcing","Progress","Other"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            {sent ? (
              <div style={{padding:"10px 16px",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:9,display:"flex",alignItems:"center",gap:10,fontSize:13,fontWeight:650,color:"#16A34A"}}>
                <Ic n="check" s={14} c="#16A34A"/> Question sent to Dr. Morgan. You'll hear back within 1–2 business days.
              </div>
            ) : (
              <button className="btn btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={()=>{if(question.trim())setSent(true);}}>Send Question</button>
            )}
          </div>

          {/* Message Thread */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:22,boxShadow:"0 2px 14px rgba(0,174,234,.05)"}}>
            <div style={{fontWeight:750,fontSize:15,color:"#061A44",marginBottom:16}}>Message Thread</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {messages.map((m,i)=>(
                <div key={i}>
                  {m.type==="patient" && (
                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                      <div style={{maxWidth:"75%"}}>
                        <div style={{fontSize:11,color:"#9BA8BE",marginBottom:4,textAlign:"right"}}>{m.time} · <span style={{padding:"1px 7px",background:"#EEF7FC",color:"#00AEEA",borderRadius:4,fontSize:10.5,fontWeight:700}}>{m.category}</span></div>
                        <div style={{background:"linear-gradient(135deg,#00AEEA,#16C7E8)",borderRadius:"14px 14px 4px 14px",padding:"11px 14px",fontSize:13.5,color:"#fff",lineHeight:1.6}}>{m.text}</div>
                      </div>
                    </div>
                  )}
                  {m.type==="provider" && (
                    <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#061A44,#081F4D)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:750,flexShrink:0}}>DM</div>
                      <div style={{maxWidth:"75%"}}>
                        <div style={{fontSize:11,color:"#9BA8BE",marginBottom:4}}>{m.from} · {m.time}</div>
                        <div style={{background:"#EEF7FC",border:"1px solid #E8EFF6",borderRadius:"14px 14px 14px 4px",padding:"11px 14px",fontSize:13.5,color:"#111111",lineHeight:1.6}}>{m.text}</div>
                      </div>
                    </div>
                  )}
                  {m.type==="status" && (
                    <div style={{display:"flex",justifyContent:"center"}}>
                      <span style={{padding:"4px 14px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:20,fontSize:12,fontWeight:600,color:"#D97706"}}>Awaiting reply from Dr. Morgan</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{padding:"10px 14px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:9,marginTop:16,fontSize:11.5,color:"#92400E",lineHeight:1.5}}>
              For medical emergencies, call 911 or go to your nearest emergency room. This is not an emergency communication channel.
            </div>
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {/* Suggested Questions */}
          <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:16,padding:18,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
            <div style={{fontWeight:750,fontSize:14,color:"#061A44",marginBottom:12}}>Suggested Questions</div>
            {SUGGESTED.map((q,i)=>(
              <div key={i} style={{padding:"9px 0",borderBottom:i<SUGGESTED.length-1?"1px solid #EEF7FC":"none",cursor:"pointer"}} onClick={()=>{setQuestion(q);setSent(false);}}>
                <div style={{fontSize:13,color:"#00AEEA",fontWeight:500}}>{q}</div>
                <div style={{fontSize:11,color:"#9BA8BE",marginTop:2}}>Tap to use →</div>
              </div>
            ))}
          </div>

          {/* PrimevaAI card */}
          <div style={{background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)",border:"1px solid #E8EFF6",borderRadius:16,padding:18}}>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:8}}>
              <div style={{width:26,height:26,borderRadius:7,background:"linear-gradient(135deg,#061A44,#00AEEA)",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="spark" s={12} c="#fff"/></div>
              <div style={{fontWeight:750,fontSize:13,color:"#061A44"}}>PrimevaAI While You Wait</div>
            </div>
            <p style={{fontSize:12.5,color:"#4A5B78",lineHeight:1.6,marginBottom:10}}>PrimevaAI can help explain general education while you wait for your provider. Clinical decisions should always come from your provider.</p>
            <button className="btn btn-primary btn-sm" style={{width:"100%"}}>Ask PrimevaAI</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatQuestions;