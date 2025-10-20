export function ToKenyanShillings(amount: number) {
  const formattedAmount = amount.toLocaleString("sw-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
  });
  const cleanedAmount = formattedAmount.replace(/KSh|KES\s*/i, "").trim();
  return `KES ${cleanedAmount}`;
}
