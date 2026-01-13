// app/prices.ts
export const PRICES = {
  "8oz" : {
    single: 4.99,
    pack6: 26.99
    pack12: 49.99,
  },
  "12oz" : {
single: 6.99,
  pack6: 36.99,
  pack12: 64.99,
},
};
export const formatPrice= (n: number) => '$${n.toFixed(2)}';
