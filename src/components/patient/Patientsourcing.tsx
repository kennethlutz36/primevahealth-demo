// ── PatientSourcing ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge } from '../../data/mockPatients';
import { PAT_RESOURCES } from '../../data/mockSourcing';
import { PatLabSection, ConnectedHealthMetrics } from '../labs';


const PatSourcing = () => {
  const [tab, setTab] = useState("all");

  const tabs = [
    { id:"all", label:"All Resources" },
    { id:"supplements", label:"Supplement Support" },
    { id:"diagnostics", label:"Diagnostics & At-Home Testing" },
    { id:"wearables", label:"Wearables & Tracking" },
    { id:"lifestyle", label:"Lifestyle Support" },
    { id:"quality", label:"Quality & Sourcing Education" },
  ];

  const filtered = tab === "all" ? PAT_RESOURCES : PAT_RESOURCES.filter(r => r.cat === tab);

  const catColor = cat => ({ supplements:"#10B981", diagnostics:"#4A5B78", wearables:"#3EC9C1", lifestyle:"#2B7FE0", quality:"#F59E0B" }[cat] || C.cyan);
  const catIcon = cat => ({ supplements:"edu", diagnostics:"edu", wearables:"progress", lifestyle:"today", quality:"edu" }[cat] || "protocol");

  return (
    <div className="page fade">
      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg, ${C.navy} 0%, #1a3a6e 100%)`, borderRadius:12, padding:"22px 26px", marginBottom:16, position:"relative" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontWeight:800, fontSize:20, color:"#fff", letterSpacing:"-0.3px", marginBottom:5 }}>Sourcing Guide</div>
        <p style={{ fontSize:13, color:"rgba(255,255,255,.65)", maxWidth:480, lineHeight:1.65, marginBottom:10 }}>
          Explore provider-approved resources for supplements, tracking tools, at-home testing education, lifestyle support, and quality standards.
        </p>
        <p style={{ fontSize:12, color:"rgba(255,255,255,.45)", maxWidth:500, lineHeight:1.6 }}>
          Primeva helps patients understand the tools and resources that may support their optimization plan while keeping provider guidance at the center.
        </p>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ flexShrink:0, marginLeft:16, background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.3)", color:"#fff" }} onClick={()=>triggerModal("askProvider")}>Ask Provider</button>
        </div>
      </div>

      {/* Safety notice */}
      <div style={{ padding:"9px 14px", background:"#EEF7FC", border:`1px solid ${"#D8EAF3"}`, borderRadius:8, marginBottom:16, fontSize:12, color:C.navy, lineHeight:1.5 }}>
        This section is educational and does not replace medical guidance. Always review testing, supplements, sourcing, and optimization decisions with your provider.
      </div>

      {/* Tabs */}
      <div className="tab-bar" style={{ marginBottom:20 }}>
        {tabs.map(t => <button key={t.id} className={`tab${tab===t.id?" active":""}`} onClick={() => setTab(t.id)}>{t.label}</button>)}
      </div>

      {/* Resource Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
        {filtered.map(r => (
          <div key={r.id} className="card-sm" style={{ transition:"all .18s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = catColor(r.cat); e.currentTarget.style.boxShadow = `0 2px 12px ${catColor(r.cat)}14`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:catColor(r.cat)+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{catIcon(r.cat)}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:13.5, color:C.navy }}>{r.name}</div>
                  <span style={{ padding:"1px 7px", background:catColor(r.cat)+"18", color:catColor(r.cat), borderRadius:20, fontSize:10.5, fontWeight:600 }}>{r.type}</span>
                </div>
              </div>
              {r.approved
                ? <span className="badge badge-green" style={{ fontSize:10, flexShrink:0 }}>Provider-Approved</span>
                : <span className="badge badge-gray" style={{ fontSize:10, flexShrink:0 }}>Ask Provider</span>
              }
            </div>

            <div style={{ marginBottom:8 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:".04em", marginBottom:3 }}>Best For</div>
              <p style={{ fontSize:12.5, color:C.body, lineHeight:1.5 }}>{r.best}</p>
            </div>

            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:".04em", marginBottom:3 }}>Why It May Help</div>
              <p style={{ fontSize:12.5, color:C.muted, lineHeight:1.5 }}>{r.why}</p>
            </div>

            <div style={{ padding:"8px 10px", background:"#EEF7FC", border:`1px solid ${"#D8EAF3"}`, borderRadius:7, fontSize:12, color:C.navy, lineHeight:1.5, marginBottom:12 }}>
              <span style={{ fontWeight:700 }}>Ask your provider: </span>{r.ask}
            </div>

            <button className="btn btn-primary btn-sm" style={{ width:"100%" }}>Learn More</button>
          </div>
        ))}
      </div>

      {/* Questions to ask provider */}
      <div className="card" style={{ background:"#EEF7FC", border:`1px solid ${"#D8EAF3"}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
          <Ic n="spark" s={15} c={C.cyan} />
          <div style={{ fontWeight:700, fontSize:14, color:C.navy }}>Questions to Ask Your Provider</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[
            "Which supplements are right for my specific protocol?",
            "Are there any supplements I should avoid during my protocol?",
            "Would a wearable like WHOOP or Oura help track my progress?",
            "Is at-home hormone or metabolic testing appropriate for me?",
            "How do I know if a supplement meets quality standards?",
            "What tracking metrics should I focus on for my goals?",
          ].map((q,i) => (
            <div key={i} style={{ display:"flex", gap:10, padding:"10px 12px", background:"#fff", borderRadius:8, border:`1px solid ${C.border}` }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:C.cyan, flexShrink:0, marginTop:6 }} />
              <span style={{ fontSize:13, color:C.body, lineHeight:1.5 }}>{q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatSourcing;