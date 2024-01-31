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


// Create a Date object with Date.now()
const todayDate: Date = new Date(Date.now());

// Extract the year, month, and day with explicit types
const year: number = todayDate.getFullYear(); // Year
const month: number = todayDate.getMonth() + 1; // Month (add 1 because months range from 0 to 11)
const day: number = todayDate.getDate(); // Day of the month

// Function to format month and day to ensure two digits
const formatWithZero: (num: number) => string = (num) => (num < 10 ? `0${num}` : num.toString());

// Format the date in YYYY-MM-DD format using string template literals
const formattedDate: string = `${year}-${formatWithZero(month)}-${formatWithZero(day)}`;



export function createCalendar(month: Months, year: number): void {
  const firstDay: number = new Date(year, month - 1, 1).getDay();
  const firstDayAdjusted: number = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth: number = new Date(year, month, 0).getDate();

  const calendarGrid: HTMLElement | null =
    document.getElementById("calendar-container");

  if (calendarGrid) {
    calendarGrid.innerHTML = "";

    for (let i = 0; i < firstDayAdjusted; i++) {
      let emptyCell = document.createElement("div");
      calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      let dayCell = document.createElement("div");
      dayCell?.classList.add("day-item");
      dayCell.textContent = day.toString().padStart(2, "0");



      const dayButton = document.createElement("button");
      dayButton.classList.add("day__button");
      dayButton.classList.add("hide-element");
      dayButton.textContent = "add";

      const monthValue = month.toString();
      if (monthValue == '11' || monthValue == '10' || monthValue == '12') {

        const dateValue = `${year}-${monthValue}-${day
          .toString()
          .padStart(2, "0")}`;
        dayCell.setAttribute("data-date", dateValue);
        dayButton.setAttribute("data-date", dateValue);
        dayCell.appendChild(dayButton);
        calendarGrid.appendChild(dayCell);
      } else {
        const dateValue = `${year}-0${monthValue}-${day
          .toString()
          .padStart(2, "0")}`;
        dayCell.setAttribute("data-date", dateValue);
        dayButton.setAttribute("data-date", dateValue);

        dayCell.appendChild(dayButton);
        calendarGrid.appendChild(dayCell);
      }
      if (dayCell) {
        const attribute: string | null = dayCell.getAttribute('data-date');
        const dateValue = `${year}-0${monthValue}-${day
          .toString()
          .padStart(2, "0")}`;
        if (attribute === formattedDate) {
          dayCell.classList.remove('day-item')
          dayCell.classList.add('current-day-item')
          dayCell.setAttribute("data-date", dateValue);
          dayButton.setAttribute("data-date", dateValue);

          dayCell.appendChild(dayButton);
          calendarGrid.appendChild(dayCell);
        }
      }
    }
    getEvents();

    // /////// ADD DAYCELL EVENT

    const dayCells: any = document.querySelectorAll(".day-item");
    const activeDayCell: any = document.querySelector(".current-day-item");
    const dayButton: any = document.querySelectorAll(".day-item .day__button");
    const activeDayButton: any = document.querySelectorAll(".current-day-item .day__button");
    const overlay: any = document.querySelector('.overlay');

    if (dayCells) {
      dayCells.forEach((dayCell: any) => {
        dayCell.addEventListener("mouseover", () => {

          const dayData = dayCell.getAttribute("data-date");
          const addButton = document.querySelector(`.day-item[data-date="${dayData}"] .day__button`);

          addButton?.classList.remove("hide-element");
        })
        dayCell.addEventListener("mouseout", () => {

          const dayData = dayCell.getAttribute("data-date");
          const addButton = document.querySelector(`.day-item[data-date="${dayData}"] .day__button`);

          addButton?.classList.add("hide-element");
        })
      })
    }

    if (activeDayCell) {
      activeDayCell.addEventListener('mouseover', () => {
        const dayData = activeDayCell.getAttribute('data-date');
        const addButton = document.querySelector(`.current-day-item[data-date="${dayData}"] .day__button`);

        addButton?.classList.remove('hide-element');
      })
      activeDayCell.addEventListener('mouseout', () => {
        const dayData = activeDayCell.getAttribute('data-date');
        const addButton = document.querySelector(`.current-day-item[data-date="${dayData}"] .day__button`);
        addButton?.classList.add('hide-element');
      })
    }



    if (dayButton) {
      dayButton.forEach((button: any) => {
        button.addEventListener("click", () => {

          const modal = document.getElementById("modal");
          const overlay = document.querySelector(".overlay");
          const date = document.getElementById("date");

          modal?.classList.remove("hide-element");
          overlay?.classList.remove("hide-element");

          const dataDate = button.getAttribute("data-date");

          if (date && date instanceof HTMLInputElement) {
            date.value = dataDate;
          }



        })
      })
    }
    if (activeDayButton) {
      activeDayButton.forEach((button: any) => {
        button.addEventListener("click", () => {

          const modal = document.getElementById("modal");
          const date = document.getElementById("date");

          modal?.classList.remove("hide-element");
          overlay?.classList.remove("hide-element");

          const dataDate = button.getAttribute("data-date");

          if (date && date instanceof HTMLInputElement) {
            date.value = dataDate;
          }



        })
      })
    }
  }
}
const overlay = document.querySelector(".overlay");
overlay?.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  const eventContainer = document.getElementById("event-info");
  modal?.classList.add("hide-element");
  eventContainer?.classList.replace("event--info", "hide-event");
  overlay?.classList.add("hide-element");
});

const backArrow = document.getElementById("back-arrow") as HTMLSpanElement;
const forwardArrow = document.getElementById(
  "forward-arrow"
) as HTMLSpanElement;

backArrow.addEventListener("click", () => {
  changeMonth(currentMonth, -1);
});

forwardArrow.addEventListener("click", () => changeMonth(currentMonth, 1));


function changeMonth(current: Months, change: number): void {
  let newMonth: Months;
  let newYear: number;

  const currentMonthSpan = document.getElementById(
    "current-month"
  ) as HTMLSpanElement;
  currentMonthSpan?.classList.add("preserve-spaces");
  currentMonthSpan?.classList.remove("month");
  void currentMonthSpan?.offsetWidth;
  currentMonthSpan?.classList.add("month");

  const currentYearSpan = document.getElementById(
    "current-year"
  ) as HTMLSpanElement;

  if (current === Months.January && change === -1) {
    newMonth = Months.December;
    newYear = currentYear - 1;
    createCalendar(newMonth, newYear);
    currentMonthSpan?.classList.remove("month");
    void currentMonthSpan?.offsetWidth;
    currentMonthSpan?.classList.add("month");

    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
  } else if (current === Months.December && change === 1) {
    newMonth = Months.January;
    newYear = currentYear + 1;
    createCalendar(newMonth, newYear);
    currentMonthSpan?.classList.remove("month");
    void currentMonthSpan?.offsetWidth;
    currentMonthSpan?.classList.add("month");
    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
  } else if (change === -1) {
    newMonth = currentMonth - 1;
    newYear = currentYear;
    createCalendar(newMonth, newYear);
    currentMonthSpan?.classList.remove("month");
    void currentMonthSpan?.offsetWidth;
    currentMonthSpan?.classList.add("month");
    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
  } else {
    newMonth = currentMonth + 1;
    newYear = currentYear;
    createCalendar(newMonth, newYear);
    currentMonthSpan?.classList.remove("month");
    void currentMonthSpan?.offsetWidth;
    currentMonthSpan?.classList.add("month");
    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
    // Asegura que se mantenga en el rango 0-11
  }

  currentMonth = newMonth;
  currentYear = newYear;
}




export let currentMonth: Months = new Date().getMonth() + 1;
export let currentYear: number = new Date().getFullYear();
createCalendar(currentMonth, currentYear);



