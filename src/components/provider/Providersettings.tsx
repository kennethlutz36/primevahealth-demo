// ── ProviderSettings ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring, Spark } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge, AI_REPLIES } from '../../data/mockPatients';
import { PROV_PARTNERS } from '../../data/mockSourcing';
import { ProviderLabSection } from '../labs';


const Settings = () => (
  <div style={{padding:"28px 32px"}} className="fade">
    <div style={{marginBottom:22}}>
      <div className="page-title">Settings</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:20}}>
      <div style={{display:"flex",flexDirection:"column",gap:2}}>
        {["Profile","Clinic Details","Team Members","Patient App Settings","AI Settings","Notifications","Billing","Integrations"].map((s,i)=>(
          <div key={s} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:i===0?650:500,color:i===0?"#00AEEA":"#4A5B78",background:i===0?"#EEF7FC":"transparent",border:i===0?"1px solid #D8EAF3":"1px solid transparent",transition:"all .15s"}}>{s}</div>
        ))}
      </div>
      <div className="card">
        <div style={{fontWeight:700,fontSize:16,color:"#061A44",marginBottom:20}}>Provider Profile</div>
        <div className="form-row">
          {[["First Name","Alex"],["Last Name","Morgan"],["Clinic Name","Optimum Wellness Clinic"],["Location","Scottsdale, AZ"],["Email","dr.morgan@optimumwellness.com"],["Phone","(480) 555-0192"]].map(([l,v])=>(
            <div key={l} className="form-group"><label className="form-label">{l}</label><input className="form-input" defaultValue={v}/></div>
          ))}
        </div>
        <div style={{padding:"14px 16px",background:"#EEF7FC",borderRadius:12,border:"1px solid #E8EFF6",marginTop:4}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:650,fontSize:13.5,color:"#061A44"}}>PrimevaAI</div>
              <div style={{fontSize:12,color:"#4A5B78"}}>Enable AI-powered insights and educational summaries</div>
            </div>
            <button className="toggle toggle-on"><div className="toggle-knob" style={{left:21}}/></button>
          </div>
        </div>
        <button className="btn btn-primary" style={{marginTop:18}}>Save Changes</button>
      </div>
    </div>
  </div>
);

export default Settings;