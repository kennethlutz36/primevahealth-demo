// ── Primeva Primitive Components ─────────────────────────────────────
// Ic: icon renderer, Ring: circular progress, Spark: mini sparkline
import React from 'react';
import { C } from '../../styles/tokens';

export const Ic = ({ n, s = 16, c = "currentColor" }: { n: string; s?: number; c?: string }) => {
  const p: Record<string,string> = {
    home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    edu: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    protocol: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
    handout: "M9 12h6 M9 16h4 M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6",
    patients: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
    report: "M18 20V10 M12 20V4 M6 20v-6",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    search: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
    bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
    spark: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    check: "M20 6L9 17l-5-5",
    plus: "M12 5v14M5 12h14",
    send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    today: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z",
    progress: "M22 12h-4l-3 9L9 3l-3 9H2",
    user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    community: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
    store: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {(p[n] || "").split(" M").map((seg, i) => <path key={i} d={i === 0 ? seg : "M" + seg} />)}
    </svg>
  );
};

export const Ring = ({ v, size = 40 }: { v: number; size?: number }) => {
  const r = 14, circ = 2 * Math.PI * r;
  const col = v >= 80 ? C.teal : v >= 60 ? C.amber : C.red;
  return (
    <svg width={size} height={size} viewBox="0 0 36 36">
      <circle cx="18" cy="18" r={r} fill="none" stroke="#F0F6FB" strokeWidth="3.5" />
      <circle cx="18" cy="18" r={r} fill="none" stroke={col} strokeWidth="3.5"
        strokeDasharray={circ} strokeDashoffset={circ - (v / 100) * circ}
        strokeLinecap="round" transform="rotate(-90 18 18)" />
      <text x="18" y="22" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={col} fontFamily="Inter,sans-serif">{v}%</text>
    </svg>
  );
};

export const Spark = ({ data, col = C.cyan }: { data: number[]; col?: string }) => {
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 90 + 5},${35 - ((v - mn) / rng) * 28}`).join(" ");
  return (
    <svg width={70} height={28} viewBox="0 0 100 40">
      <polyline points={pts} fill="none" stroke={col} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};