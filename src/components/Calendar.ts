export let date = new Date();
export let year = date.getFullYear();
export let month = date.getMonth();

const day = document.querySelector(".calendar-dates");

const currentDate = document
    .querySelector(".calendar-current-date");


// Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Function to generate the calendar
export const manipulate = () => {

    // Get the first day in the week of the month
    let dayone = new Date(year, month, 1).getDay();
    console.log("dayone:", dayone);

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();
    console.log("lastdate:", lastdate);
    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();
    console.log("dayend:", dayend);
    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();
    console.log("monthlastdate:", monthlastdate);
    // Variable to store the generated calendar HTML
    let lit = "";

    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        lit +=
            `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {

        // Check if the current date is today
        let isToday = i === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? "active"
            : "";
        lit += `<li class="${isToday}">${i}</li>`;
    }

    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`
    }

    // Update the text of the current date element 
    // with the formatted current month and year
    currentDate.innerText = `${months[month]} ${year}`;

    // update the HTML of the dates element 
    // with the generated calendar
    day.innerHTML = lit;
}

manipulate();

// Attach a click event listener to each icon


export const prevNext = (icon: any) => {
    // Check if the icon is "calendar-prev"
    // or "calendar-next"
    month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    // Check if the month is out of range
    if (month < 0 || month > 11) {

        // Set the date to the first day of the 
        // month with the new year
        date = new Date(year, month, new Date().getDate());

        // Set the year to the new year
        year = date.getFullYear();

        // Set the month to the new month
        month = date.getMonth();
    }

    else {

        // Set the date to the current date
        date = new Date();
    }

    // Call the manipulate function to 
    // update the calendar display
    manipulate();

}

