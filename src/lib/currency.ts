export const PRICE_REGION_FACTOR = 0.15; // 15% do preço base europeu

export function formatPrice(value: number) {
  if (isNaN(value)) return "0,00 KZ";
  return value.toLocaleString("pt-AO", {
    style: "currency",
    currency: "AOA",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).replace("AOA", "KZ");
}

// Manter compatibilidade com função existente
export function formatKZ(value: number) {
  const v = Math.max(0, Math.round(value)); // arredonda e nunca negativo
  return `${v.toLocaleString('pt-PT')} KZ`;
}