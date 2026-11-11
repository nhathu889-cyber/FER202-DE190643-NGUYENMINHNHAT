export const formatUSD = (value: number): string =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
