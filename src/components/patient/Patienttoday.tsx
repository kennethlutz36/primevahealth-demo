// ── PatientToday ──────────────────────────────────────────
import React, { useState } from 'react';
import { C } from '../../styles/tokens';
import { Ic, Ring } from '../shared/primitives';
import { triggerModal } from '../../hooks/useModal';
import { PATIENTS, riskBadge } from '../../data/mockPatients';
import { PAT_RESOURCES } from '../../data/mockSourcing';
import { PatLabSection, ConnectedHealthMetrics } from '../labs';
// Note: meal/supplement state is self-contained; move to usePatientLogs hook if needed


const PatToday = () => {
  const [saved, setSaved] = useState(false);
  const [mood, setMood] = useState(7);
  const [energy, setEnergy] = useState(7);
  const [stress, setStress] = useState(4);

  // Meals state
  const [meals, setMeals] = useState([{ name:"Chicken Rice Bowl", type:"Lunch", protein:45, cal:520, carbs:55, fat:12, notes:"" }]);
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [showCustomMeal, setShowCustomMeal] = useState(false);
  const [customMeal, setCustomMeal] = useState({ name:"", type:"Breakfast", protein:"", cal:"", carbs:"", fat:"", notes:"", saveAsFav:false });
  const upMeal = (k,v) => setCustomMeal(m=>({...m,[k]:v}));

  // Supplements state
  const [supps, setSupps] = useState([
    { name:"Protein Powder", dose:"30g", time:"Morning", done:true, skipped:false, skipReason:"", notes:"" },
    { name:"Omega-3", dose:"2 caps", time:"Morning", done:false, skipped:false, skipReason:"", notes:"" },
    { name:"Vitamin D3", dose:"5000 IU", time:"Morning", done:false, skipped:false, skipReason:"", notes:"" },
  ]);
  const [showSuppPicker, setShowSuppPicker] = useState(false);
  const [showCustomSupp, setShowCustomSupp] = useState(false);
  const [customSupp, setCustomSupp] = useState({ name:"", dose:"", time:"Morning", done:true, skipped:false, skipReason:"", notes:"", saveToStack:false });
  const upSupp = (k,v) => setCustomSupp(s=>({...s,[k]:v}));

  const FAV_MEALS = [
    { name:"High-Protein Breakfast Bowl", protein:42, cal:480, carbs:38, fat:14 },
    { name:"Greek Yogurt + Berries", protein:18, cal:220, carbs:28, fat:4 },
    { name:"Chicken Rice Bowl", protein:45, cal:520, carbs:55, fat:12 },
    { name:"Protein Smoothie", protein:35, cal:340, carbs:40, fat:8 },
    { name:"Salmon Sweet Potato Plate", protein:42, cal:490, carbs:42, fat:16 },
    { name:"Egg & Avocado Toast", protein:22, cal:410, carbs:32, fat:20 },
  ];
  const FAV_SUPPS = ["Magnesium","Creatine","Omega-3","Vitamin D3","Electrolytes","Protein Powder","Multivitamin"];
  const MEAL_TYPES = ["Breakfast","Lunch","Dinner","Snack","Pre-Workout","Post-Workout"];
  const TIMES = ["Morning","Mid-Morning","Afternoon","Evening","Bedtime"];

  const totalProtein = meals.reduce((a,m) => a + (Number(m.protein)||0), 0);
  const proteinGoal = 140;
  const actionsDone = [true, true, false, false, false].filter(Boolean).length;

  const addFavMeal = (m) => {
    setMeals(ms => [...ms, { ...m, type:"Meal", notes:"" }]);
    setShowMealPicker(false);
  };
  const addCustomMealFn = () => {
    if (!customMeal.name.trim()) return;
    setMeals(ms => [...ms, { name:customMeal.name, type:customMeal.type, protein:Number(customMeal.protein)||0, cal:Number(customMeal.cal)||0, carbs:Number(customMeal.carbs)||0, fat:Number(customMeal.fat)||0, notes:customMeal.notes }]);
    setCustomMeal({ name:"", type:"Breakfast", protein:"", cal:"", carbs:"", fat:"", notes:"", saveAsFav:false });
    setShowCustomMeal(false);
  };
  const toggleSupp = (i) => setSupps(ss => ss.map((s,j) => j===i ? {...s, done:!s.done, skipped:false} : s));
  const skipSupp = (i, reason) => setSupps(ss => ss.map((s,j) => j===i ? {...s, skipped:true, done:false, skipReason:reason} : s));
  const addFavSupp = (name) => {
    setSupps(ss => [...ss, { name, dose:"Standard dose", time:"Morning", done:false, skipped:false, skipReason:"", notes:"" }]);
    setShowSuppPicker(false);
  };
  const addCustomSuppFn = () => {
    if (!customSupp.name.trim()) return;
    setSupps(ss => [...ss, { ...customSupp }]);
    setCustomSupp({ name:"", dose:"", time:"Morning", done:true, skipped:false, skipReason:"", notes:"", saveToStack:false });
    setShowCustomSupp(false);
  };

  return (
    <div style={{padding:"28px 32px"}} className="fade">
      <div className="page-header-row" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
        <div>
          <div className="page-title">Today</div>
          <div className="page-subtitle">Tuesday, May 27 · Daily action hub</div>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={()=>triggerModal("askProvider")}>Ask Provider</button>
      </div>

      {saved && <div style={{padding:"10px 16px",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:10,marginBottom:16,display:"flex",alignItems:"center",gap:10,fontSize:13,fontWeight:650,color:"#16A34A"}}><Ic n="check" s={15} c="#16A34A"/>Today's log saved successfully. Great consistency!</div>}

      {/* Quick Actions Row */}
      <div className="quick-actions-row" style={{display:"flex",gap:8,marginBottom:22,padding:"12px 16px",background:"#FFFFFF",borderRadius:14,border:"1px solid #E8EFF6",boxShadow:"0 1px 6px rgba(6,26,68,.04)"}}>
        <span style={{fontSize:12,fontWeight:700,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".06em",alignSelf:"center",marginRight:4}}>Quick:</span>
        {[
          {label:"Add Meal", icon:"today", action:()=>setShowMealPicker(true), primary:true},
          {label:"Add Supplement", icon:"edu", action:()=>setShowSuppPicker(true), primary:true},
          {label:"Ask Provider", icon:"bell", action:()=>triggerModal("askProvider"), primary:false},
          {label:"Save Log", icon:"check", action:()=>setSaved(true), primary:false},
        ].map(a=>(
          <button key={a.label} className={`btn btn-sm ${a.primary?"btn-primary":"btn-secondary"}`}
            style={{gap:6}}
            onClick={a.action}>
            <Ic n={a.icon} s={12} c={a.primary?"#fff":"#00AEEA"}/>{a.label}
          </button>
        ))}
      </div>

      {/* 1. PrimevaAI Daily Overview */}
      <div style={{background:"linear-gradient(135deg,#EEF7FC,#F5FAFD)",border:"1px solid #E8EFF6",borderRadius:22,padding:20,marginBottom:18,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:12}}>
          <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#061A44,#00AEEA)",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="spark" s={13} c="#fff"/></div>
          <div style={{fontWeight:750,fontSize:15,color:"#061A44"}}>Today's Focus</div>
        </div>
        <p style={{fontSize:13.5,color:"#111111",lineHeight:1.7,marginBottom:14}}>Hit your protein goal of 140g, complete your supplement stack, log your workout, and finish your evening sleep routine. You have {5 - actionsDone} actions remaining today.</p>
        <div className="today-ai-stats" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
          {[[`${5 - actionsDone}`, "Actions Left"],["86g","Protein Logged"],["6 days","Streak"],["Week 11","Protocol"]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center",padding:"9px",background:"#FFFFFF",borderRadius:9,border:"1px solid #E8EFF6"}}>
              <div style={{fontWeight:800,fontSize:17,color:"#061A44",letterSpacing:"-.5px",lineHeight:1}}>{n}</div>
              <div style={{fontSize:10.5,color:"#9BA8BE",fontWeight:600,marginTop:3,textTransform:"uppercase",letterSpacing:".04em"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Today's Protocol */}
      <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderTop:"3px solid #00AEEA",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 16px rgba(0,174,234,.07)"}}>
        <div className="today-protocol-header" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <div style={{fontSize:17,fontWeight:750,color:"#061A44"}}>Today's Protocol</div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:12.5,fontWeight:650,color:"#00AEEA"}}>Metabolic Reset · Week 11</span>
            <span style={{fontSize:13,fontWeight:650,color:actionsDone===5?"#16A34A":"#00AEEA"}}>{actionsDone}/5 done</span>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,fontSize:12}}>
          <span style={{color:"#4A5B78"}}>Daily progress</span>
          <span style={{fontWeight:700,color:"#061A44"}}>{Math.round((actionsDone/5)*100)}%</span>
        </div>
        <div className="progress-bar" style={{marginBottom:18}}><div className="progress-fill" style={{width:`${(actionsDone/5)*100}%`}}/></div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[
            {label:"Hit 140g protein target", detail:"Daily nutrition goal", why:"Protein supports muscle, appetite regulation, and metabolic rate.", done:true},
            {label:"Complete morning supplement stack", detail:"Protein Powder, Omega-3, Vitamin D3", why:"Consistent supplement timing improves adherence and effectiveness.", done:true},
            {label:"Log 30-minute walk or workout", detail:"Movement goal", why:"Movement — even a walk — supports body composition and energy.", done:false},
            {label:"Drink 90 oz water", detail:"Hydration goal", why:"Hydration supports metabolism, digestion, and daily energy.", done:false},
            {label:"Complete Sleep Routine Foundations", detail:"Education module · 7 min", why:"Understanding sleep habits builds protocol consistency.", done:false},
          ].map((a,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"13px 15px",background:a.done?"#F0FDF4":"#F5FAFD",border:`1px solid ${a.done?"#BBF7D0":"#D8EAF3"}`,borderRadius:13}}>
              <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${a.done?"#16A34A":"#D8EAF3"}`,background:a.done?"#16A34A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                {a.done && <Ic n="check" s={10} c="#fff"/>}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:650,color:a.done?"#9BA8BE":"#061A44",textDecoration:a.done?"line-through":"none",marginBottom:2}}>{a.label}</div>
                <div style={{fontSize:12,color:"#9BA8BE",marginBottom:4}}>{a.detail}</div>
                <div style={{fontSize:12,color:"#4A5B78",fontStyle:"italic",lineHeight:1.5}}>Why it matters: {a.why}</div>
              </div>
              {!a.done && <button style={{background:"transparent",border:"none",cursor:"pointer",fontSize:12,color:"#00AEEA",fontWeight:600,flexShrink:0,fontFamily:"inherit",whiteSpace:"nowrap"}} onClick={()=>triggerModal("askProvider")}>Ask Provider</button>}
              {a.done && <span className="badge badge-green" style={{flexShrink:0,fontSize:10}}>Done</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Daily Check-In */}
      <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
        <div style={{fontSize:17,fontWeight:750,color:"#061A44",marginBottom:16}}>Daily Check-In</div>
        {[["Mood",mood,setMood],["Energy",energy,setEnergy],["Stress",stress,setStress]].map(([l,v,set])=>(
          <div key={l} style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><span style={{fontSize:13.5,fontWeight:600,color:"#061A44"}}>{l}</span><span style={{fontWeight:750,color:"#00AEEA",fontSize:15}}>{v}/10</span></div>
            <input type="range" min="1" max="10" value={v} onChange={e=>set(+e.target.value)} style={{width:"100%",accentColor:"#00AEEA"}}/>
          </div>
        ))}
        <div className="form-group" style={{marginTop:4}}>
          <label className="form-label">Notes for Today</label>
          <textarea className="form-input" rows={2} placeholder="How are you feeling today? Any wins, challenges, or questions?" style={{resize:"none"}}/>
        </div>
      </div>

      {/* 4. Nutrition Log */}
      <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{fontSize:17,fontWeight:750,color:"#061A44"}}>Nutrition Log</div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontWeight:750,fontSize:13,color:totalProtein>=proteinGoal?"#16A34A":"#00AEEA"}}>{totalProtein}g / {proteinGoal}g protein</span>
          </div>
        </div>
        <div className="progress-bar" style={{marginBottom:16}}>
          <div className="progress-fill" style={{width:`${Math.min(100,(totalProtein/proteinGoal)*100)}%`,background:totalProtein>=proteinGoal?"linear-gradient(90deg,#3ED1C2,#16A34A)":undefined}}/>
        </div>

        {/* Logged meals */}
        {meals.map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:"#F5FAFD",border:"1px solid #E8EFF6",borderRadius:11,marginBottom:8}}>
            <div>
              <div style={{fontSize:13.5,fontWeight:650,color:"#061A44"}}>{m.name}</div>
              <div style={{fontSize:12,color:"#4A5B78",marginTop:2}}>
                {m.type} · {m.protein}g protein · {m.cal} kcal
                {m.carbs ? ` · ${m.carbs}g carbs` : ""}
                {m.fat ? ` · ${m.fat}g fat` : ""}
              </div>
            </div>
            <button style={{background:"transparent",border:"none",cursor:"pointer",color:"#D8EAF3",fontSize:20,lineHeight:1,padding:"0 4px"}} onClick={()=>setMeals(ms=>ms.filter((_,j)=>j!==i))}>×</button>
          </div>
        ))}

        {/* Favorite meal picker */}
        {showMealPicker && (
          <div style={{background:"#F5FAFD",borderRadius:14,padding:16,border:"1px solid #E8EFF6",marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:13.5,color:"#061A44",marginBottom:12}}>Select a Saved Meal</div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {FAV_MEALS.map(m=>(
                <div key={m.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 12px",background:"#FFFFFF",borderRadius:9,border:"1px solid #E8EFF6",cursor:"pointer",transition:"all .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#00AEEA"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="#D8EAF3"}
                  onClick={()=>addFavMeal(m)}>
                  <div>
                    <div style={{fontSize:13.5,fontWeight:600,color:"#061A44"}}>{m.name}</div>
                    <div style={{fontSize:12,color:"#9BA8BE"}}>{m.protein}g protein · {m.cal} kcal</div>
                  </div>
                  <span style={{fontSize:12,color:"#00AEEA",fontWeight:650}}>+ Add</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <button className="btn btn-ghost btn-sm" style={{color:"#00AEEA",fontWeight:600}} onClick={()=>{setShowMealPicker(false);setShowCustomMeal(true);}}>Free-write instead →</button>
              <button className="btn btn-ghost btn-sm" onClick={()=>setShowMealPicker(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Custom meal form */}
        {showCustomMeal && (
          <div style={{background:"#F5FAFD",borderRadius:14,padding:16,border:"1px solid #E8EFF6",marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:13.5,color:"#061A44",marginBottom:12}}>Add Custom Meal</div>
            <div className="form-group" style={{marginBottom:10}}>
              <label className="form-label">Meal Description</label>
              <input className="form-input" placeholder="e.g. Grilled chicken with sweet potato and greens" value={customMeal.name} onChange={e=>upMeal("name",e.target.value)}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div className="form-group">
                <label className="form-label">Meal Type</label>
                <select className="form-input" value={customMeal.type} onChange={e=>upMeal("type",e.target.value)}>
                  {MEAL_TYPES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Protein (g)</label>
                <input className="form-input" type="number" placeholder="0" value={customMeal.protein} onChange={e=>upMeal("protein",e.target.value)}/>
              </div>
              <div className="form-group">
                <label className="form-label">Calories</label>
                <input className="form-input" type="number" placeholder="0" value={customMeal.cal} onChange={e=>upMeal("cal",e.target.value)}/>
              </div>
              <div className="form-group">
                <label className="form-label">Carbs (g) — optional</label>
                <input className="form-input" type="number" placeholder="0" value={customMeal.carbs} onChange={e=>upMeal("carbs",e.target.value)}/>
              </div>
              <div className="form-group">
                <label className="form-label">Fat (g) — optional</label>
                <input className="form-input" type="number" placeholder="0" value={customMeal.fat} onChange={e=>upMeal("fat",e.target.value)}/>
              </div>
            </div>
            <div className="form-group" style={{marginBottom:10}}>
              <label className="form-label">Notes (optional)</label>
              <input className="form-input" placeholder="Any notes about this meal..." value={customMeal.notes} onChange={e=>upMeal("notes",e.target.value)}/>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <input type="checkbox" id="saveFav" checked={customMeal.saveAsFav} onChange={e=>upMeal("saveAsFav",e.target.checked)} style={{accentColor:"#00AEEA",width:15,height:15}}/>
              <label htmlFor="saveFav" style={{fontSize:13,color:"#4A5B78",cursor:"pointer"}}>Save as favorite meal</label>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button className="btn btn-primary btn-sm" onClick={addCustomMealFn}>Add Meal</button>
              <button className="btn btn-ghost btn-sm" onClick={()=>{setShowCustomMeal(false);setShowMealPicker(true);}}>Choose saved instead</button>
              <button className="btn btn-ghost btn-sm" onClick={()=>setShowCustomMeal(false)}>Cancel</button>
            </div>
          </div>
        )}

        {!showMealPicker && !showCustomMeal && (
          <div className="dual-picker-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
            <button onClick={()=>setShowMealPicker(true)}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"14px 12px",background:"#EEF7FC",border:"2px solid #D8EAF3",borderRadius:14,cursor:"pointer",transition:"all .18s",fontFamily:"inherit"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#00AEEA";e.currentTarget.style.background="#E0F2FD";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#D8EAF3";e.currentTarget.style.background="#EEF7FC";}}>
              <Ic n="today" s={20} c="#00AEEA"/>
              <div style={{fontWeight:700,fontSize:13.5,color:"#061A44"}}>Choose Saved Meal</div>
              <div style={{fontSize:12,color:"#4A5B78",textAlign:"center",lineHeight:1.4}}>Pick from your favorite meals</div>
            </button>
            <button onClick={()=>setShowCustomMeal(true)}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"14px 12px",background:"#FFFFFF",border:"2px solid #D8EAF3",borderRadius:14,cursor:"pointer",transition:"all .18s",fontFamily:"inherit"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#00AEEA";e.currentTarget.style.boxShadow="0 2px 10px rgba(0,174,234,.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#D8EAF3";e.currentTarget.style.boxShadow="none";}}>
              <Ic n="plus" s={20} c="#061A44"/>
              <div style={{fontWeight:700,fontSize:13.5,color:"#061A44"}}>Add Custom Meal</div>
              <div style={{fontSize:12,color:"#4A5B78",textAlign:"center",lineHeight:1.4}}>Free-write any meal or food</div>
            </button>
          </div>
        )}
      </div>

      {/* 5. Supplement Log */}
      <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
        <div style={{fontSize:17,fontWeight:750,color:"#061A44",marginBottom:14}}>Supplement Log</div>
        <div style={{fontSize:12,fontWeight:700,color:"#9BA8BE",textTransform:"uppercase",letterSpacing:".06em",marginBottom:10}}>Today's Stack</div>

        {supps.map((s,i)=>(
          <div key={i} style={{padding:"12px 14px",background:s.done?"#F0FDF4":s.skipped?"#FFFBEB":"#F5FAFD",border:`1px solid ${s.done?"#BBF7D0":s.skipped?"#FDE68A":"#D8EAF3"}`,borderRadius:12,marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${s.done?"#16A34A":s.skipped?"#D97706":"#D8EAF3"}`,background:s.done?"#16A34A":s.skipped?"#FFFBEB":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all .18s"}}
                  onClick={()=>!s.skipped && toggleSupp(i)}>
                  {s.done && <Ic n="check" s={10} c="#fff"/>}
                </div>
                <div>
                  <div style={{fontSize:13.5,fontWeight:650,color:s.done?"#9BA8BE":"#061A44",textDecoration:s.done?"line-through":"none"}}>{s.name}</div>
                  <div style={{fontSize:12,color:"#9BA8BE"}}>{s.dose} · {s.time}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                {s.skipped
                  ? <span className="badge badge-amber" style={{fontSize:10}}>Skipped</span>
                  : s.done
                    ? <span className="badge badge-green" style={{fontSize:10}}>Taken</span>
                    : <>
                        <button className="btn btn-primary btn-sm" style={{fontSize:11}} onClick={()=>toggleSupp(i)}>Mark Taken</button>
                        <button className="btn btn-ghost btn-sm" style={{fontSize:11}} onClick={()=>skipSupp(i,"Forgot")}>Skip</button>
                      </>
                }
              </div>
            </div>
            {s.skipped && (
              <div style={{marginTop:8}}>
                <select className="form-input" style={{fontSize:12,padding:"5px 10px"}} defaultValue={s.skipReason} onChange={e=>setSupps(ss=>ss.map((x,j)=>j===i?{...x,skipReason:e.target.value}:x))}>
                  <option value="Forgot">Forgot</option>
                  <option value="Side effect concern">Side effect concern</option>
                  <option value="Out of stock">Out of stock</option>
                  <option value="Intentional — ask provider">Intentional — ask provider</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}
          </div>
        ))}

        {/* Saved stack picker */}
        {showSuppPicker && (
          <div style={{background:"#F5FAFD",borderRadius:14,padding:16,border:"1px solid #E8EFF6",marginBottom:10}}>
            <div style={{fontWeight:700,fontSize:13.5,color:"#061A44",marginBottom:10}}>Add from Saved Stack</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:10}}>
              {FAV_SUPPS.filter(s=>!supps.find(x=>x.name===s)).map(s=>(
                <div key={s} style={{padding:"6px 13px",background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:20,cursor:"pointer",fontSize:13,color:"#00AEEA",fontWeight:600,transition:"all .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#00AEEA"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="#D8EAF3"}
                  onClick={()=>addFavSupp(s)}>+ {s}</div>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-ghost btn-sm" style={{color:"#00AEEA",fontWeight:600}} onClick={()=>{setShowSuppPicker(false);setShowCustomSupp(true);}}>Free-write instead →</button>
              <button className="btn btn-ghost btn-sm" onClick={()=>setShowSuppPicker(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Custom supplement form */}
        {showCustomSupp && (
          <div style={{background:"#F5FAFD",borderRadius:14,padding:16,border:"1px solid #E8EFF6",marginBottom:10}}>
            <div style={{fontWeight:700,fontSize:13.5,color:"#061A44",marginBottom:12}}>Add Custom Supplement</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div className="form-group">
                <label className="form-label">Supplement Name</label>
                <input className="form-input" placeholder="e.g. Berberine, NAC..." value={customSupp.name} onChange={e=>upSupp("name",e.target.value)}/>
              </div>
              <div className="form-group">
                <label className="form-label">Dosage</label>
                <input className="form-input" placeholder="e.g. 500mg, 2 caps..." value={customSupp.dose} onChange={e=>upSupp("dose",e.target.value)}/>
              </div>
              <div className="form-group">
                <label className="form-label">Time Taken</label>
                <select className="form-input" value={customSupp.time} onChange={e=>upSupp("time",e.target.value)}>
                  {TIMES.map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-input" value={customSupp.skipped?"skipped":"taken"} onChange={e=>upSupp("skipped",e.target.value==="skipped")}>
                  <option value="taken">Taken</option>
                  <option value="skipped">Skipped</option>
                </select>
              </div>
            </div>
            {customSupp.skipped && (
              <div className="form-group" style={{marginBottom:10}}>
                <label className="form-label">Skip Reason</label>
                <select className="form-input" value={customSupp.skipReason} onChange={e=>upSupp("skipReason",e.target.value)}>
                  {["Forgot","Side effect concern","Out of stock","Intentional — ask provider","Other"].map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
            )}
            <div className="form-group" style={{marginBottom:10}}>
              <label className="form-label">Notes (optional)</label>
              <input className="form-input" placeholder="Any notes..." value={customSupp.notes} onChange={e=>upSupp("notes",e.target.value)}/>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <input type="checkbox" id="saveStack" checked={customSupp.saveToStack} onChange={e=>upSupp("saveToStack",e.target.checked)} style={{accentColor:"#00AEEA",width:15,height:15}}/>
              <label htmlFor="saveStack" style={{fontSize:13,color:"#4A5B78",cursor:"pointer"}}>Save to my supplement stack</label>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button className="btn btn-primary btn-sm" onClick={addCustomSuppFn}>Add Supplement</button>
              <button className="btn btn-ghost btn-sm" onClick={()=>{setShowCustomSupp(false);setShowSuppPicker(true);}}>Choose saved instead</button>
              <button className="btn btn-ghost btn-sm" onClick={()=>setShowCustomSupp(false)}>Cancel</button>
            </div>
          </div>
        )}

        {!showSuppPicker && !showCustomSupp && (
          <div className="dual-picker-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
            <button onClick={()=>setShowSuppPicker(true)}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"14px 12px",background:"#EEF7FC",border:"2px solid #D8EAF3",borderRadius:14,cursor:"pointer",transition:"all .18s",fontFamily:"inherit"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#00AEEA";e.currentTarget.style.background="#E0F2FD";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#D8EAF3";e.currentTarget.style.background="#EEF7FC";}}>
              <Ic n="edu" s={20} c="#00AEEA"/>
              <div style={{fontWeight:700,fontSize:13.5,color:"#061A44"}}>Choose From Stack</div>
              <div style={{fontSize:12,color:"#4A5B78",textAlign:"center",lineHeight:1.4}}>Pick from your saved supplements</div>
            </button>
            <button onClick={()=>setShowCustomSupp(true)}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"14px 12px",background:"#FFFFFF",border:"2px solid #D8EAF3",borderRadius:14,cursor:"pointer",transition:"all .18s",fontFamily:"inherit"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#00AEEA";e.currentTarget.style.boxShadow="0 2px 10px rgba(0,174,234,.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#D8EAF3";e.currentTarget.style.boxShadow="none";}}>
              <Ic n="plus" s={20} c="#061A44"/>
              <div style={{fontWeight:700,fontSize:13.5,color:"#061A44"}}>Add Custom Supplement</div>
              <div style={{fontSize:12,color:"#4A5B78",textAlign:"center",lineHeight:1.4}}>Free-write any supplement</div>
            </button>
          </div>
        )}
      </div>

      {/* 6. Workout Log */}
      <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
        <div style={{fontSize:17,fontWeight:750,color:"#061A44",marginBottom:14}}>Workout Log</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-input"><option>Resistance Training</option><option>Cardio</option><option>Yoga / Mobility</option><option>Walk</option><option>Active Recovery</option><option>Rest Day</option></select>
          </div>
          <div className="form-group">
            <label className="form-label">Duration (min)</label>
            <input className="form-input" defaultValue="45"/>
          </div>
          <div className="form-group">
            <label className="form-label">Intensity</label>
            <select className="form-input"><option>Moderate</option><option>High</option><option>Low</option></select>
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <input className="form-input" placeholder="e.g. Felt strong today, focused on legs"/>
          </div>
        </div>
      </div>

      {/* 7. Sleep & Recovery */}
      <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
        <div style={{fontSize:17,fontWeight:750,color:"#061A44",marginBottom:14}}>Sleep & Recovery</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[["Bedtime","10:30 PM"],["Wake Time","6:30 AM"],["Hours Slept","8h"],["Sleep Quality (1–10)","8"]].map(([l,v])=>(
            <div key={l} className="form-group"><label className="form-label">{l}</label><input className="form-input" defaultValue={v}/></div>
          ))}
        </div>
      </div>

      {/* 8. Hydration */}
      <div style={{background:"#FFFFFF",border:"1px solid #E8EFF6",borderRadius:22,padding:22,marginBottom:18,boxShadow:"0 2px 12px rgba(0,174,234,.05)"}}>
        <div style={{fontSize:17,fontWeight:750,color:"#061A44",marginBottom:14}}>Hydration</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div className="form-group"><label className="form-label">Water (oz)</label><input className="form-input" defaultValue="64"/></div>
          <div className="form-group"><label className="form-label">Water (L)</label><input className="form-input" defaultValue="1.9"/></div>
          <div className="form-group"><label className="form-label">Electrolytes</label><select className="form-input"><option>Yes</option><option>No</option></select></div>
          <div className="form-group"><label className="form-label">Notes</label><input className="form-input" placeholder="Any notes..."/></div>
        </div>
      </div>

      {/* 9. Save */}
      <div className="save-log-row" style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
        <button className="btn btn-primary" style={{padding:"11px 32px"}} onClick={()=>setSaved(true)}>Save Today's Log</button>
        <button className="btn btn-secondary">Save Draft</button>
        <button className="btn btn-ghost btn-sm" style={{marginLeft:"auto"}} onClick={()=>triggerModal("askProvider")}>Ask Provider</button>
      </div>
    </div>
  );
};

export default PatToday;