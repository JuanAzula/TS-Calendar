enum Months {

    January = 0,
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
    December
}

export function createCalendar(month: Months, year: number): void {
    const firstDay: number = new Date(year, month, 1).getDay();
    const firstDayAdjusted: number = (firstDay === 0) ? 6 : firstDay - 1;
    const daysInMonth: number = new Date(year, month + 1, 0).getDate();

    const calendarGrid: HTMLElement | null = document.getElementById('calendar-container');

    if (calendarGrid) {
        calendarGrid.innerHTML = ''; // Neteja la graella si ja té elements

        // Omplir els dies anteriors al primer dia del mes
        for (let i = 0; i < firstDayAdjusted; i++) {
            let emptyCell = document.createElement('div');
            calendarGrid.appendChild(emptyCell);
        }

        // Omplir amb els dies del mes
        for (let day = 1; day <= daysInMonth; day++) {
            let dayCell = document.createElement('div');
            dayCell?.classList.add("day-item");
            dayCell.textContent = day.toString().padStart(2, '0');


            const monthValue = (month).toString().padStart(1, '0'); // Asegurarse de que el mes tenga al menos dos dígitos
            const dateValue = `${year}-${monthValue + 1}-${day.toString().padStart(2, '0')}`;
            dayCell.setAttribute("data-date", dateValue);
            calendarGrid.appendChild(dayCell);
            console.log(dayCell.getAttribute("data-date"))
        }
    }
}

// Pots cridar aquesta funció amb el mes i any actuals
createCalendar(new Date().getMonth(), new Date().getFullYear());