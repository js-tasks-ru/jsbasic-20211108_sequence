function sumSalary(salaries) {
  let totalSalaries = 0;
  for (const prop in salaries) {
    let objVal = salaries[prop];
    if (typeof objVal === 'number' &&
        isFinite(objVal)) {
      totalSalaries += salaries[prop];
    }
  }
  return totalSalaries;
}
