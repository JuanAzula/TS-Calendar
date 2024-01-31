import { getEvents } from "./Modal";

// Enum for months
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

// Function to create a calendar for a given month and year
export function createCalendar(month: Months, year: number): void {
  // Calculate first day, adjusted first day, and days in the month
  const firstDay: number = new Date(year, month - 1, 1).getDay();
  const firstDayAdjusted: number = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth: number = new Date(year, month, 0).getDate();

  // Get the calendar container element
  const calendarGrid: HTMLElement | null =
    document.getElementById("calendar-container");

  // Check if the container element exists
  if (calendarGrid) {
    // Clear the container
    calendarGrid.innerHTML = "";

    // Fill in the days before the first day of the month
    for (let i = 0; i < firstDayAdjusted; i++) {
      let emptyCell = document.createElement("div");
      calendarGrid.appendChild(emptyCell);
    }

    // Fill in the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      let dayCell = document.createElement("div");
      dayCell?.classList.add("day-item");
      dayCell.textContent = day.toString().padStart(2, "0");

      const dayButton = document.createElement("button");
      dayButton.classList.add("day__button");
      dayButton.classList.add("hide-modal");
      dayButton.textContent = "add";

      // Ensure the month has at least two digits
      const monthValue = month.toString();
      if (monthValue == '11' || monthValue == '10' || monthValue == '12') {
        const dateValue = `${year}-${monthValue}-${day.toString().padStart(2, "0")}`;
        dayCell.setAttribute("data-date", dateValue);
        dayButton.setAttribute("data-date", dateValue);
        dayCell.appendChild(dayButton);
        calendarGrid.appendChild(dayCell);
      } else {
        const dateValue = `${year}-0${monthValue}-${day.toString().padStart(2, "0")}`;
        dayCell.setAttribute("data-date", dateValue);
        dayButton.setAttribute("data-date", dateValue);
        dayCell.appendChild(dayButton);
        calendarGrid.appendChild(dayCell);
      }
    }
  }
  
  // Call the getEvents function
  getEvents();

  // Event handling for day cell hover
  const dayCells: any = document.querySelectorAll(".day-item");
  const dayButton: any = document.querySelectorAll(".day-item .day__button");

  if (dayCells) {
    dayCells.forEach((dayCell: any) => {
      dayCell.addEventListener("mouseover", () => {
        const dayData = dayCell.getAttribute("data-date");
        const addButton = document.querySelector(`.day-item[data-date="${dayData}"] .day__button`);
        addButton?.classList.remove("hide-modal");
      });
      dayCell.addEventListener("mouseout", () => {
        const dayData = dayCell.getAttribute("data-date");
        const addButton = document.querySelector(`.day-item[data-date="${dayData}"] .day__button`);
        addButton?.classList.add("hide-modal");
      });
    });
  }

  // Event handling for day button click
  if (dayButton) {
    dayButton.forEach((button: any) => {
      button.addEventListener("click", () => {
        const modal = document.getElementById("modal");
        const overlay = document.querySelector(".overlay");
        const date = document.getElementById("date");

        modal?.classList.remove("hide-modal");
        overlay?.classList.remove("hide-modal");

        const dataDate = button.getAttribute("data-date");

        if (date && date instanceof HTMLInputElement) {
          date.value = dataDate;
        }

        console.log(button.getAttribute('data-date'));
      });
    });
  }
}

// Get references to arrows for changing months
const backArrow = document.getElementById("back-arrow") as HTMLSpanElement;
const forwardArrow = document.getElementById("forward-arrow") as HTMLSpanElement;

// Event listeners for changing months
backArrow.addEventListener("click", () => {
  console.log("hello");
  changeMonth(currentMonth, -1);
});

forwardArrow.addEventListener("click", () => changeMonth(currentMonth, 1));

// Function to change the month
function changeMonth(current: Months, change: number): void {
  let newMonth: Months;
  let newYear: number;

  // Get references to current month and year elements
  const currentMonthSpan = document.getElementById("current-month") as HTMLSpanElement;
  currentMonthSpan?.classList.add("preserve-spaces");
  resetMonth();

  const currentYearSpan = document.getElementById("current-year") as HTMLSpanElement;

  function resetMonth() {
    currentMonthSpan?.classList.remove("month");
    void currentMonthSpan?.offsetWidth;
    currentMonthSpan?.classList.add("month");
  }

  if (current === Months.January && change === -1) {
    newMonth = Months.December;
    newYear = currentYear - 1;
    createCalendar(newMonth, newYear);
    resetMonth();
    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
  } else if (current === Months.December && change === 1) {
    newMonth = Months.January;
    newYear = currentYear + 1;
    createCalendar(newMonth, newYear);
    resetMonth();
    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
  } else if (change === -1) {
    newMonth = currentMonth - 1;
    newYear = currentYear;
    createCalendar(newMonth, newYear);
    resetMonth();
    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
  } else {
    newMonth = currentMonth + 1;
    newYear = currentYear;
    createCalendar(newMonth, newYear);
    resetMonth();
    currentMonthSpan.textContent = `${Months[newMonth]} `;
    currentYearSpan.textContent = newYear.toString();
  }
  currentMonth = newMonth;
  currentYear = newYear;
}

// Initial calendar creation with current month and year
export let currentMonth: Months = new Date().getMonth() + 1;
export let currentYear: number = new Date().getFullYear();
createCalendar(currentMonth, currentYear);
