// ── Primeva App ───────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import { C } from './styles/tokens';
import { Ic } from './components/shared/primitives';

// Layout
import { AIWidget, ProvSidebar, PatSidebar, Topbar } from './components/layout';

// Modals & overlays
import {
  AskProviderModal, AssignResourceModal,
  InvitePatientModal, PatFirstLogin, ProviderInbox,
} from './components/shared/modals';

// Provider pages
import Overview          from './components/provider/Provideroverview';
import Education         from './components/provider/ProviderEducationHub';
import Protocols         from './components/provider/Providerprotocols';
import Patients          from './components/provider/Providerpatients';
import PatientProfilePage from './components/provider/Providerpatientprofile';
import Sourcing          from './components/provider/Providersourcingguide';
import ClinicHandouts    from './components/provider/Providerclinichandouts';
import Community         from './components/provider/Providercommunity';
import StaffTraining     from './components/provider/Providerstafftraining';
import Reports           from './components/provider/Providerreports';
import Settings          from './components/provider/Providersettings';

// Patient pages
import PatHome      from './components/patient/Patienthome';
import PatToday     from './components/patient/Patienttoday';
import PatProtocol  from './components/patient/Patientmyprotocol';
import PatEducation from './components/patient/Patienteducation';
import PatProgress  from './components/patient/Patientprogress';
import PatSourcing  from './components/patient/Patientsourcing';
import PatQuestions from './components/patient/Patientquestions';
import PatProfile   from './components/patient/Patientprofile';

declare global { interface Window { __primeva_modal?: string; } }

// ── Mobile sidebar drawer ─────────────────────────────────────────────
function MobileSidebar({ isOpen, onClose, children }: {
  isOpen: boolean; onClose: () => void; children: React.ReactNode;
}) {
  return (
    <>
      <div className={`mobile-nav-overlay${isOpen ? ' open' : ''}`} onClick={onClose}/>
      <div className={`sidebar sidebar-drawer${isOpen ? ' open' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
        <button className="sidebar-close-btn" onClick={onClose} style={{ display: 'flex' }}>
          <Ic n="close" s={14} c={C.muted}/>
        </button>
        {children}
      </div>
    </>
  );
}

// ── Mode toggle ───────────────────────────────────────────────────────
function ModeToggle({ mode, setMode }: { mode: string; setMode: (m: 'provider'|'patient') => void }) {
  return (
    <div style={{
      position: 'fixed', top: 10, left: '50%', transform: 'translateX(-50%)',
      zIndex: 2000, background: '#FFFFFF', border: `1px solid ${C.border}`,
      borderRadius: 13, padding: '4px', display: 'flex', gap: 3,
      boxShadow: '0 2px 16px rgba(6,26,68,.1), 0 1px 4px rgba(6,26,68,.06)',
    }}>
      <button onClick={() => setMode('provider')} style={{
        padding: '7px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
        fontFamily: 'inherit', fontSize: 13, letterSpacing: '-.01em',
        fontWeight: mode === 'provider' ? 700 : 500,
        background: mode === 'provider' ? C.navy : 'transparent',
        color: mode === 'provider' ? '#fff' : C.muted, transition: 'all .15s',
      }}>Provider</button>
      <button onClick={() => setMode('patient')} style={{
        padding: '7px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
        fontFamily: 'inherit', fontSize: 13, letterSpacing: '-.01em',
        fontWeight: mode === 'patient' ? 700 : 500,
        background: mode === 'patient' ? C.cyan : 'transparent',
        color: mode === 'patient' ? '#fff' : C.muted, transition: 'all .15s',
      }}>Patient</button>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState<'provider'|'patient'>('provider');
  const [provPage, setProvPage] = useState('overview');
  const [patPage, setPatPage]   = useState('home');
  const [selPat, setSelPat]     = useState<any>(null);
  const [navOpen, setNavOpen]   = useState(false);

  const [showAskProvider,    setShowAskProvider]    = useState(false);
  const [showInvite,         setShowInvite]         = useState(false);
  const [showFirstLogin,     setShowFirstLogin]     = useState(false);
  const [showAssignResource, setShowAssignResource] = useState(false);

  // Modal event bus (backward compat with triggerModal() calls in child components)
  useEffect(() => {
    const handler = () => {
      const m = window.__primeva_modal;
      if (m === 'askProvider')    setShowAskProvider(true);
      if (m === 'invite')         setShowInvite(true);
      if (m === 'firstLogin')     setShowFirstLogin(true);
      if (m === 'assignResource') setShowAssignResource(true);
    };
    window.addEventListener('primeva_modal', handler);
    return () => window.removeEventListener('primeva_modal', handler);
  }, []);

  // Close nav on page change
  const goProvPage = useCallback((p: string) => { setProvPage(p); setNavOpen(false); }, []);
  const goPatPage  = useCallback((p: string) => { setPatPage(p);  setNavOpen(false); }, []);

  const renderProv = () => {
    switch (provPage) {
      case 'overview':        return <Overview setPage={goProvPage} />;
      case 'education':       return <Education />;
      case 'protocols':       return <Protocols />;
      case 'patients':        return <Patients setPage={goProvPage} setSelPat={setSelPat} />;
      case 'patient-profile': return <PatientProfilePage patient={selPat} setPage={goProvPage} />;
      case 'sourcing':        return <Sourcing />;
      case 'reports':         return <Reports />;
      case 'training':        return <StaffTraining />;
      case 'handouts':        return <ClinicHandouts />;
      case 'settings':        return <Settings />;
      case 'community':       return <Community isProvider={true} />;
      default:                return <Overview setPage={goProvPage} />;
    }
  };

  const renderPat = () => {
    switch (patPage) {
      case 'home':      return <PatHome setPage={goPatPage} />;
      case 'today':     return <PatToday />;
      case 'protocol':  return <PatProtocol />;
      case 'education': return <PatEducation />;
      case 'progress':  return <PatProgress />;
      case 'sourcing':  return <PatSourcing />;
      case 'questions': return <PatQuestions />;
      case 'community': return <Community isProvider={false} />;
      case 'profile':   return <PatProfile />;
      default:          return <PatHome setPage={goPatPage} />;
    }
  };

  const sidebar = mode === 'provider'
    ? <ProvSidebar page={provPage} setPage={goProvPage} />
    : <PatSidebar  page={patPage}  setPage={goPatPage}  />;

  return (
    <>
      <ModeToggle mode={mode} setMode={setMode} />

      {/* Mobile nav drawer */}
      <MobileSidebar isOpen={navOpen} onClose={() => setNavOpen(false)}>
        {sidebar}
      </MobileSidebar>

      {/* Main shell */}
      <div style={{ display: 'flex', height: '100vh', paddingTop: 48, background: C.bg }}>
        {/* Desktop sidebar (hidden on mobile via CSS) */}
        <div className="sidebar-desktop-only" style={{ display: "flex" }}>
          {sidebar}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', height: '100%', minWidth: 0 }}>
          <Topbar onMenuClick={() => setNavOpen(true)} />
          {mode === 'provider' ? renderProv() : renderPat()}
        </div>
      </div>

      {/* Floating widgets */}
      <AIWidget isProvider={mode === 'provider'} />
      <ProviderInbox isProvider={mode === 'provider'} />

      {/* Global modals */}
      {showAskProvider    && <AskProviderModal    onClose={() => setShowAskProvider(false)}    />}
      {showInvite         && <InvitePatientModal   onClose={() => setShowInvite(false)}         />}
      {showFirstLogin     && <PatFirstLogin        onClose={() => setShowFirstLogin(false)}     />}
      {showAssignResource && <AssignResourceModal  onClose={() => setShowAssignResource(false)} />}
    </>
  );
}
