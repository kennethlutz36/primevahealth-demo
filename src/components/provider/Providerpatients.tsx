// ── ProviderPatients ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring, Spark } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge, AI_REPLIES } from '../../data/mockPatients';
import { PROV_PARTNERS } from '../../data/mockSourcing';
import { ProviderLabSection } from '../labs';


const Patients = ({ setPage, setSelPat }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = PATIENTS.filter(p => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase()) || p.protocol.toLowerCase().includes(search.toLowerCase());
    const mf = filter === "all" || p.status === filter;
    return ms && mf;
  });
  return (
    <div className="page fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div className="page-title">Patients</div>
          <div className="page-subtitle">Monitor patient progress and wellness behaviors</div>
        </div>
        <button className="btn btn-primary"><Ic n="plus" s={14} c="#fff" /> Add Patient</button>
      </div>
      <div className="metric-grid" style={{ gridTemplateColumns: "repeat(5,1fr)", marginBottom: 16 }}>
        {[["48", "Active Patients"], ["8", "Follow-Ups Due"], ["3", "Low Adherence"], ["12", "New Logs Today"], ["5", "Education Pending"]].map(([n, l]) => (
          <div key={l} className="metric-card"><div className="metric-num" style={{ fontSize: 24 }}>{n}</div><div className="metric-label">{l}</div></div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
        <div className="search-box" style={{ maxWidth: 240 }}>
          <Ic n="search" s={13} c={C.mutedLight} />
          <input placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {["all", "active", "due", "review"].map(f => (
          <button key={f} className={`tab${filter === f ? " active" : ""}`} style={{ borderBottom: "none", padding: "6px 12px", background: filter === f ? "#EEF7FC" : "#fff", border: `1px solid ${filter === f ? "#D8EAF3" : C.border}`, borderRadius: 7, color: filter === f ? C.cyan : C.muted }} onClick={() => setFilter(f)}>
            {f === "all" ? "All" : f === "due" ? "Follow-Up Due" : f === "review" ? "Needs Review" : "Active"}
          </button>
        ))}
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-header" style={{ gridTemplateColumns: "2fr 1.6fr 100px 80px 110px 90px 110px" }}>
          {["Patient", "Protocol", "Status", "Adherence", "Last Check-In", "Sleep", "Next Follow-Up"].map(h => <div key={h} className="th">{h}</div>)}
        </div>
        {filtered.map(p => (
          <div key={p.id} className="table-row" style={{ gridTemplateColumns: "2fr 1.6fr 100px 80px 110px 90px 110px" }} onClick={() => { setSelPat(p); setPage("patient-profile"); }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="avatar" style={{ width: 32, height: 32, fontSize: 11, background: C.navy }}>{p.init}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: C.navy }}>{p.name}</div>
                <div style={{ fontSize: 11, color: C.muted }}>Dr. Morgan</div>
              </div>
            </div>
            <div className="td">{p.protocol}</div>
            <div><span className={`badge ${p.status === "active" ? "badge-green" : p.status === "due" ? "badge-amber" : "badge-red"}`}>{p.status === "active" ? "Active" : p.status === "due" ? "Follow-Up Due" : "Needs Review"}</span></div>
            <div><Ring v={p.adh} size={38} /></div>
            <div className="td" style={{ color: C.muted, fontSize: 12 }}>{p.checkin}</div>
            <div><Spark data={p.sleep} /></div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: C.muted }}>{p.followup}</span>
              <Ic n="arrow" s={13} c={C.mutedLight} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;