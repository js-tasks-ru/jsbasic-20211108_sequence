function showSalary(users, age) {
  let usersSalaries = "";
  for (const user of users) {
    if (user.age <= age) {
      usersSalaries += user.name + ", " + user.balance + "\n";
    }
  }
  return usersSalaries.slice(0, -1);
}
