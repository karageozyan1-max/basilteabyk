// app/prices.ts
export const SIZE_PRICES: Record<string, number> = {
  '8oz': 4.99,
  '12oz': 6.99,
};

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
