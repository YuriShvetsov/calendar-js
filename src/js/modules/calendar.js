/* Calendar of the current year */

function createElement(tag, classNames) {
  const element = document.createElement(tag);
  classNames.split(' ').forEach(c => {
    element.classList.add(c);
  })

  return element;
}

function createCalendar(container, month, year) {
  const weekdayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const date = new Date(year, month, 1);
  const table = createElement('table', 'calendar');

  // Add month name
  const caption = createElement('caption', 'calendar__caption');
  caption.textContent = monthNames[month];
  table.append(caption);

  // Add weekday names
  let headRow = createElement('tr', 'calendar__row calendar__row_head');

  for (let i = 0; i < 7; i++) {
    let weekday = createElement('th', 'calendar__cell calendar__cell_head');
    weekday.textContent = weekdayNames[i];
    headRow.append(weekday);
  }

  table.append(headRow);

  // Add empty cells to the beginning of the table
  let row = createElement('tr', 'calendar__row');
  const firstEmptyCellCount = (date.getDay() == 0) ? 6 : date.getDay() - 1;
  
  if (firstEmptyCellCount != 0) {
    for (let weekday = 0; weekday < firstEmptyCellCount; weekday++) {
      let emptyCell = createElement('td', 'calendar__cell calendar__cell_empty');
      emptyCell.textContent = '';
      row.append(emptyCell);
    }
  }

  // Add month numbers
  while(true) {
    if (date.getDay() == 1) {
      table.append(row);
      row = createElement('tr', 'calendar__row');
    }

    let cell = createElement('td', 'calendar__cell calendar__cell_body');
    cell.textContent = date.getDate();
    row.append(cell);

    date.setDate(date.getDate() + 1);

    if (date.getDate() == 1) break;
  }

  // Add empty cells to the end of the table
  const lastEmptyCellCount = (date.getDay() == 0) ? 1 : 8 - date.getDay();

  if (lastEmptyCellCount != 7) {
    for (let weekday = lastEmptyCellCount; weekday > 0; weekday--) {
      let emptyCell = createElement('td', 'calendar__cell calendar__cell_empty');
      emptyCell.textContent = '';
      row.append(emptyCell);
    }
  }

  table.append(row);

  // Add calendar to the element
  container.append(table);
}

const now = new Date();
const app = document.getElementById('app');
const calendarYear = createElement('h1', 'calendar-year');
const calendarContainer = createElement('div', 'calendar-container');

calendarYear.textContent = now.getFullYear();
app.append(calendarYear);
app.append(calendarContainer);

for (let i = 0; i < 12; i++) {
  createCalendar(calendarContainer, i, now.getFullYear());
}