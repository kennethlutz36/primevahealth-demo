// ── PatientProfile ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge } from '../../data/mockPatients';
import { PAT_RESOURCES } from '../../data/mockSourcing';
import { PatLabSection, ConnectedHealthMetrics } from '../labs';


const PatProfile = () => (
  <div className="page fade">
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
        <div className="page-title">My Profile</div>
        <button className="btn btn-secondary btn-sm" onClick={()=>triggerModal("firstLogin")}>View Onboarding Flow</button>
      </div>
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16 }}>
      <div>
        <div className="card-sm" style={{ textAlign: "center", marginBottom: 14 }}>
          <div className="avatar" style={{ width: 64, height: 64, fontSize: 20, background: C.navy, margin: "0 auto 12px" }}>SM</div>
          <div style={{ fontWeight: 800, fontSize: 16, color: C.navy, letterSpacing: "-0.3px" }}>Sarah Mitchell</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>Member since Jan 2026</div>
          <div style={{ padding: "10px", background: "#EEF7FC", borderRadius: 8, marginBottom: 10, fontSize: 12 }}>
            <div style={{ color: C.muted }}>Connected Provider</div>
            <div style={{ fontWeight: 700, color: C.navy }}>Dr. Alex Morgan</div>
            <div style={{ color: C.muted }}>Scottsdale, AZ</div>
          </div>
          <div style={{ padding: "10px", background: "#F0FDF4", border: `1px solid ${C.greenBorder}`, borderRadius: 8, fontSize: 12 }}>
            <div style={{ color: C.green }}>Active Protocol</div>
            <div style={{ fontWeight: 700, color: C.green }}>Metabolic Reset</div>
            <div style={{ color: C.green }}>Week 11 of 16</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="card-sm">
          <div className="section-title" style={{ fontSize: 13 }}>Notifications</div>
          {[["Daily check-in reminders", true], ["Supplement reminders", true], ["Education alerts", false], ["Provider messages", true], ["Weekly progress summary", true]].map(([l, on]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${"#F0F6FB"}` }}>
              <span style={{ fontSize: 13, color: C.body }}>{l}</span>
              <button className={`toggle ${on ? "toggle-on" : "toggle-off"}`}><div className="toggle-knob" style={{ left: on ? 20 : 3 }} /></button>
            </div>
          ))}
        </div>
        <div className="card-sm">
          <div className="section-title" style={{ fontSize: 13 }}>Connected Devices</div>
          {["Apple Health", "WHOOP", "Oura Ring", "Garmin", "Lab Upload"].map(d => (
            <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${"#F0F6FB"}` }}>
              <span style={{ fontSize: 13, color: C.body }}>{d}</span>
              <span className="badge badge-gray">Coming Soon</span>
            </div>
          ))}
        </div>

      <div style={{ gridColumn: "span 2", marginTop: 16 }}>
        <div style={{ fontWeight: 750, fontSize: 15, color: "#061A44", marginBottom: 14 }}>Labs & Biomarkers</div>
        <PatLabSection patientId={1}/>
        <div style={{ marginTop: 14 }}><ConnectedHealthMetrics compact={true}/></div>
      </div>
      </div>
    </div>
  </div>
);



// ══════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════
// Global modal triggers (simple event-based)

export default PatProfile;