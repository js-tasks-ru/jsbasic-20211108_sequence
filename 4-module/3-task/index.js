function highlight(table) {
  for (let tr of Array.from(table.rows).slice(1)) {
    if (tr.cells[3].getAttribute("data-available") === null) {
      tr.setAttribute("hidden", "hidden");
    }
    if (tr.cells[3].getAttribute("data-available") === "true") {
      tr.classList.add("available");
    }
    else {
      tr.classList.add("unavailable");
    }
    if (tr.cells[2].textContent == "m") {
      tr.classList.add("male");
    }
    else {
      tr.classList.add("female");
    }
    if (+tr.cells[1].textContent < 18) {
      tr.setAttribute("style", "text-decoration: line-through");
    }
  }
}
