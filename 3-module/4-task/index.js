function showSalary(users, age) {
  let relevantUsers = users.filter((user) => user.age <= age);
  let usersSalaries = relevantUsers.map((user) => user.name + ", " + user.balance);
  return usersSalaries.join("\n");
}
