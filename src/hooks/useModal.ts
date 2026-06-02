// ── useModal hook ─────────────────────────────────────────────────────
// Replaces the global window.__primeva_modal event bus.
// Usage: const { openModal } = useModal();  openModal("askProvider");
// In App: const { modal, closeModal } = useModalState();

import { useState, useEffect, useCallback } from 'react';

export type ModalName = 'askProvider' | 'invite' | 'firstLogin' | 'assignResource';

// Global trigger (keeps backward compat with triggerModal() calls in components)
export const triggerModal = (name: ModalName) => {
  window.__primeva_modal = name;
  window.dispatchEvent(new Event('primeva_modal'));
};

// Extend window type
declare global {
  interface Window { __primeva_modal?: string; }
}

// Hook used in App to listen for modal events
export function useModalState() {
  const [modal, setModal] = useState<ModalName | null>(null);

  useEffect(() => {
    const handler = () => {
      const m = window.__primeva_modal as ModalName | undefined;
      if (m) setModal(m);
    };
    window.addEventListener('primeva_modal', handler);
    return () => window.removeEventListener('primeva_modal', handler);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    window.__primeva_modal = undefined;
  }, []);

  return { modal, closeModal };
}