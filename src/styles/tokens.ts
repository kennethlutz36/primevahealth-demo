// ── Primeva Design Tokens ──────────────────────────────────────────────
export const colors = {
  navy:        "#061A44",
  navyMid:     "#081F4D",
  body:        "#111111",
  muted:       "#4A5B78",
  mutedLight:  "#9BA8BE",
  cyan:        "#00AEEA",
  cyan2:       "#16C7E8",
  teal:        "#3ED1C2",
  border:      "#E8EFF6",
  borderAlt:   "#D8EAF3",
  bg:          "#F5FAFD",
  softBlue:    "#EEF7FC",
  card:        "#FFFFFF",
  green:       "#16A34A",
  greenBg:     "#F0FDF4",
  greenBorder: "#BBF7D0",
  amber:       "#D97706",
  amberBg:     "#FFFBEB",
  amberBorder: "#FDE68A",
  red:         "#DC2626",
  redBg:       "#FEF2F2",
  redBorder:   "#FECACA",
} as const;

// Alias used throughout components as C.*
export const C = colors;

export const radii = {
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  card: 22,
} as const;

export const shadows = {
  card:  "0 1px 12px rgba(6,26,68,.05)",
  hover: "0 4px 24px rgba(6,26,68,.08)",
  hero:  "0 4px 28px rgba(6,26,68,.18)",
  fab:   "0 3px 20px rgba(6,26,68,.3)",
} as const;

export type ColorKey = keyof typeof colors;