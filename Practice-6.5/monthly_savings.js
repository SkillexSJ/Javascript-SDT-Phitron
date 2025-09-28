function monthlySavings(payments, expenses) {
  if (
    !Array.isArray(payments) ||
    typeof expenses !== "number" ||
    expenses < 0
  ) {
    return "Invalid input";
  }
  let totalIncome = 0;
  let totalTax = 0;

  for (const payment of payments) {
    if (payment >= 3000) {
      totalTax += payment * 0.2;
      totalIncome += payment;
    } else {
      totalIncome += payment;
    }
  }

  const incomeAfterTax = totalIncome - totalTax;
  const totalSavings = incomeAfterTax - expenses;

  if (totalSavings >= 0) {
    return totalSavings;
  } else {
    return "earn more";
  }
}

const payments = [1000, 2000, 2500];
const expenses = 5900;
console.log(monthlySavings(payments, expenses));
