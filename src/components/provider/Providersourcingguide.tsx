// ── ProviderSourcingGuide ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring, Spark } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge, AI_REPLIES } from '../../data/mockPatients';
import { PROV_PARTNERS } from '../../data/mockSourcing';
import { ProviderLabSection } from '../labs';


const Sourcing = () => {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [comparing, setComparing] = useState([]);

  const tabs = [
    { id:"all", label:"All Partners" },
    { id:"supplements", label:"Supplements" },
    { id:"pharmacy", label:"Pharmacies" },
    { id:"labs", label:"Labs" },
    { id:"wearables", label:"Wearables" },
    { id:"recovery", label:"Recovery Tools" },
    { id:"nutrition", label:"Nutrition" },
    { id:"sleep", label:"Sleep" },
    { id:"hydration", label:"Hydration" },
    { id:"clinic", label:"Clinic Equipment" },
  ];

  const filtered = PROV_PARTNERS.filter(p => {
    const matchTab = tab === "all" || p.catId === tab;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const catColor = id => ({ supplements:"#00AEEA", pharmacy:"#061A44", labs:"#4A5B78", wearables:"#3ED1C2", recovery:"#F59E0B", nutrition:"#10B981", sleep:"#00AEEA", hydration:"#06B6D4", clinic:"#4A5B78" }[id] || "#00AEEA");

  const PartnerCard = ({ p }) => (
    <div style={{ background:"#FFFFFF", border:`1px solid #D8EAF3`, borderRadius:20, padding:22, boxShadow:"0 2px 16px rgba(0,174,234,.06)", transition:"all .2s", position:"relative" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(0,174,234,.11)"; e.currentTarget.style.borderColor="#B8D9F0"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 2px 16px rgba(0,174,234,.06)"; e.currentTarget.style.borderColor="#D8EAF3"; }}>

      {p.primeva && (
        <div style={{ position:"absolute", top:14, right:14, padding:"3px 10px", background:"linear-gradient(135deg,#00AEEA,#16C7E8)", borderRadius:20, fontSize:10.5, fontWeight:700, color:"#fff" }}>Primeva Partner</div>
      )}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:14 }}>
        <div style={{ width:44, height:44, borderRadius:12, background:`${catColor(p.catId)}12`, border:`1px solid ${catColor(p.catId)}28`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <div style={{ fontSize:20 }}>
            {null}
          </div>
        </div>
        <div>
          <div style={{ fontWeight:750, fontSize:15, color:"#061A44", lineHeight:1.3, marginBottom:4 }}>{p.name}</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            <span style={{ padding:"2px 9px", background:`${catColor(p.catId)}12`, color:catColor(p.catId), borderRadius:20, fontSize:11, fontWeight:700 }}>{p.cat}</span>
            <span className="badge badge-blue">Sourcing Partner</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize:13, color:"#4A5B78", lineHeight:1.6, marginBottom:12 }}>{p.desc}</p>

      {/* Why it supports */}
      <div style={{ padding:"10px 12px", background:"#EEF7FC", borderRadius:10, marginBottom:12 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#4A5B78", textTransform:"uppercase", letterSpacing:".05em", marginBottom:3 }}>Why It Supports the Plan</div>
        <p style={{ fontSize:12.5, color:"#061A44", lineHeight:1.5 }}>{p.why}</p>
      </div>

      {/* Provider Note */}
      <div style={{ padding:"10px 12px", background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:10, marginBottom:12 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#B45309", textTransform:"uppercase", letterSpacing:".05em", marginBottom:3 }}>Provider Note</div>
        <p style={{ fontSize:12.5, color:"#78350F", lineHeight:1.5 }}>{p.providerNote}</p>
      </div>

      {/* Protocol Tags */}
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#4A5B78", textTransform:"uppercase", letterSpacing:".05em", marginBottom:6 }}>Best-Fit Protocols</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
          {p.protocols.slice(0,3).map(pr => <span key={pr} style={{ padding:"2px 8px", background:"#F5FAFD", border:"1px solid #E8EFF6", borderRadius:5, fontSize:11, color:"#4A5B78" }}>{pr}</span>)}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display:"flex", gap:12, marginBottom:14, paddingTop:10, borderTop:"1px solid #EEF7FC" }}>
        <div>
          <div style={{ fontSize:10.5, fontWeight:700, color:"#9BA8BE", textTransform:"uppercase", letterSpacing:".05em" }}>Patient Offer</div>
          <div style={{ fontSize:12.5, fontWeight:650, color:"#00AEEA", marginTop:2 }}>{p.offer}</div>
        </div>
        <div>
          <div style={{ fontSize:10.5, fontWeight:700, color:"#9BA8BE", textTransform:"uppercase", letterSpacing:".05em" }}>Clinic Access</div>
          <div style={{ fontSize:12.5, fontWeight:650, color:"#3ED1C2", marginTop:2 }}>{p.providerDiscount}</div>
        </div>
        <div style={{ marginLeft:"auto", textAlign:"right" }}>
          <div style={{ display:"flex", alignItems:"center", gap:3 }}>
            <span style={{ color:"#F59E0B", fontSize:13 }}>★</span>
            <span style={{ fontWeight:750, fontSize:13, color:"#061A44" }}>{p.rating}</span>
            <span style={{ fontSize:11.5, color:"#4A5B78" }}>({p.reviews})</span>
          </div>
          <div style={{ fontSize:11, color:"#4A5B78", marginTop:1 }}>{p.fulfillment}</div>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        <button className="btn btn-primary btn-sm" style={{ justifyContent:"center" }}>View Partner</button>
        <button className="btn btn-secondary btn-sm" style={{ justifyContent:"center" }} onClick={() => setComparing(c => c.includes(p.id) ? c.filter(x=>x!==p.id) : [...c.slice(-2), p.id])}>
          {comparing.includes(p.id) ? "✓ Added" : "Compare"}
        </button>
        <button className="btn btn-ghost btn-sm" style={{ justifyContent:"center", fontSize:11.5 }}>Add to Protocol</button>
        <button className="btn btn-ghost btn-sm" style={{ justifyContent:"center", fontSize:11.5 }}>Request Intro</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding:"28px 32px" }} className="fade">
      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg, #061A44 0%, #081F4D 60%, #0A4A8A 100%)", borderRadius:18, padding:"26px 30px", marginBottom:22, position:"relative", overflow:"hidden", boxShadow:"0 8px 40px rgba(6,26,68,.2)" }}>
        <div style={{ position:"absolute", right:-40, top:-40, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,174,234,.2) 0%, transparent 70%)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontWeight:800, fontSize:22, color:"#fff", letterSpacing:"-.5px", marginBottom:6 }}>Sourcing Guide</div>
          <p style={{ fontSize:13.5, color:"rgba(255,255,255,.65)", maxWidth:560, lineHeight:1.65, marginBottom:6 }}>
            Compare recommended sourcing and optimization partners across pharmacies, supplements, labs, wearables, recovery tools, and clinic support.
          </p>
          <p style={{ fontSize:12, color:"rgba(255,255,255,.4)", maxWidth:520, lineHeight:1.6 }}>
            Primeva organizes sourcing options by quality standards, protocol fit, and provider value so clinics can evaluate partners with confidence.
          </p>
        </div>
      </div>

      {/* Disclosure */}
      <div style={{ padding:"10px 16px", background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:10, marginBottom:18, fontSize:12, color:"#92400E", lineHeight:1.55 }}>
        Some partner links may generate compensation for Primeva. Recommendations are intended for educational and wellness support and should be reviewed with the provider when applicable.
      </div>

      {/* Search + Compare bar */}
      <div style={{ display:"flex", gap:12, marginBottom:16, alignItems:"center" }}>
        <div className="search-box" style={{ maxWidth:280, background:"rgba(255,255,255,.9)", borderColor:"#D8EAF3" }}>
          <Ic n="search" s={13} c="#9BA8BE" />
          <input placeholder="Search partners..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {comparing.length > 0 && (
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:10, padding:"7px 16px", background:"#EEF7FC", border:"1px solid #E8EFF6", borderRadius:10 }}>
            <span style={{ fontSize:12.5, fontWeight:650, color:"#061A44" }}>{comparing.length} selected</span>
            <button className="btn btn-primary btn-sm">Compare Now</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setComparing([])}>Clear</button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="tab-bar" style={{ marginBottom:22 }}>
        {tabs.map(t => <button key={t.id} className={`tab${tab===t.id?" active":""}`} onClick={() => setTab(t.id)}>{t.label}</button>)}
      </div>

      {/* Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
        {filtered.map(p => <PartnerCard key={p.id} p={p} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign:"center", padding:"48px", color:"#4A5B78" }}>
          <div style={{ fontSize:13, fontWeight:600, color:"#061A44", marginBottom:4 }}>No partners found</div>
          <div style={{ fontSize:12.5 }}>Try a different category or search term.</div>
        </div>
      )}
    </div>
  );
};

export default Sourcing;