export const formatter = {
  format: (value: number, locale = "en-US", currency = "USD") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  },

  parse: (value: string) => {
    const cleaned = value.replace(/[^\d.-]/g, "").replace(/,/g, "");
    return Number.parseFloat(cleaned);
  },
};
