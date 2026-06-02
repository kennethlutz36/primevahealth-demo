// ── ProviderOverview ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring, Spark } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge, AI_REPLIES } from '../../data/mockPatients';
import { PROV_PARTNERS } from '../../data/mockSourcing';
import { ProviderLabSection } from '../labs';


const Overview = ({ setPage }) => (
  <div className="page fade">
    <div className="hero-card" style={{ marginBottom: 20 }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 6 }}>Tuesday, May 26, 2026</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.4px", marginBottom: 4 }}>Welcome back, Dr. Morgan</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.65)", marginBottom: 20, maxWidth: 480 }}>Your central hub for provider-guided wellness optimization.</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-primary" onClick={() => setPage("protocols")}>Protocol Builder</button>
          <button onClick={() => setPage("patients")} style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", borderRadius: 7, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>View Patients</button>
        </div>
      </div>
    </div>

    <div className="metric-grid" className="responsive-grid-4" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
      {[
        ["48", "Active Patients", "+3 this week", true, "patients"],
        ["32", "Active Protocols", "+5 this month", true, "protocol"],
        ["81%", "Avg Adherence", "+4% vs last week", true, "report"],
        ["64%", "Education Done", "+8% vs last week", true, "edu"],
      ].map(([n, l, d, up, icon]) => (
        <div key={l} className="metric-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: "#EEF7FC", border: "1px solid #D8EAF3", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n={icon} s={16} c="#00AEEA"/></div>
            <span style={{ fontSize: 11, fontWeight: 700, color: up ? C.green : C.red, background: up ? "#F0FDF4" : C.redBg, padding: "2px 8px", borderRadius: 20, border: `1px solid ${up ? C.greenBorder : "rgba(220,38,38,.2)"}` }}>{up ? "↑" : "↓"} {d.split(" ")[0]}</span>
          </div>
          <div className="metric-num">{n}</div>
          <div className="metric-label">{l}</div>
          <div style={{ marginTop: 10 }}>
            <div className="progress-bar"><div className="progress-fill" style={{ width: "72%" }} /></div>
          </div>
        </div>
      ))}
    </div>

    <div style={{ marginBottom: 20 }}>
      <div className="section-label">Quick Access</div>
      <div className="quick-action-grid">
        {[["Education Hub", "edu", "Explore education"], ["Protocol Builder", "protocol", "Create & customize"], ["Pharmacy Partners", "pharma", "Compare & order"], ["Patient Resources", "patients", "Handouts & forms"], ["Staff Training", "training", "Train your team"], ["Compliance Center", "compliance", "Guidelines & docs"]].map(([l, icon, sub]) => (
          <div key={l} className="quick-action">
            <div className="quick-action-icon"><Ic n={icon} s={17} c={C.cyan} /></div>
            <div className="quick-action-label">{l}</div>
            <div style={{ fontSize: 10.5, color: C.mutedLight }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="overview-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="overview-2col">
      <div className="card">
        <div className="section-title">Questions Needing Response</div>
        <div style={{ fontSize: 13, color: "#4A5B78", marginBottom: 12 }}>Recent patient questions waiting for provider review.</div>
        {[
          { patient:"Sarah Mitchell", init:"SM", cat:"Nutrition", q:"Can I swap breakfast for a protein shake?", status:"New" },
          { patient:"James Rivera", init:"JR", cat:"Supplements", q:"I missed magnesium last night. Should I take it this morning?", status:"Needs Response" },
          { patient:"Emily Chen", init:"EC", cat:"Sleep", q:"My sleep score dropped this week. What should I adjust?", status:"New" },
          { patient:"Robert Kim", init:"RK", cat:"Protocol", q:"I missed two workouts. Should I restart the week?", status:"Needs Review" },
        ].map((item, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom: i<3 ? "1px solid #EEF7FC" : "none" }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#00AEEA,#3ED1C2)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:11.5, fontWeight:750, flexShrink:0 }}>{item.init}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3, flexWrap:"wrap" }}>
                <span style={{ fontWeight:650, fontSize:13, color:"#061A44" }}>{item.patient}</span>
                <span style={{ padding:"1px 7px", background:"#EEF7FC", color:"#00AEEA", borderRadius:4, fontSize:10.5, fontWeight:700 }}>{item.cat}</span>
                <span style={{ padding:"1px 7px", background:item.status==="Needs Review"?"#FEF2F2":item.status==="Needs Response"?"#FFFBEB":"#EEF7FC", color:item.status==="Needs Review"?"#DC2626":item.status==="Needs Response"?"#D97706":"#00AEEA", borderRadius:4, fontSize:10.5, fontWeight:700 }}>{item.status}</span>
              </div>
              <div style={{ fontSize:12.5, color:"#4A5B78", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>"{item.q}"</div>
            </div>
            <button className="btn btn-primary btn-sm" style={{ flexShrink:0 }}>Reply</button>
          </div>
        ))}
        <div style={{ marginTop:10, paddingBottom:16, borderBottom:"1px solid #EEF7FC" }}>
          <button className="btn btn-ghost btn-sm" style={{ fontSize:12, color:"#00AEEA" }}>Open Provider Inbox →</button>
        </div>
        <div style={{ height:14 }}/>
        <div className="section-title">Recent Activity</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px", gap: 8, marginBottom: 10 }}>
          {["Item", "Type", "Last Viewed"].map(h => <div key={h} className="th">{h}</div>)}
        </div>
        {[["Tirzepatide Protocol", "Protocol", "May 20, 2025"], ["GLP-1 Mechanism Overview", "Education Module", "May 20, 2025"], ["Empower Pharmacy", "Pharmacy Partner", "May 19, 2025"], ["Injection Technique Guide", "Patient Resource", "May 18, 2025"], ["Lab Monitoring: Metabolic Panel", "Lab Protocol", "May 17, 2025"]].map(([n, t, d]) => (
          <div key={n} style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px", gap: 8, padding: "8px 0", borderTop: `1px solid ${"#F0F6FB"}`, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.cyan, flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, color: C.navy, fontWeight: 500 }}>{n}</span>
            </div>
            <span style={{ fontSize: 12, color: C.muted }}>{t}</span>
            <span style={{ fontSize: 12, color: C.muted }}>{d}</span>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" style={{ marginTop: 12, color: C.cyan }}>View all activity →</button>
      </div>

      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "#EEF7FC", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic n="spark" s={14} c={C.cyan} />
          </div>
          <div className="section-title" style={{ margin: 0 }}>Platform Updates</div>
        </div>
        {[
          { title: "New Education Module", sub: "Metabolic Health Foundations — now available", cta: "View Module →" },
          { title: "New Clinic Handout", sub: "GLP-1 Lifestyle Support guide updated", cta: "View Handout →" },
          { title: "New Sourcing Partner", sub: "Lab Testing Partner added to Sourcing Guide", cta: "View Details →" },
        ].map(u => (
          <div key={u.title} style={{ display: "flex", gap: 10, padding: "10px 0", borderTop: `1px solid ${"#F0F6FB"}` }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: C.bg, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Ic n="bell" s={13} c={C.muted} />
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.navy }}>{u.title}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>{u.sub}</div>
              <button className="btn btn-ghost btn-sm" style={{ color: C.cyan, padding: "2px 0", marginTop: 3 }}>{u.cta}</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ gridColumn: "span 2", background: "linear-gradient(135deg, rgba(6,26,68,.06), rgba(0,174,234,.06))", backdropFilter: "blur(16px)", border: "1px solid rgba(0,174,234,.15)", borderRadius: 16, padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#061A44,#2B7FE0)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(0,174,234,.3)" }}>
              <Ic n="spark" s={15} c="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 750, fontSize: 14, color: C.navy }}>PrimevaAI Insights</div>
              <div style={{ fontSize: 11, color: C.muted }}>Updated just now · Demo mode</div>
            </div>
          </div>
          <button className="btn btn-primary btn-sm">Open PrimevaAI</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }} className="overview-ai-grid">
          {[
            { text: "8 patients are due for follow-up this week", color: "#F59E0B", icon: "bell" },
            { text: "4 patients have declining adherence scores", color: "#DC2626", icon: "report" },
            { text: "12 patients completed education this week", color: "#16A34A", icon: "check" },
            { text: "Protein intake trending low in metabolic group", color: "#00AEEA", icon: "protocol" },
          ].map(i => (
            <div key={i.text} style={{ padding: "12px 14px", background: "rgba(255,255,255,.9)", borderRadius: 12, border: "1px solid rgba(255,255,255,.7)" }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{i.icon}</div>
              <div style={{ fontSize: 12.5, color: C.navy, lineHeight: 1.5, fontWeight: 500 }}>{i.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Overview;