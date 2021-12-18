/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.makeTable();
    this.fillRows(rows);
  }

  makeTable() {
    let table = document.createElement('TABLE');
    let thead = document.createElement('THEAD');
    let tbody = document.createElement('TBODY');

    let tr = document.createElement('TR');
    let thText = ["Имя", "Возраст", "Зарплата", "Город", ""];
    for (let i = 0; i < 5; i++) {
      let th = document.createElement('TH');
      th.textContent = thText[i];
      tr.append(th);
    }

    thead.appendChild(tr);
    table.append(thead);
    table.append(tbody);

    return table;
  }

  fillRows(rows) {
    for (let row of rows) {
      console.log(row);
      let tr = document.createElement('TR');
      for (let prop in row) {
        if (Object.prototype.hasOwnProperty.call(row, prop)) {
          let td = document.createElement('TD');
          td.textContent = row[prop];
          tr.append(td);
        }
      }
      let td = document.createElement('TD');
      let button = document.createElement('BUTTON');
      button.textContent = "X";
      button.onclick = function() {
        tr.remove();
      };
      td.append(button);
      tr.append(td);
      this.elem.tBodies[0].append(tr);
    }
  }
}
