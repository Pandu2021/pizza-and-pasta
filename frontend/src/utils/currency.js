export function formatBaht(value) {
  try {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(value);
  } catch (e) {
    // Fallback: prefix with ฿ and show raw number
    return `฿${Math.round(value)}`;
  }
}
