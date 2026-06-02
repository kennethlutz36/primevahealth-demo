// ── PatientHome ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge } from '../../data/mockPatients';
import { PAT_RESOURCES } from '../../data/mockSourcing';
import { PatLabSection, ConnectedHealthMetrics } from '../labs';


const PatHome = ({ setPage }) => {
  const [tasks, setTasks] = useState([false,false,false,false,false]);
  return (
    <div style={{padding:"28px 32px"}} className="fade">
      <div style={{background:"linear-gradient(135deg,#061A44,#081F4D)",borderRadius:22,padding:"24px 28px",marginBottom:20,position:"relative",overflow:"hidden",boxShadow:"0 6px 28px rgba(6,26,68,.2)"}}>
        <div style={{position:"absolute",right:-30,top:-30,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,174,234,.2),transparent 70%)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,.45)",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>Tuesday, May 27</div>
          <h1 style={{fontSize:26,fontWeight:800,color:"#fff",letterSpacing:"-.5px",marginBottom:6}}>Good morning, Sarah</h1>
          <p style={{fontSize:13.5,color:"rgba(255,255,255,.6)",marginBottom:18}}>Here's your personalized wellness plan for today.</p>
          <div style={{display:"flex",gap:10}}>
            <button className="btn btn-primary" onClick={()=>setPage("today")}>Log Today</button>
            <button onClick={()=>setPage("protocol")} style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",borderRadius:10,padding:"8px 18px",fontSize:13,fontWeight:600,cursor:"pointer"}}>View Protocol</button>
            <button onClick={()=>triggerModal("askProvider")} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.13)",color:"rgba(255,255,255,.75)",borderRadius:10,padding:"8px 18px",fontSize:13,fontWeight:600,cursor:"pointer"}}>Ask Provider</button>
          </div>
        </div>
        <div style={{position:"absolute",right:28,top:"50%",transform:"translateY(-50%)",display:"flex",gap:18}}>
          {[["92%","Adherence"],["6 days","Streak"],["8.1","Sleep Avg"]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:"#fff",letterSpacing:"-.5px"}}>{n}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.5)",fontWeight:600,marginTop:3,textTransform:"uppercase",letterSpacing:".06em"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="card">
          <div style={{fontWeight:700,fontSize:16,color:"#061A44",marginBottom:14}}>Today's Tasks</div>
          {["High-protein breakfast (120g)","Morning supplement stack","30-minute walk","Hydration check-in (2.5L)","Sleep wind-down routine"].map((t,i)=>(
            <div key={t} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<4?"1px solid #F0F6FB":"none",cursor:"pointer"}} onClick={()=>setTasks(ts=>{const n=[...ts];n[i]=!n[i];return n;})}>
              <div style={{width:21,height:21,borderRadius:"50%",border:`2px solid ${tasks[i]?"#3ED1C2":"#D8EAF3"}`,background:tasks[i]?"#3ED1C2":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .18s"}}>
                {tasks[i]&&<Ic n="check" s={10} c="#fff"/>}
              </div>
              <span style={{fontSize:13.5,color:tasks[i]?"#4A5B78":"#111111",textDecoration:tasks[i]?"line-through":"none",transition:"all .18s"}}>{t}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)",border:"1px solid #E8EFF6"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
            <div style={{width:30,height:30,borderRadius:9,background:"linear-gradient(135deg,#061A44,#00AEEA)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(0,174,234,.3)"}}><Ic n="spark" s={13} c="#fff"/></div>
            <div style={{fontWeight:750,fontSize:14,color:"#061A44"}}>PrimevaAI Daily Focus</div>
          </div>
          <p style={{fontSize:13.5,color:"#111111",lineHeight:1.7,marginBottom:16}}>Today's focus: hit your protein goal of 120g, complete your morning supplement stack, and log last night's sleep. Your 6-day streak is great — keep it going!</p>
          <div style={{display:"flex",gap:20}}>
            {[["5/7","Tasks Done"],["7/10","Energy"],["6 days","Streak"]].map(([n,l])=>(
              <div key={l}><div style={{fontSize:20,fontWeight:800,color:"#061A44",letterSpacing:"-.5px"}}>{n}</div><div style={{fontSize:10.5,color:"#4A5B78",fontWeight:600,marginTop:2}}>{l}</div></div>
            ))}
          </div>
        </div>
        <div className="card">
          <div style={{fontWeight:700,fontSize:16,color:"#061A44",marginBottom:12}}>Message from Dr. Morgan</div>
          <div style={{padding:"12px 14px",background:"#EEF7FC",borderRadius:10,border:"1px solid #E8EFF6"}}>
            <p style={{fontSize:13.5,color:"#111111",lineHeight:1.6}}>Great progress this week, Sarah! Focus on hitting your protein target consistently — I'd like to see above 100g daily before our next check-in on June 2nd.</p>
            <div style={{fontSize:11.5,color:"#4A5B78",marginTop:8}}>Dr. Morgan · Yesterday</div>
          </div>
        </div>
        <div className="card">
          <div style={{fontWeight:700,fontSize:16,color:"#061A44",marginBottom:12}}>Supplement Reminders</div>
          {[["Protein Powder","Morning · 30g",false],["Magnesium","Evening · 400mg",true],["Omega-3","Morning · 2 caps",false],["Vitamin D3","Morning · 5000 IU",true]].map(([s,d,done])=>(
            <div key={s} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #EEF7FC"}}>
              <div><div style={{fontSize:13.5,fontWeight:600,color:"#061A44"}}>{s}</div><div style={{fontSize:12,color:"#4A5B78"}}>{d}</div></div>
              <span className={`badge ${done?"badge-green":"badge-amber"}`}>{done?"Taken":"Due"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatHome;