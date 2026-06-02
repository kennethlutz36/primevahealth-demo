// ── ProviderStaffTraining ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring, Spark } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge, AI_REPLIES } from '../../data/mockPatients';
import { PROV_PARTNERS } from '../../data/mockSourcing';
import { ProviderLabSection } from '../labs';


const StaffTraining = () => (
  <div style={{padding:"28px 32px"}} className="fade">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
      <div>
        <div className="page-title">Staff Training</div>
        <div className="page-subtitle">Train your team on protocols, patient workflows, and clinic operations.</div>
      </div>
    </div>
    <div style={{display:"flex",gap:4,marginBottom:20,padding:4,background:"#EEF7FC",borderRadius:12,border:"1px solid #E8EFF6",width:"fit-content"}}>
      {["All Modules","Front Desk","Medical Assistants","Nurses","Providers"].map((t,i)=>(
        <button key={t} style={{padding:"7px 16px",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:i===0?700:500,background:i===0?"#FFFFFF":"transparent",color:i===0?"#00AEEA":"#4A5B78",boxShadow:i===0?"0 2px 10px rgba(0,174,234,.1)":"none",transition:"all .15s"}}>{t}</button>
      ))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
      {[
        {title:"Primeva Platform Overview",sub:"All Staff",lessons:6,time:"45 min",prog:100},
        {title:"Patient Onboarding Workflow",sub:"Front Desk, MAs",lessons:4,time:"30 min",prog:75},
        {title:"Protocol Assignment Basics",sub:"Providers, Nurses",lessons:5,time:"40 min",prog:60},
        {title:"GLP-1 Patient Conversations",sub:"Providers, Nurses",lessons:8,time:"55 min",prog:40},
        {title:"Supplement Discussion Framework",sub:"All Clinical",lessons:5,time:"35 min",prog:20},
        {title:"Using PrimevaAI",sub:"All Staff",lessons:3,time:"25 min",prog:0},
        {title:"Sourcing Partner Best Practices",sub:"All Staff",lessons:4,time:"30 min",prog:0},
        {title:"Patient Check-In Workflow",sub:"Front Desk, MAs",lessons:3,time:"20 min",prog:85},
        {title:"Wellness Protocol Conversations",sub:"All Clinical",lessons:5,time:"40 min",prog:50},
      ].map(m=>(
        <div key={m.title} style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:18,padding:20,boxShadow:"0 2px 12px rgba(0,174,234,.05)",transition:"all .2s"}}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor="#B8D9F0";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="#D8EAF3";}}>
          <div style={{height:72,background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)",borderRadius:10,marginBottom:14,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #E8EFF6"}}>
            <Ic n="edu" s={26} c="#00AEEA"/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <div style={{fontWeight:700,fontSize:13.5,color:"#061A44"}}>{m.title}</div>
            <span style={{fontSize:12,fontWeight:750,color:m.prog===100?"#16A34A":"#00AEEA"}}>{m.prog}%</span>
          </div>
          <div style={{fontSize:12,color:"#4A5B78",marginBottom:12}}>{m.sub} · {m.lessons} lessons · {m.time}</div>
          <div className="progress-bar" style={{marginBottom:14}}><div className="progress-fill" style={{width:`${m.prog}%`,background:m.prog===100?"linear-gradient(90deg,#3ED1C2,#16A34A)":undefined}}/></div>
          <button className="btn btn-primary btn-sm" style={{width:"100%",justifyContent:"center"}}>{m.prog===0?"Start":m.prog>=100?"Review":"Continue"}</button>
        </div>
      ))}
    </div>
  </div>
);

export default StaffTraining;