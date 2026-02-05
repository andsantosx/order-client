/**
 * Utility functions for monetary value conversions
 * Backend always works with centavos (cents)
 */

/**
 * Converts centavos to reais
 * @param cents - Value in centavos
 * @returns Value in reais
 */
export const centavosParaReais = (cents: number): number => {
  return cents / 100;
};

/**
 * Converts reais to centavos
 * @param reais - Value in reais
 * @returns Value in centavos (rounded)
 */
export const reaisParaCentavos = (reais: number): number => {
  return Math.round(reais * 100);
};

/**
 * Formats cents value as Brazilian currency
 * @param cents - Value in cent avos
 * @returns Formatted string (e.g., "R$ 49,90")
 */
export const formatarMoeda = (cents: number): string => {
  const reais = centavosParaReais(cents);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(reais);
};

/**
 * Parses a Brazilian currency string to centavos
 * @param currencyString - String like "R$ 49,90" or "49,90"
 * @returns Value in centavos
 */
export const parseRealStrParaCentavos = (currencyString: string): number => {
  // Remove R$, spaces, and convert comma to dot
  const cleanString = currencyString
    .replace(/R\$/g, '')
    .replace(/\s/g, '')
    .replace(/\./g, '') // Remove thousand separators
    .replace(/,/g, '.'); // Convert decimal separator
  
  const reais = parseFloat(cleanString);
  return reaisParaCentavos(reais);
};
