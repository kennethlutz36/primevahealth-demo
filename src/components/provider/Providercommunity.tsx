// ── ProviderCommunity ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring, Spark } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge, AI_REPLIES } from '../../data/mockPatients';
import { PROV_PARTNERS } from '../../data/mockSourcing';
import { ProviderLabSection } from '../labs';


const Community = ({ isProvider = true }) => {
  const [view, setView] = useState("feed");
  const [activePost, setActivePost] = useState(null);
  const [filter, setFilter] = useState("all");
  const [liked, setLiked] = useState({});
  const [newComment, setNewComment] = useState("");
  const [showCommented, setShowCommented] = useState({});
  const [composing, setComposing] = useState(false);
  const [draft, setDraft] = useState({ title:"", body:"", category:"", tags:"" });
  const [submitted, setSubmitted] = useState(false);

  const MOCK_POSTS = [
    { id:1, author:"Dr. Alex Morgan", role:"provider", avatar:"DM", title:"Why Sleep Timing Matters for Wellness Protocols", body:"One of the most underappreciated aspects of any optimization protocol is sleep timing. The body performs critical repair, hormone release, and metabolic regulation during specific sleep stages. When providers and patients prioritize sleep quality alongside their wellness protocols, outcomes improve dramatically. Avoid food, alcohol, and screens before bed to maximize recovery windows. This single habit change amplifies results across nearly every wellness category.", category:"Foundational Health", time:"2 hours ago", likes:47, commentList:[{ author:"Sarah M.", role:"patient", avatar:"SM", text:"This explains so much — I noticed better results when I improved my sleep schedule. Thank you!", time:"1h ago", likes:6 },{ author:"Dr. Patel", role:"provider", avatar:"DP", text:"Completely agree. Cortisol management at night is often the missing piece in metabolic and recovery protocols.", time:"30m ago", likes:9 }], tags:["Sleep","Recovery","Protocol Tips"], isPrimeva:false },
    { id:2, author:"Primeva Health", role:"primeva", avatar:"PH", title:"New Education Module: Understanding Sourcing Quality Standards", body:"We just published a new education module in the Education Hub covering how to evaluate sourcing quality, what third-party testing means, and why documentation standards matter for patient safety. Available now in Education Hub → Peptide Basics → Understanding COAs.", category:"Platform Update", time:"5 hours ago", likes:89, commentList:[{ author:"Dr. Chen", role:"provider", avatar:"DC", text:"This is exactly what I needed to share with my patients.", time:"4h ago", likes:14 }], tags:["Platform Update","Education","Quality"], isPrimeva:true },
    { id:3, author:"Sarah Mitchell", role:"patient", avatar:"SM", title:"6 Weeks on My Recovery Protocol — Here's What Changed", body:"I'm a runner who had been dealing with a nagging Achilles issue for almost a year. After working with my provider and starting a structured recovery protocol, I noticed real changes by week 4. By week 6, I'm back to easy jogs. I also did physical therapy, prioritized sleep, and increased my protein significantly. The combination of everything together has been genuinely life-changing.", category:"Recovery & Performance", time:"Yesterday", likes:134, commentList:[{ author:"Dr. Alex Morgan", role:"provider", avatar:"DM", text:"Sarah, this is exactly how the full protocol works — it's always the combination. Well done on staying consistent.", time:"20h ago", likes:22 }], tags:["Recovery","Protocols","Patient Story"], isPrimeva:false },
    { id:4, author:"Dr. Alex Morgan", role:"provider", avatar:"DM", title:"Protein Intake: The Most Underrated Part of Any Wellness Protocol", body:"I track this across my entire patient panel and the data is consistent — patients who hit 0.8–1g of protein per pound of bodyweight consistently outperform patients on identical protocols who don't. Tissue repair, body composition, metabolic health, recovery — all of it improves when protein is adequate. Before adding anything to a protocol, make sure protein is dialed in first.", category:"Nutrition", time:"2 days ago", likes:203, commentList:[{ author:"Lisa P.", role:"patient", avatar:"LP", text:"Since hitting 120g daily my recovery has completely changed.", time:"1d ago", likes:18 }], tags:["Nutrition","Protein","Protocol Tips"], isPrimeva:false },
  ];

  const roleColor = r => ({ provider:"#00AEEA", patient:"#3ED1C2", primeva:"#061A44" }[r] || "#4A5B78");
  const roleBg = r => ({ provider:"#EEF7FC", patient:"#F0FDF4", primeva:"rgba(6,26,68,.08)" }[r] || "#F5FAFD");
  const roleLabel = r => ({ provider:"Provider", patient:"Patient", primeva:"Primeva Health" }[r] || r);

  const filtered = filter === "all" ? MOCK_POSTS : MOCK_POSTS.filter(p => p.category === filter || p.tags.includes(filter));

  if (view === "detail" && activePost) {
    const p = activePost;
    return (
      <div style={{ padding:"28px 32px" }} className="fade">
        <button className="btn btn-ghost btn-sm" onClick={() => { setView("feed"); setActivePost(null); }} style={{ marginBottom:20 }}>← Community</button>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:20 }}>
          <div>
            <div className="card" style={{ marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:42, height:42, borderRadius:"50%", background:p.role==="primeva"?`linear-gradient(135deg,#061A44,#00AEEA)`:p.role==="provider"?`linear-gradient(135deg,#061A44,#081F4D)`:`linear-gradient(135deg,#00AEEA,#3ED1C2)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14, fontWeight:750, flexShrink:0 }}>{p.avatar}</div>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontWeight:750, fontSize:14, color:"#061A44" }}>{p.author}</span>
                    <span style={{ padding:"2px 8px", background:roleBg(p.role), color:roleColor(p.role), borderRadius:20, fontSize:10.5, fontWeight:700 }}>{roleLabel(p.role)}</span>
                    {p.isPrimeva && <span style={{ padding:"2px 8px", background:"linear-gradient(135deg,#00AEEA,#16C7E8)", color:"#fff", borderRadius:20, fontSize:10, fontWeight:700 }}>Verified</span>}
                  </div>
                  <div style={{ fontSize:12, color:"#4A5B78", marginTop:2 }}>{p.time} · {p.category}</div>
                </div>
              </div>
              <h2 style={{ fontWeight:800, fontSize:20, color:"#061A44", letterSpacing:"-.3px", marginBottom:14, lineHeight:1.4 }}>{p.title}</h2>
              <p style={{ fontSize:14, color:"#111111", lineHeight:1.8, marginBottom:16 }}>{p.body}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>{p.tags.map(t=><span key={t} style={{ padding:"3px 10px", background:"#F5FAFD", border:"1px solid #E8EFF6", borderRadius:20, fontSize:12, color:"#4A5B78" }}>#{t}</span>)}</div>
              <div style={{ display:"flex", gap:16, paddingTop:14, borderTop:"1px solid #EEF7FC" }}>
                <button onClick={() => setLiked(l=>({...l,[p.id]:!l[p.id]}))} style={{ display:"flex", alignItems:"center", gap:5, background:"transparent", border:"none", cursor:"pointer", fontSize:13.5, fontWeight:600, color:liked[p.id]?"#E05252":"#4A5B78" }}>{liked[p.id]?"❤️":"🤍"} {p.likes+(liked[p.id]?1:0)}</button>
                <button style={{ display:"flex", alignItems:"center", gap:5, background:"transparent", border:"none", cursor:"pointer", fontSize:13.5, color:"#4A5B78" }}>💬 {p.commentList.length}</button>
                <button style={{ display:"flex", alignItems:"center", gap:5, background:"transparent", border:"none", cursor:"pointer", fontSize:13.5, color:"#4A5B78" }}>↗ Share</button>
              </div>
            </div>
            <div style={{ fontSize:11, fontWeight:750, color:"#9BA8BE", letterSpacing:".08em", textTransform:"uppercase", marginBottom:12 }}>Comments</div>
            {p.commentList.map((c,i) => (
              <div key={i} className="card-sm" style={{ marginBottom:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:8 }}>
                  <div style={{ width:30, height:30, borderRadius:"50%", background:c.role==="provider"?`linear-gradient(135deg,#061A44,#081F4D)`:`linear-gradient(135deg,#00AEEA,#3ED1C2)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:11, fontWeight:750 }}>{c.avatar}</div>
                  <div><div style={{ display:"flex", alignItems:"center", gap:6 }}><span style={{ fontWeight:700, fontSize:13, color:"#061A44" }}>{c.author}</span><span style={{ padding:"1px 7px", background:roleBg(c.role), color:roleColor(c.role), borderRadius:20, fontSize:10, fontWeight:700 }}>{roleLabel(c.role)}</span></div><div style={{ fontSize:11, color:"#4A5B78" }}>{c.time}</div></div>
                </div>
                <p style={{ fontSize:13.5, color:"#111111", lineHeight:1.6 }}>{c.text}</p>
              </div>
            ))}
            <div className="card-sm">
              <textarea className="form-input" rows={3} placeholder="Share your thoughts..." style={{ resize:"none", marginBottom:10 }} value={newComment} onChange={e=>setNewComment(e.target.value)}/>
              <button className="btn btn-primary btn-sm" onClick={()=>{ setShowCommented(s=>({...s,[p.id]:true})); setNewComment(""); }}>Post Comment</button>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div className="card-sm" style={{ background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)", border:"1px solid #E8EFF6" }}>
              <div style={{ fontWeight:700, fontSize:13, color:"#061A44", marginBottom:8 }}>Community Guidelines</div>
              {["Educational and respectful only","No personal medical advice","Share experiences, not prescriptions","Primeva moderates all content"].map((g,i)=>(
                <div key={g} style={{ display:"flex", gap:8, padding:"5px 0", borderBottom:i<3?"1px solid #EEF7FC":"none" }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#00AEEA", flexShrink:0, marginTop:6 }}/>
                  <span style={{ fontSize:12, color:"#4A5B78" }}>{g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (composing) {
    return (
      <div style={{ padding:"28px 32px" }} className="fade">
        <button className="btn btn-ghost btn-sm" onClick={()=>{ setComposing(false); setSubmitted(false); }} style={{ marginBottom:20 }}>← Community</button>
        {submitted ? (
          <div className="card" style={{ textAlign:"center", padding:"48px 24px" }}>
            <div style={{ fontSize:36, marginBottom:14 }}>🎉</div>
            <div style={{ fontWeight:800, fontSize:20, color:"#061A44", marginBottom:8 }}>Post Published!</div>
            <p style={{ fontSize:14, color:"#4A5B78", marginBottom:20 }}>Your post is now visible to the Primeva community.</p>
            <button className="btn btn-primary" onClick={()=>{ setComposing(false); setSubmitted(false); setDraft({title:"",body:"",category:"",tags:""}); }}>Back to Community</button>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 260px", gap:20 }}>
            <div className="card">
              <div style={{ fontWeight:750, fontSize:16, color:"#061A44", marginBottom:18 }}>Write Your Post</div>
              <div className="form-group" style={{ marginBottom:14 }}><label className="form-label">Title</label><input className="form-input" placeholder="Give your post a clear, descriptive title..." value={draft.title} onChange={e=>setDraft(d=>({...d,title:e.target.value}))}/></div>
              <div className="form-group" style={{ marginBottom:14 }}><label className="form-label">Category</label><select className="form-input" value={draft.category} onChange={e=>setDraft(d=>({...d,category:e.target.value}))}><option value="">Select a category...</option>{["Recovery & Performance","Metabolic Health","Nutrition","Sleep","Fitness","Hormone Support","Longevity","Foundational Health","Patient Story","Protocol Tips","General"].map(c=><option key={c}>{c}</option>)}</select></div>
              <div className="form-group" style={{ marginBottom:14 }}><label className="form-label">Post</label><textarea className="form-input" rows={10} placeholder="Share your experience, insights, or educational content. Be specific and helpful. Avoid medical advice." value={draft.body} onChange={e=>setDraft(d=>({...d,body:e.target.value}))} style={{ resize:"vertical" }}/></div>
              <div className="form-group" style={{ marginBottom:18 }}><label className="form-label">Tags (comma-separated)</label><input className="form-input" placeholder="e.g. Recovery, Nutrition, Protocol Tips" value={draft.tags} onChange={e=>setDraft(d=>({...d,tags:e.target.value}))}/></div>
              <div style={{ padding:"10px 14px", background:"#EEF7FC", border:"1px solid #E8EFF6", borderRadius:9, fontSize:11.5, color:"#4A5B78", marginBottom:16, lineHeight:1.5 }}>Posts are visible to all Primeva community members. Do not include personal medical information or advice.</div>
              <div style={{ display:"flex", gap:10 }}><button className="btn btn-primary" onClick={()=>setSubmitted(true)} disabled={!draft.title||!draft.body}>Publish Post</button><button className="btn btn-secondary" onClick={()=>setComposing(false)}>Cancel</button></div>
            </div>
            <div className="card-sm">
              <div style={{ fontWeight:700, fontSize:13, color:"#061A44", marginBottom:10 }}>Writing Tips</div>
              {["Be specific about your experience","Share what worked and what didn't","Mention lifestyle factors alongside protocols","Don't give dosing advice to others","Tag your post for easy discovery"].map((t,i)=>(
                <div key={i} style={{ display:"flex", gap:8, padding:"5px 0", borderBottom:i<4?"1px solid #EEF7FC":"none" }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#00AEEA", flexShrink:0, marginTop:6 }}/><span style={{ fontSize:12, color:"#4A5B78" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding:"28px 32px" }} className="fade">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
        <div><div style={{ fontSize:22, fontWeight:800, color:"#061A44", letterSpacing:"-.5px" }}>Community</div><div style={{ fontSize:13, color:"#4A5B78", marginTop:3 }}>Insights, patient stories, wellness education, and optimization discussions</div></div>
        <button className="btn btn-primary" onClick={()=>setComposing(true)}><Ic n="plus" s={14} c="#fff"/> Write a Post</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 260px", gap:20 }}>
        <div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
            {["all","Foundational Health","Recovery & Performance","Metabolic Health","Nutrition","Patient Story","Platform Update"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{ padding:"5px 14px", borderRadius:20, border:`1px solid ${filter===f?"#00AEEA":"#D8EAF3"}`, background:filter===f?"#EEF7FC":"#FFFFFF", color:filter===f?"#00AEEA":"#4A5B78", fontSize:12.5, fontWeight:filter===f?700:500, cursor:"pointer", fontFamily:"inherit", transition:"all .15s" }}>
                {f==="all"?"All Posts":f}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {filtered.map(p => (
              <div key={p.id} style={{ background:"#FFFFFF", border:"1px solid #E8EFF6", borderRadius:18, padding:22, boxShadow:"0 2px 14px rgba(0,174,234,.05)", transition:"all .2s", cursor:"pointer" }}
                onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 6px 28px rgba(0,174,234,.1)"; e.currentTarget.style.borderColor="#B8D9F0"; e.currentTarget.style.transform="translateY(-1px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 2px 14px rgba(0,174,234,.05)"; e.currentTarget.style.borderColor="#D8EAF3"; e.currentTarget.style.transform="none"; }}
                onClick={()=>{ setActivePost(p); setView("detail"); }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <div style={{ width:38, height:38, borderRadius:"50%", background:p.role==="primeva"?`linear-gradient(135deg,#061A44,#00AEEA)`:p.role==="provider"?`linear-gradient(135deg,#061A44,#081F4D)`:`linear-gradient(135deg,#00AEEA,#3ED1C2)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:750, flexShrink:0 }}>{p.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
                      <span style={{ fontWeight:700, fontSize:13.5, color:"#061A44" }}>{p.author}</span>
                      <span style={{ padding:"2px 8px", background:roleBg(p.role), color:roleColor(p.role), borderRadius:20, fontSize:10.5, fontWeight:700 }}>{roleLabel(p.role)}</span>
                      {p.isPrimeva && <span style={{ padding:"2px 8px", background:"linear-gradient(135deg,#00AEEA,#16C7E8)", color:"#fff", borderRadius:20, fontSize:10, fontWeight:700 }}>Verified</span>}
                      <span style={{ padding:"2px 8px", background:"#F5FAFD", border:"1px solid #E8EFF6", borderRadius:20, fontSize:10.5, color:"#4A5B78" }}>{p.category}</span>
                    </div>
                    <div style={{ fontSize:11.5, color:"#4A5B78", marginTop:2 }}>{p.time}</div>
                  </div>
                </div>
                <div style={{ fontWeight:750, fontSize:15, color:"#061A44", marginBottom:8, letterSpacing:"-.2px", lineHeight:1.35 }}>{p.title}</div>
                <p style={{ fontSize:13.5, color:"#4A5B78", lineHeight:1.65, marginBottom:12 }}>{p.body.length>200?p.body.slice(0,200)+"...":p.body}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:14 }}>{p.tags.map(t=><span key={t} style={{ padding:"2px 8px", background:"#F5FAFD", border:"1px solid #E8EFF6", borderRadius:20, fontSize:11.5, color:"#4A5B78" }}>#{t}</span>)}</div>
                <div style={{ display:"flex", gap:16, paddingTop:12, borderTop:"1px solid #EEF7FC" }} onClick={e=>e.stopPropagation()}>
                  <button onClick={()=>setLiked(l=>({...l,[p.id]:!l[p.id]}))} style={{ display:"flex", alignItems:"center", gap:5, background:"transparent", border:"none", cursor:"pointer", fontSize:13, fontWeight:600, color:liked[p.id]?"#E05252":"#4A5B78" }}>{liked[p.id]?"❤️":"🤍"} {p.likes+(liked[p.id]?1:0)}</button>
                  <button onClick={()=>{ setActivePost(p); setView("detail"); }} style={{ display:"flex", alignItems:"center", gap:5, background:"transparent", border:"none", cursor:"pointer", fontSize:13, color:"#4A5B78" }}>💬 {p.commentList.length}</button>
                  <button style={{ display:"flex", alignItems:"center", gap:5, background:"transparent", border:"none", cursor:"pointer", fontSize:13, color:"#4A5B78" }}>↗ Share</button>
                  <button onClick={()=>{ setActivePost(p); setView("detail"); }} style={{ marginLeft:"auto", background:"transparent", border:"none", cursor:"pointer", fontSize:12.5, color:"#00AEEA", fontWeight:650 }}>Read more →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:"linear-gradient(135deg,#061A44,#081F4D)", borderRadius:14, padding:18 }}>
            <div style={{ fontWeight:750, fontSize:14, color:"#fff", marginBottom:7 }}>Share With the Community</div>
            <p style={{ fontSize:12.5, color:"rgba(255,255,255,.55)", lineHeight:1.55, marginBottom:14 }}>Share experiences, insights, and wellness education with providers and patients.</p>
            <button className="btn btn-primary btn-sm" style={{ width:"100%", justifyContent:"center" }} onClick={()=>setComposing(true)}>Write a Post</button>
          </div>
          <div className="card-sm">
            <div style={{ fontSize:11, fontWeight:750, color:"#9BA8BE", letterSpacing:".08em", textTransform:"uppercase", marginBottom:10 }}>Trending Tags</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {["#Recovery","#Nutrition","#Sleep","#Metabolic","#Protein","#Longevity","#PatientStory","#Protocols"].map(t=>(
                <span key={t} style={{ padding:"3px 10px", background:"#F5FAFD", border:"1px solid #E8EFF6", borderRadius:20, fontSize:12, color:"#061A44", cursor:"pointer" }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="card-sm">
            <div style={{ fontSize:11, fontWeight:750, color:"#9BA8BE", letterSpacing:".08em", textTransform:"uppercase", marginBottom:10 }}>Top Contributors</div>
            {[{name:"Dr. Alex Morgan",role:"provider",avatar:"DM",posts:24,likes:847},{name:"Sarah Mitchell",role:"patient",avatar:"SM",posts:12,likes:312},{name:"Primeva Health",role:"primeva",avatar:"PH",posts:18,likes:1240}].map((u,i)=>(
              <div key={u.name} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:i<2?"1px solid #EEF7FC":"none" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:u.role==="primeva"?`linear-gradient(135deg,#061A44,#00AEEA)`:u.role==="provider"?`linear-gradient(135deg,#061A44,#081F4D)`:`linear-gradient(135deg,#00AEEA,#3ED1C2)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:11, fontWeight:750 }}>{u.avatar}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:650, color:"#061A44" }}>{u.name}</div>
                  <div style={{ fontSize:11, color:"#4A5B78" }}>{u.posts} posts · {u.likes} likes</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card-sm">
            <div style={{ fontSize:11, fontWeight:750, color:"#9BA8BE", letterSpacing:".08em", textTransform:"uppercase", marginBottom:8 }}>Community Guidelines</div>
            {["Educational and respectful only","No personal medical advice","Share experiences, not prescriptions","No spam or promotional content"].map((g,i)=>(
              <div key={i} style={{ display:"flex", gap:8, padding:"4px 0" }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:"#D8EAF3", flexShrink:0, marginTop:6 }}/><span style={{ fontSize:11.5, color:"#4A5B78" }}>{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;