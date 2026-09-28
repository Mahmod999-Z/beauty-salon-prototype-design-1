export type ParsedPrice = { value: number; decimals: number; prefix: string };

export function parsePrice(price: string): ParsedPrice | null {
  const match = price.match(/(\d+)(?:,(\d+))?/);
  if (!match) return null;
  const decimals = match[2] ? match[2].length : 0;
  const value = Number(`${match[1]}.${match[2] ?? "0"}`);
  const prefix = price.slice(0, match.index ?? 0);
  return { value, decimals, prefix };
}

export function formatEuro(value: number, decimals = 2) {
  return value.toLocaleString("nl-NL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
