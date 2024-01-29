import { getEvents } from "./Modal";

enum Months {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export function createCalendar(month: Months, year: number): void {
  const firstDay: number = new Date(year, month - 1, 1).getDay();
  const firstDayAdjusted: number = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth: number = new Date(year, month + 1, 0).getDate();

  const calendarGrid: HTMLElement | null =
    document.getElementById("calendar-container");

  if (calendarGrid) {
    calendarGrid.innerHTML = "";

    // Omplir els dies anteriors al primer dia del mes
    for (let i = 0; i < firstDayAdjusted; i++) {
      let emptyCell = document.createElement("div");
      calendarGrid.appendChild(emptyCell);
    }

    // Omplir amb els dies del mes
    for (let day = 1; day <= daysInMonth; day++) {
      let dayCell = document.createElement("div");
      dayCell?.classList.add("day-item");
      dayCell.textContent = day.toString().padStart(2, "0");

      const monthValue = month.toString(); // Asegurarse de que el mes tenga al menos dos dígitos
      console.log("hola" + monthValue);
      if (monthValue == '11' || monthValue == '10' || monthValue == '12') {
        console.log('squad');

        const dateValue = `${year}-${monthValue}-${day
          .toString()
          .padStart(2, "0")}`;
        dayCell.setAttribute("data-date", dateValue);
        calendarGrid.appendChild(dayCell);
        console.log(dayCell.getAttribute("data-date"));
      } else {
        console.log('hamilton');
        const dateValue = `${year}-0${monthValue}-${day
          .toString()
          .padStart(2, "0")}`;
        dayCell.setAttribute("data-date", dateValue);
        calendarGrid.appendChild(dayCell);
        console.log(dayCell.getAttribute("data-date"));
      }
    }
  }
  getEvents();
}

const backArrow = document.getElementById("back-arrow") as HTMLSpanElement;
const forwardArrow = document.getElementById(
  "forward-arrow"
) as HTMLSpanElement;

backArrow.addEventListener("click", () => {
  console.log("hola");
  changeMonth(currentMonth, -1);
});

forwardArrow.addEventListener("click", () => changeMonth(currentMonth, 1));

// function getMonthName(month: Months): string {
//     return Months[month];}

//Change month
function changeMonth(current: Months, change: number): void {
  //   const newMonth = (current + change + 12) % 12;
  let newMonth: Months;
  let newYear: number;

  const currentMonthSpan = document.getElementById(
    "current-month"
  ) as HTMLSpanElement;
  console.log(currentMonthSpan);
  currentMonthSpan?.classList.add("preserve-spaces");
  const currentYearSpan = document.getElementById(
    "current-year"
  ) as HTMLSpanElement;

  if (current === Months.January && change === -1) {
    newMonth = Months.December;
    newYear = currentYear - 1;
    createCalendar(newMonth, newYear);

    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
  } else if (current === Months.December && change === 1) {
    newMonth = Months.January;
    newYear = currentYear + 1;
    createCalendar(newMonth, newYear);

    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
  } else if (change === -1) {
    newMonth = currentMonth - 1;
    newYear = currentYear;
    createCalendar(newMonth, newYear);

    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
  } else {
    newMonth = currentMonth + 1;
    newYear = currentYear;
    createCalendar(newMonth, newYear);

    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
  }
  // Asegura que se mantenga en el rango 0-11

  currentMonth = newMonth;
  currentYear = newYear;
  console.log(currentMonth, currentYear);
}

// Pots cridar aquesta funció amb el mes i any actuals
export let currentMonth: Months = new Date().getMonth() + 1;
export let currentYear: number = new Date().getFullYear();
createCalendar(currentMonth, currentYear);
