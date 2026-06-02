// ── ProviderReports ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring, Spark } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge, AI_REPLIES } from '../../data/mockPatients';
import { PROV_PARTNERS } from '../../data/mockSourcing';
import { ProviderLabSection } from '../labs';


const Reports = () => {
  const [range, setRange] = useState("30D");
  return (
    <div style={{padding:"28px 32px"}} className="fade">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
        <div>
          <div className="page-title">Reports & Analytics</div>
          <div className="page-subtitle">Patient engagement, adherence, protocol outcomes, and wellness metrics.</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          {["7D","30D","90D"].map(r=><button key={r} className={`btn btn-sm ${range===r?"btn-primary":"btn-secondary"}`} onClick={()=>setRange(r)}>{r}</button>)}
        </div>
      </div>
      <div className="responsive-grid-4 reports-metric-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
        {[["48","Active Patients","↑ +3 this week","#16A34A"],["81%","Avg Adherence","↑ +4% vs last","#00AEEA"],["8","Follow-Ups Due","This week","#D97706"],["3","At-Risk Patients","Needs attention","#DC2626"],["186","Logs Submitted","This week","#3ED1C2"],["64%","Education Done","↑ +8%","#00AEEA"],["4","Questions Pending","Needs response","#F59E0B"],["12","Partner Engagements","This week","#00AEEA"]].map(([n,l,d,c])=>(
          <div key={l} className="metric-card">
            <div style={{fontSize:28,fontWeight:800,color:"#061A44",letterSpacing:"-1px",lineHeight:1,marginBottom:5}}>{n}</div>
            <div style={{fontSize:11,fontWeight:700,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".05em",marginBottom:6}}>{l}</div>
            <div style={{fontSize:12,fontWeight:600,color:c}}>{d}</div>
          </div>
        ))}
      </div>
      <div className="overview-2col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
        <div className="card">
          <div style={{fontWeight:700,fontSize:16,color:"#061A44",marginBottom:14}}>Adherence Trend</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:5,height:110}}>
            {[72,75,74,78,80,76,82,84,82,86,87,84,88,86,89,88,90,89,91,90,88,91,92].map((v,i)=>(
              <div key={i} style={{flex:1,height:`${(v/100)*100}px`,background:"linear-gradient(180deg,#00AEEA,#16C7E8)",borderRadius:"4px 4px 0 0"}}/>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:11,color:"#9BA8BE"}}><span>4 weeks ago</span><span>Today</span></div>
        </div>
        <div className="card">
          <div style={{fontWeight:700,fontSize:16,color:"#061A44",marginBottom:14}}>Protocol Distribution</div>
          {[["Metabolic & Nutrition",35,"#00AEEA"],["Sleep & Recovery",28,"#3ED1C2"],["Supplement Foundation",18,"#16C7E8"],["Labs & Biomarkers",12,"#F59E0B"],["Peptide Education",7,"#4A5B78"]].map(([l,v,c])=>(
            <div key={l} style={{marginBottom:11}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:13}}><span style={{color:"#111111"}}>{l}</span><span style={{fontWeight:700,color:"#061A44"}}>{v}%</span></div>
              <div className="progress-bar"><div className="progress-fill" style={{width:`${v}%`,background:`linear-gradient(90deg,${c},${c}cc)`}}/></div>
            </div>
          ))}
        </div>
      </div>
      <div className="overview-2col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
        <div className="card">
          <div style={{fontWeight:700,fontSize:16,color:"#061A44",marginBottom:14}}>At-Risk Patients</div>
          {PATIENTS.filter(p=>p.risk!=="low").map(p=>{
            const risk=riskBadge(p.risk);
            return <div key={p.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #EEF7FC"}}>
              <div>
                <div style={{fontSize:13.5,fontWeight:600,color:"#061A44"}}>{p.name}</div>
                <div style={{fontSize:12,color:"#9BA8BE"}}>{p.protocol}</div>
              </div>
              <span style={{padding:"2px 9px",background:risk.bg,border:`1px solid ${risk.border}`,borderRadius:20,fontSize:11.5,fontWeight:700,color:risk.color}}>{risk.label}</span>
            </div>;
          })}
        </div>
        <div className="card">
          <div style={{fontWeight:700,fontSize:16,color:"#061A44",marginBottom:14}}>Education Completion</div>
          {[["Protein Intake Basics",78],["Sleep Routine Foundations",65],["GLP-1 Lifestyle Support",52],["Lab Prep Checklist",41],["Supplement Quality Guide",38]].map(([l,v])=>(
            <div key={l} style={{marginBottom:11}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:13}}><span style={{color:"#111111"}}>{l}</span><span style={{fontWeight:700,color:"#061A44"}}>{v}%</span></div>
              <div className="progress-bar"><div className="progress-fill" style={{width:`${v}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div style={{fontWeight:700,fontSize:16,color:"#061A44",marginBottom:14}}>Available Reports</div>
        <div className="responsive-grid-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
          {["Weekly Patient Summary","Protocol Performance","Engagement Report","Education Completion","Follow-Up Report","Patient Questions Report","Sourcing Engagement","At-Risk Patient Report"].map(r=>(
            <div key={r} style={{padding:"12px 14px",background:"#F5FAFD",borderRadius:11,border:"1px solid #EEF7FC",cursor:"pointer",transition:"all .15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#00AEEA";e.currentTarget.style.background="#EEF7FC";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#EEF7FC";e.currentTarget.style.background="#F5FAFD";}}>
              <div style={{fontWeight:650,fontSize:12.5,color:"#061A44",marginBottom:8,lineHeight:1.35}}>{r}</div>
              <button className="btn btn-primary btn-sm" style={{width:"100%",fontSize:11}}>Generate</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;