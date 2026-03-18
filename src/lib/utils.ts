export function sanitizeId(id: string): string {
  // アポストロフィやスペースなどを除去（例: "Vel'Koz" -> "Velkoz", "Kha'Zix" -> "Khazix"）
  return id.replace(/['\s]/g, "");
}
