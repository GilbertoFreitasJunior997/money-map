const { format } = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const currencyFormatter = {
  format: (value: number) => format(value),
};
