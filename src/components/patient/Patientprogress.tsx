// ── PatientProgress ──────────────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PatLabSection, ConnectedHealthMetrics } from '../labs';

const PatProgress = () => (
  <div style={{ padding:"28px 32px" }} className="fade">
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
      <div>
        <div style={{ fontSize:22, fontWeight:800, color:"#061A44", letterSpacing:"-.5px" }}>Progress</div>
        <div style={{ fontSize:13, color:"#4A5B78", marginTop:3 }}>Track your wellness journey and protocol adherence</div>
      </div>
      <button className="btn btn-secondary btn-sm" onClick={()=>triggerModal("askProvider")}>Ask Provider</button>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:22 }}>
      {[["92%","Adherence Score"],["6 days","Check-In Streak"],["35/35","Tasks This Week"],["8.1/10","Sleep Average"]].map(([n,l]) => (
        <div key={l} className="metric-card"><div className="metric-num" style={{ fontSize:26, letterSpacing:"-1px" }}>{n}</div><div className="metric-label">{l}</div></div>
      ))}
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
      <div className="card">
        <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:16 }}>Adherence This Month</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:110 }}>
          {[68,72,74,78,80,75,82,84,82,86,87,84,88,86,89,88,90,89,91,90,88,91,92].map((v,i) => (
            <div key={i} style={{ flex:1, height:`${(v/100)*100}px`, background:"linear-gradient(180deg,#3ED1C2,#16C7E8)", borderRadius:"4px 4px 0 0" }} />
          ))}
        </div>
      </div>
      <div className="card">
        <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:16 }}>Wellness Trends</div>
        {[["Mood",8],["Energy",7],["Sleep Quality",8.1],["Stress",4]].map(([l,v]) => (
          <div key={l} style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5, fontSize:13.5 }}>
              <span style={{ color:"#111111" }}>{l}</span>
              <span style={{ fontWeight:750, color:"#061A44" }}>{v}/10</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width:`${(v/10)*100}%`, background:l==="Stress"?"linear-gradient(90deg,#F59E0B,#EF4444)":undefined }}/></div>
          </div>
        ))}
      </div>
      <div className="card" style={{ gridColumn:"span 2", background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)", border:"1px solid #E8EFF6" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <div style={{ width:30, height:30, borderRadius:9, background:"linear-gradient(135deg,#061A44,#00AEEA)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Ic n="spark" s={13} c="#fff"/>
          </div>
          <div style={{ fontWeight:750, fontSize:14, color:"#061A44" }}>PrimevaAI Weekly Summary</div>
        </div>
        <p style={{ fontSize:13.5, color:"#111111", lineHeight:1.7 }}>
          Your consistency improved this week — adherence reached 92%, up from 85% last week. Sleep quality dipped slightly on Wednesday. Workouts were strongest on days following higher protein intake. Supplement completion was 5/7 days. Focus area this week: evening supplement timing consistency.
        </p>
      </div>
    </div>

      {/* Labs & Biomarkers */}
      <div className="card" style={{marginBottom:18}}>
        <PatLabSection patientId={1}/>
      </div>

      {/* Connected Health Metrics */}
      <ConnectedHealthMetrics/>
  </div>
);

export default PatProgress;