// ── Labs & Biomarkers Components ─────────────────────────────────────
// labStatusStyle, reviewStatusStyle, TrendSparkline,
// LabUploadModal, ProviderLabSection, PatLabSection, ConnectedHealthMetrics
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic } from '../shared/primitives';
import { LAB_REPORTS, BIOMARKER_RESULTS, BIOMARKER_TRENDS } from '../../data/mockLabs';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS } from '../../data/mockPatients';

const labStatusStyle = (s) => ({
  "In Range":            { bg:"#F0FDF4", color:"#16A34A", border:"#BBF7D0" },
  "Upper Range":         { bg:"#FFFBEB", color:"#D97706", border:"#FDE68A" },
  "Low-Normal":          { bg:"#FFFBEB", color:"#D97706", border:"#FDE68A" },
  "Above Selected Range":{ bg:"#FEF2F2", color:"#DC2626", border:"#FECACA" },
  "Below Selected Range":{ bg:"#FEF2F2", color:"#DC2626", border:"#FECACA" },
  "Monitoring":          { bg:"#EEF7FC", color:"#00AEEA", border:"#D8EAF3" },
  "Pending Provider Review":{ bg:"#F5FAFD", color:"#4A5B78", border:"#D8EAF3" },
  "Reviewed by Provider":{ bg:"#EEF7FC", color:"#00AEEA", border:"#D8EAF3" },
}[s] || { bg:"#F5FAFD", color:"#4A5B78", border:"#D8EAF3" });

const reviewStatusStyle = (s) => ({
  reviewed:   { bg:"#F0FDF4", color:"#16A34A", border:"#BBF7D0", label:"Reviewed" },
  pending:    { bg:"#FFFBEB", color:"#D97706", border:"#FDE68A", label:"Pending Provider Review" },
  needsFollowUp:{ bg:"#FEF2F2", color:"#DC2626", border:"#FECACA", label:"Needs Follow-Up" },
  uploaded:   { bg:"#EEF7FC", color:"#00AEEA", border:"#D8EAF3", label:"Uploaded" },
}[s] || { bg:"#F5FAFD", color:"#4A5B78", border:"#D8EAF3", label:"Unknown" });

const TrendSparkline = ({ points, color = "#00AEEA", height = 40 }) => {
  if (!points || points.length < 2) return null;
  const vals = points.map(p => p.v);
  const min = Math.min(...vals) * 0.92;
  const max = Math.max(...vals) * 1.08;
  const range = max - min || 1;
  const w = 80, h = height;
  const pts = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p.v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow:"visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {points.map((p, i) => {
        const x = (i / (points.length - 1)) * w;
        const y = h - ((p.v - min) / range) * h;
        return <circle key={i} cx={x} cy={y} r="3" fill={color}/>;
      })}
    </svg>
  );
};

// ── LAB UPLOAD MODAL (patient and provider) ────────────────────────────
const LabUploadModal = ({ onClose, patientName = "", isProvider = false }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ labType:"Metabolic Panel", labDate:"", note:"", fileName:"", markReviewed:false });
  const up = (k, v) => setForm(f => ({...f, [k]:v}));
  const LAB_TYPES = ["Baseline Wellness Panel","Hormone Panel","Metabolic Panel","Lipid Panel","Micronutrient Panel","Thyroid Panel","Inflammatory Marker Panel","Follow-Up Labs","Other"];

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(6,26,68,.45)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:"#FFFFFF",borderRadius:22,padding:28,width:480,boxShadow:"0 20px 60px rgba(6,26,68,.25)",border:"1px solid #E8EFF6"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontWeight:800,fontSize:17,color:"#061A44"}}>{isProvider ? "Upload Lab Report" : "Upload Lab Report"}</div>
          <button onClick={onClose} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:22,color:"#9BA8BE",lineHeight:1}}>×</button>
        </div>

        {step === 1 && (
          <>
            {isProvider && patientName && (
              <div style={{padding:"8px 12px",background:"#EEF7FC",border:"1px solid #E8EFF6",borderRadius:9,marginBottom:14,fontSize:13,color:"#061A44"}}>
                Uploading for: <strong>{patientName}</strong>
              </div>
            )}
            <div className="form-group" style={{marginBottom:13}}>
              <label className="form-label">Lab Type</label>
              <select className="form-input" value={form.labType} onChange={e=>up("labType",e.target.value)}>
                {LAB_TYPES.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group" style={{marginBottom:13}}>
              <label className="form-label">Lab Date</label>
              <input className="form-input" type="date" value={form.labDate} onChange={e=>up("labDate",e.target.value)}/>
            </div>
            <div style={{border:"2px dashed #D8EAF3",borderRadius:14,padding:"24px",textAlign:"center",marginBottom:13,cursor:"pointer",background:"#F5FAFD",transition:"all .18s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#00AEEA";e.currentTarget.style.background="#EEF7FC";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#D8EAF3";e.currentTarget.style.background="#F5FAFD";}}
              onClick={()=>up("fileName","Lab_Report_" + (form.labDate||"2026") + ".pdf")}>
              <Ic n="protocol" s={28} c="#00AEEA"/>
              <div style={{fontWeight:650,fontSize:14,color:"#061A44",marginTop:10}}>
                {form.fileName ? form.fileName : "Click to select PDF"}
              </div>
              <div style={{fontSize:12,color:"#9BA8BE",marginTop:4}}>PDF only · Max 20MB · Demo mode — no real upload</div>
            </div>
            <div className="form-group" style={{marginBottom:14}}>
              <label className="form-label">{isProvider ? "Provider Note (optional)" : "Note for Provider (optional)"}</label>
              <textarea className="form-input" rows={2} style={{resize:"none"}} placeholder={isProvider ? "Add a note about this upload..." : "e.g. Uploaded from my PCP visit on..."} value={form.note} onChange={e=>up("note",e.target.value)}/>
            </div>
            {isProvider && (
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"#EEF7FC",border:"1px solid #E8EFF6",borderRadius:10,marginBottom:14}}>
                <div>
                  <div style={{fontWeight:650,fontSize:13,color:"#061A44"}}>Mark as Reviewed</div>
                  <div style={{fontSize:12,color:"#4A5B78"}}>Skip to reviewed status on upload</div>
                </div>
                <button className={`toggle ${form.markReviewed?"toggle-on":"toggle-off"}`} onClick={()=>up("markReviewed",!form.markReviewed)}>
                  <div className="toggle-knob" style={{left:form.markReviewed?21:3}}/>
                </button>
              </div>
            )}
            <div style={{padding:"9px 12px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:9,fontSize:11.5,color:"#92400E",lineHeight:1.5,marginBottom:16}}>
              {isProvider
                ? "Uploaded lab reports are for provider organization and review only. Primeva does not perform clinical interpretation or diagnostic analysis."
                : "Your lab report will be uploaded for provider review. Your provider will review and may share approved notes or trends with you."}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={()=>{ if(form.fileName||true) setStep(2); }}>Upload for Provider Review</button>
              <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={onClose}>Cancel</button>
            </div>
          </>
        )}

        {step === 2 && (
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{width:60,height:60,borderRadius:"50%",background:"linear-gradient(135deg,#00AEEA,#16C7E8)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:"0 4px 20px rgba(0,174,234,.3)"}}>
              <Ic n="check" s={26} c="#fff"/>
            </div>
            <div style={{fontWeight:800,fontSize:18,color:"#061A44",marginBottom:8}}>Lab Report Uploaded!</div>
            <p style={{fontSize:13.5,color:"#4A5B78",lineHeight:1.7,marginBottom:8}}>
              <strong>{form.fileName || "Lab_Report.pdf"}</strong>
            </p>
            <p style={{fontSize:13.5,color:"#4A5B78",lineHeight:1.7,marginBottom:20}}>
              {isProvider
                ? form.markReviewed
                  ? "Marked as reviewed. Biomarker trends will be visible to the patient."
                  : "Uploaded and awaiting your review. Biomarker trends will be visible to the patient after your review."
                : "Your lab report has been uploaded and is waiting for provider review. Once reviewed, approved notes may appear in your Progress section."}
            </p>
            <button className="btn btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ── PROVIDER LAB REVIEW SECTION (for PatientProfilePage) ───────────────
const ProviderLabSection = ({ patient }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [showAISummary, setShowAISummary] = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  const [provNote, setProvNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  const patientReports = LAB_REPORTS.filter(r => r.patientId === patient.id);
  const latestReport = patientReports[0];
  const biomarkers = BIOMARKER_RESULTS.filter(b => b.patientId === patient.id);

  const trendKeys = ["hba1c","vitd","ldl","glucose","crp"];

  return (
    <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 14px rgba(0,174,234,.05)"}}>
      {showUpload && <LabUploadModal onClose={()=>setShowUpload(false)} patientName={patient.name} isProvider={true}/>}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{fontWeight:750,fontSize:16,color:"#061A44"}}>Labs & Biomarkers</div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-secondary btn-sm" onClick={()=>setShowUpload(true)}>Upload Lab Report for Patient</button>
          <button className="btn btn-ghost btn-sm">Add Manual Biomarker</button>
        </div>
      </div>

      {/* Latest upload card */}
      {latestReport && (
        <div style={{padding:"14px 16px",background:"#F5FAFD",border:"1px solid #E8EFF6",borderRadius:14,marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:38,height:38,borderRadius:10,background:"#EEF7FC",border:"1px solid #E8EFF6",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Ic n="protocol" s={18} c="#00AEEA"/>
              </div>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:"#061A44"}}>{latestReport.fileName}</div>
                <div style={{fontSize:12,color:"#4A5B78",marginTop:2}}>{latestReport.labType} · Lab date: {latestReport.labDate} · Uploaded: {latestReport.uploadDate}</div>
                <div style={{fontSize:12,color:"#9BA8BE",marginTop:1}}>Uploaded by {latestReport.uploadedBy} ({latestReport.uploadedByRole})</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
              {(() => { const s = reviewStatusStyle(reviewed ? "reviewed" : latestReport.reviewStatus); return <span style={{padding:"3px 10px",background:s.bg,border:`1px solid ${s.border}`,borderRadius:20,fontSize:11.5,fontWeight:700,color:s.color}}>{s.label}</span>; })()}
              <button className="btn btn-primary btn-sm">View Report</button>
            </div>
          </div>
        </div>
      )}

      {/* PrimevaAI Lab Summary */}
      <div style={{background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)",border:"1px solid #E8EFF6",borderRadius:14,padding:16,marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#061A44,#00AEEA)",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="spark" s={13} c="#fff"/></div>
            <div style={{fontWeight:750,fontSize:13.5,color:"#061A44"}}>PrimevaAI Lab Summary</div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={()=>setShowAISummary(s=>!s)}>
            {showAISummary ? "Hide Summary" : "Generate Summary"}
          </button>
        </div>
        {showAISummary && (
          <>
            <p style={{fontSize:13,color:"#111111",lineHeight:1.7,marginBottom:12}}>
              PrimevaAI organized this uploaded lab report into biomarker categories for provider review. Several values may be useful to review, including HbA1c at the upper end of the selected range, LDL-C above the selected threshold, and Vitamin D at low-normal. This summary is for organizational support only and is not diagnostic.
            </p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
              <button className="btn btn-secondary btn-sm">Draft Provider Note</button>
              <button className="btn btn-secondary btn-sm">Assign Education</button>
              <button className="btn btn-secondary btn-sm">Add to Protocol</button>
            </div>
          </>
        )}
        <div style={{fontSize:11,color:"#9BA8BE",lineHeight:1.5}}>
          PrimevaAI lab summaries are for educational organization and provider review only. They do not replace clinical interpretation, medical advice, or provider judgment.
        </div>
      </div>

      {/* Extracted Biomarker Table */}
      {biomarkers.length > 0 && (
        <div style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontWeight:700,fontSize:14,color:"#061A44"}}>Extracted Biomarker Values</div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-primary btn-sm" onClick={()=>setReviewed(true)}>
                {reviewed ? "✓ Values Approved" : "Approve Extracted Values"}
              </button>
              <button className="btn btn-ghost btn-sm">Edit Values</button>
            </div>
          </div>
          <div className="table-scroll-container"><div className="biomarker-table-desktop" style={{border:"1px solid #E8EFF6",borderRadius:14,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"1.4fr 0.8fr 0.6fr 1fr 1.2fr 0.8fr",padding:"9px 14px",background:"#F5FAFD",borderBottom:"1px solid #D8EAF3"}}>
              {["Biomarker","Result","Unit","Reference Range","Status","Trend"].map(h=>(
                <div key={h} style={{fontSize:10.5,fontWeight:750,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".05em"}}>{h}</div>
              ))}
            </div>
            {biomarkers.map((b,i)=>{
              const st = labStatusStyle(b.status);
              return (
                <div key={b.id} style={{display:"grid",gridTemplateColumns:"1.4fr 0.8fr 0.6fr 1fr 1.2fr 0.8fr",padding:"10px 14px",borderBottom:i<biomarkers.length-1?"1px solid #EEF7FC":"none",alignItems:"center"}}>
                  <div style={{fontSize:13.5,fontWeight:600,color:"#061A44"}}>{b.name}</div>
                  <div style={{fontSize:13.5,fontWeight:750,color:"#061A44"}}>{b.value}</div>
                  <div style={{fontSize:12.5,color:"#4A5B78"}}>{b.unit}</div>
                  <div style={{fontSize:12.5,color:"#4A5B78"}}>{b.refRange}</div>
                  <div><span style={{padding:"2px 9px",background:st.bg,border:`1px solid ${st.border}`,borderRadius:20,fontSize:11,fontWeight:700,color:st.color}}>{b.status}</span></div>
                  <div style={{fontSize:12.5,color:b.trend==="Improving"?"#16A34A":b.trend==="Stable"?"#4A5B78":"#D97706",fontWeight:600}}>{b.trend}</div>
                </div>
              );
            })}
          </div></div>
        </div>
      )}

      {/* Mobile biomarker cards — shown on mobile, hidden on desktop via CSS */}
      {biomarkers.length > 0 && (
        <div className="biomarker-cards-mobile" style={{marginBottom:16}}>
          {biomarkers.map((b,i)=>{
            const st = labStatusStyle(b.status);
            return (
              <div key={b.id} style={{background:"#F5FAFD",border:"1px solid #E8EFF6",borderRadius:12,padding:"12px 14px",marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div style={{fontWeight:700,fontSize:14,color:"#061A44"}}>{b.name}</div>
                  <span style={{padding:"2px 9px",background:st.bg,border:`1px solid ${st.border}`,borderRadius:20,fontSize:11,fontWeight:700,color:st.color}}>{b.status}</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div><div style={{fontSize:10.5,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".05em",marginBottom:2}}>Result</div><div style={{fontSize:16,fontWeight:800,color:"#061A44"}}>{b.value} <span style={{fontSize:12,fontWeight:500,color:"#9BA8BE"}}>{b.unit}</span></div></div>
                  <div><div style={{fontSize:10.5,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".05em",marginBottom:2}}>Reference</div><div style={{fontSize:13,color:"#4A5B78"}}>{b.refRange}</div></div>
                  <div><div style={{fontSize:10.5,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".05em",marginBottom:2}}>Trend</div><div style={{fontSize:13,fontWeight:650,color:b.trend==="Improving"?"#16A34A":b.trend==="Stable"?"#4A5B78":"#D97706"}}>{b.trend}</div></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Provider actions */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:reviewed?14:0}}>
        <button className="btn btn-secondary btn-sm" onClick={()=>setAddingNote(n=>!n)}>Add Provider Note</button>
        <button className="btn btn-ghost btn-sm">Assign Education</button>
        <button className="btn btn-ghost btn-sm">Add to Protocol</button>
        <button className="btn btn-ghost btn-sm">Request Follow-Up Labs</button>
      </div>
      {addingNote && !noteSaved && (
        <div style={{marginTop:12}}>
          <textarea className="form-input" rows={3} style={{resize:"none",marginBottom:8}} placeholder="Add a provider note about this lab report..." value={provNote} onChange={e=>setProvNote(e.target.value)}/>
          <div style={{display:"flex",gap:8}}>
            <button className="btn btn-primary btn-sm" onClick={()=>setNoteSaved(true)}>Save Note</button>
            <button className="btn btn-ghost btn-sm" onClick={()=>setAddingNote(false)}>Cancel</button>
          </div>
        </div>
      )}
      {noteSaved && (
        <div style={{marginTop:12,padding:"10px 14px",background:"#EEF7FC",border:"1px solid #E8EFF6",borderRadius:10,fontSize:13,color:"#4A5B78"}}><strong style={{color:"#061A44"}}>Provider Note:</strong> {provNote||"Reviewed and approved."}</div>
      )}

      {/* Biomarker Trends */}
      <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #EEF7FC"}}>
        <div style={{fontWeight:700,fontSize:14,color:"#061A44",marginBottom:12}}>Biomarker Trends</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
          {trendKeys.map(k=>{
            const t = BIOMARKER_TRENDS[k];
            if (!t) return null;
            const last = t.points[t.points.length-1];
            const prev = t.points[t.points.length-2];
            const dir = last.v > prev.v ? "↑" : last.v < prev.v ? "↓" : "→";
            const isGoodUp = k === "vitd" || k === "hdl";
            const color = dir==="→" ? "#00AEEA" : (isGoodUp ? (dir==="↑"?"#16A34A":"#D97706") : (dir==="↓"?"#16A34A":"#D97706"));
            return (
              <div key={k} style={{background:"#F5FAFD",borderRadius:12,padding:"12px 14px",border:"1px solid #E8EFF6"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#4A5B78",marginBottom:4}}>{t.name}</div>
                <div style={{fontSize:18,fontWeight:800,color:"#061A44",letterSpacing:"-.5px",lineHeight:1}}>{last.v}<span style={{fontSize:11,fontWeight:500,color:"#9BA8BE",marginLeft:3}}>{t.unit}</span></div>
                <div style={{fontSize:12,fontWeight:700,color,marginTop:4}}>{dir} {t.points[t.points.length-1].label}</div>
                <TrendSparkline points={t.points} color={color} height={32}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ── PATIENT LAB SECTION (Progress page) ───────────────────────────────
const PatLabSection = ({ patientId = 1 }) => {
  const [showUpload, setShowUpload] = useState(false);
  const patientReports = LAB_REPORTS.filter(r => r.patientId === patientId);
  const reviewedReports = patientReports.filter(r => r.reviewStatus === "reviewed");
  const reviewedBiomarkers = BIOMARKER_RESULTS.filter(b => b.patientId === patientId && b.visibleToPatient);
  const patTrendKeys = ["hba1c","vitd","ldl"];

  const categories = [
    { name:"Metabolic", markers:["Glucose","HbA1c"], icon:"M" },
    { name:"Lipids", markers:["LDL-C","HDL-C","Triglycerides"], icon:"L" },
    { name:"Hormones", markers:["Testosterone"], icon:"H" },
    { name:"Inflammation", markers:["hs-CRP"], icon:"I" },
    { name:"Micronutrients", markers:["Vitamin D"], icon:"N" },
    { name:"Thyroid", markers:["TSH"], icon:"T" },
  ];

  return (
    <div>
      {showUpload && <LabUploadModal onClose={()=>setShowUpload(false)} isProvider={false}/>}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{fontWeight:750,fontSize:16,color:"#061A44"}}>Labs & Biomarkers</div>
        <button className="btn btn-primary btn-sm" onClick={()=>setShowUpload(true)}>Upload Lab Report</button>
      </div>

      {/* Upload history */}
      {patientReports.length > 0 && (
        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".06em",marginBottom:10}}>Your Uploads</div>
          {patientReports.map(r=>{
            const st = reviewStatusStyle(r.reviewStatus);
            return (
              <div key={r.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"#F5FAFD",border:"1px solid #E8EFF6",borderRadius:12,marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:11}}>
                  <div style={{width:34,height:34,borderRadius:9,background:"#EEF7FC",border:"1px solid #E8EFF6",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Ic n="protocol" s={16} c="#00AEEA"/>
                  </div>
                  <div>
                    <div style={{fontSize:13.5,fontWeight:650,color:"#061A44"}}>{r.fileName}</div>
                    <div style={{fontSize:12,color:"#4A5B78"}}>{r.labType} · Lab date: {r.labDate} · Uploaded {r.uploadDate}</div>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
                  <span style={{padding:"2px 9px",background:st.bg,border:`1px solid ${st.border}`,borderRadius:20,fontSize:11.5,fontWeight:700,color:st.color}}>{st.label}</span>
                  <button className="btn btn-secondary btn-sm">View Report</button>
                  <button className="btn btn-ghost btn-sm" onClick={()=>triggerModal("askProvider")}>Ask Provider</button>
                </div>
              </div>
            );
          })}
          {patientReports.some(r=>r.reviewStatus==="pending") && (
            <div style={{padding:"10px 14px",background:"#EEF7FC",border:"1px solid #E8EFF6",borderRadius:10,fontSize:12.5,color:"#4A5B78",lineHeight:1.6,marginBottom:12}}>
              Your lab report has been uploaded and is waiting for provider review. Once reviewed, approved biomarker trends and provider notes may appear in your Progress section.
            </div>
          )}
        </div>
      )}

      {/* Reviewed category cards */}
      {reviewedBiomarkers.length > 0 && (
        <>
          <div style={{fontSize:12,fontWeight:700,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".06em",marginBottom:10}}>Reviewed Biomarker Categories</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
            {categories.map(cat=>{
              const catMarkers = reviewedBiomarkers.filter(b=>cat.markers.includes(b.name));
              if (!catMarkers.length) return null;
              return (
                <div key={cat.name} style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:14,padding:14,boxShadow:"0 1px 8px rgba(0,174,234,.04)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                    <div style={{width:32,height:32,borderRadius:9,background:"#EEF7FC",border:"1px solid #E8EFF6",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,color:"#00AEEA"}}>{cat.icon}</div>
                    <div style={{fontWeight:700,fontSize:13.5,color:"#061A44"}}>{cat.name}</div>
                  </div>
                  {catMarkers.map(b=>{
                    const st = labStatusStyle(b.status);
                    return (
                      <div key={b.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:"1px solid #EEF7FC"}}>
                        <div>
                          <div style={{fontSize:12.5,fontWeight:600,color:"#061A44"}}>{b.name}</div>
                          <div style={{fontSize:12,color:"#4A5B78"}}>{b.value} {b.unit}</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <span style={{padding:"1px 7px",background:st.bg,border:`1px solid ${st.border}`,borderRadius:20,fontSize:10.5,fontWeight:700,color:st.color,display:"block",marginBottom:2}}>{b.status}</span>
                          <span style={{fontSize:11,color:b.trend==="Improving"?"#16A34A":"#4A5B78"}}>{b.trend}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div style={{marginTop:6,display:"flex",alignItems:"center",gap:5}}>
                    <Ic n="check" s={10} c="#16A34A"/>
                    <span style={{fontSize:10.5,color:"#16A34A",fontWeight:650}}>Reviewed by Provider</span>
                  </div>
                </div>
              );
            }).filter(Boolean)}
          </div>

          {/* Simplified trend charts */}
          <div style={{fontSize:12,fontWeight:700,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".06em",marginBottom:10}}>Biomarker Trends</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:8}}>
            {patTrendKeys.map(k=>{
              const t = BIOMARKER_TRENDS[k];
              if (!t) return null;
              const last = t.points[t.points.length-1];
              const isGoodDown = k === "ldl" || k === "crp" || k === "hba1c";
              const prev = t.points[t.points.length-2];
              const improving = isGoodDown ? last.v <= prev.v : last.v >= prev.v;
              return (
                <div key={k} style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:14,padding:"14px 16px",boxShadow:"0 1px 8px rgba(0,174,234,.04)"}}>
                  <div style={{fontWeight:700,fontSize:13.5,color:"#061A44",marginBottom:3}}>{t.name}</div>
                  <div style={{fontSize:22,fontWeight:800,color:"#061A44",letterSpacing:"-.5px",lineHeight:1,marginBottom:2}}>{last.v}<span style={{fontSize:12,fontWeight:500,color:"#9BA8BE",marginLeft:3}}>{t.unit}</span></div>
                  <div style={{fontSize:12,fontWeight:650,color:improving?"#16A34A":"#D97706",marginBottom:8}}>{improving?"Improving":"Monitoring"}</div>
                  <TrendSparkline points={t.points} color={improving?"#16A34A":"#D97706"} height={38}/>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
                    {t.points.map(p=><span key={p.label} style={{fontSize:10,color:"#9BA8BE"}}>{p.label}</span>)}
                  </div>
                  <div style={{marginTop:8,display:"flex",alignItems:"center",gap:5}}>
                    <Ic n="check" s={10} c="#16A34A"/>
                    <span style={{fontSize:10.5,color:"#16A34A",fontWeight:650}}>Reviewed by Provider</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{fontSize:11.5,color:"#9BA8BE",lineHeight:1.5,padding:"8px 0"}}>
            Biomarker trends are for educational awareness only. This is not diagnostic and does not replace provider judgment or clinical interpretation.
          </div>
        </>
      )}
    </div>
  );
};

// ── CONNECTED HEALTH METRICS (Coming Soon) ─────────────────────────────
const ConnectedHealthMetrics = ({ compact = false }) => (
  <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:compact?16:20,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:compact?10:14}}>
      <div style={{fontWeight:700,fontSize:compact?14:16,color:"#061A44"}}>Connected Health Metrics</div>
      <span style={{padding:"2px 10px",background:"#EEF7FC",border:"1px solid #E8EFF6",borderRadius:20,fontSize:11,fontWeight:700,color:"#00AEEA"}}>Coming Soon</span>
    </div>
    {!compact && <p style={{fontSize:13,color:"#4A5B78",lineHeight:1.6,marginBottom:14}}>Sync wearable and health app data to support your wellness tracking. Requires patient permission.</p>}
    <div style={{display:"grid",gridTemplateColumns:compact?"repeat(5,1fr)":"repeat(5,1fr)",gap:compact?8:10}}>
      {[{name:"Apple Health",icon:"progress"},{name:"WHOOP",icon:"today"},{name:"Oura",icon:"today"},{name:"Garmin",icon:"progress"},{name:"Fitbit",icon:"progress"}].map(d=>(
        <div key={d.name} style={{textAlign:"center",padding:compact?"8px 4px":"10px 6px",background:"#F5FAFD",borderRadius:10,border:"1px solid #EEF7FC"}}>
          <div style={{width:28,height:28,borderRadius:8,background:"#EEF7FC",border:"1px solid #E8EFF6",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px"}}><Ic n={d.icon} s={13} c="#9BA8BE"/></div>
          <div style={{fontSize:11,fontWeight:650,color:"#4A5B78",lineHeight:1.3}}>{d.name}</div>
          <div style={{fontSize:10,color:"#9BA8BE",marginTop:2,fontWeight:600}}>Coming Soon</div>
        </div>
      ))}
    </div>
    {!compact && (
      <div style={{marginTop:12,display:"flex",flexWrap:"wrap",gap:6}}>
        {["Sleep Stages","HRV","Resting Heart Rate","Recovery Score","Steps","Active Minutes"].map(m=>(
          <span key={m} style={{padding:"2px 9px",background:"#F5FAFD",border:"1px solid #EEF7FC",borderRadius:20,fontSize:11.5,color:"#9BA8BE"}}>{m}</span>
        ))}
      </div>
    )}
  </div>
);

export { labStatusStyle, reviewStatusStyle, TrendSparkline, LabUploadModal, ProviderLabSection, PatLabSection, ConnectedHealthMetrics };