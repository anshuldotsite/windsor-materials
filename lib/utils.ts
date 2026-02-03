/* Minimal shadcn-style cn() helper (no extra deps) */

type ClassValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | Record<string, boolean>
  | ClassValue[];

function toClassString(value: ClassValue): string {
  if (!value) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(toClassString).filter(Boolean).join(" ");
  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([, enabled]) => Boolean(enabled))
      .map(([key]) => key)
      .join(" ");
  }
  return "";
}

export function cn(...inputs: ClassValue[]) {
  return inputs.map(toClassString).filter(Boolean).join(" ");
}

