import { Event } from "../interfaces/event";
import { checkEvents, getReminderDuration, setReminder } from "./Reminder";
import { createCalendar, currentMonth, currentYear } from "./Calendar";

let eventsTotal: Event[] = [];

// StoreEvent function to save events to localStorage
export const StoreEvent = (event: Event) => {
    if (event.title && event.date && event.time) {
        // Get the current list of events from localStorage
        const previousEvents = localStorage.getItem("events");
        if (previousEvents) {
            eventsTotal = JSON.parse(previousEvents);
        }

        // Add the new event to the list
        eventsTotal.push(event);

        // Save the updated list to localStorage
        localStorage.setItem("events", JSON.stringify(eventsTotal));

        // Update the calendar display
        createCalendar(currentMonth, currentYear);
    }
};

// Function to retrieve and display events from localStorage
export function getEvents() {
    const previousEvents = localStorage.getItem("events");

    if (previousEvents) {
        eventsTotal = JSON.parse(previousEvents);
    }

    eventsTotal.forEach((event: Event) => {
        // Create elements for displaying events
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");

        const eventName = document.createElement("p");
        eventName.textContent = event.title + " ";

        const eventTime = document.createElement("p");
        eventTime.textContent = event.timeString + " ";

        const endDateSpan = document.createElement("span");
        endDateSpan.textContent = event.endDateString + " ";

        const endTimeSpan = document.createElement("span");
        endTimeSpan.textContent = event.endTimeString;

        const eventDetails = document.createElement("p");
        eventDetails.textContent =
            "Date: " +
            event.dateString +
            " Description: " +
            event.description +
            " Time: " +
            event.time +
            " Type: " +
            event.type +
            " End Date: " +
            event.endDate +
            " End Time: " +
            event.endTime;

        endDateSpan.classList.add("hide-modal");
        endTimeSpan.classList.add("hide-modal");
        eventTime.classList.add("hide-modal");

        // eventTime.classList.add("hide-modal", "event--tooltip");
        // eventTime.classList.add("event--tooltip");
        eventDetails.classList.add("event--tooltip");

        // Check if the event is in the past and has a reminder
        const isPastEvent = checkIsPastEvent(event.date);
        if (!isPastEvent && event.reminder) {
            setReminder(event);
        }

        // Add CSS classes for past events
        if (isPastEvent) {
            eventDiv.classList.add("past-event");
            console.log("is past event");
        }

        if (eventsTotal) {
            checkEvents(eventsTotal);
        }

        // Append elements to the eventDiv
        eventDiv.appendChild(eventName);
        eventDiv.appendChild(eventTime);
        eventDiv.appendChild(endDateSpan);
        eventDiv.appendChild(endTimeSpan);
        eventDiv.appendChild(eventDetails);

        // Find the corresponding dayDiv in the calendar
        const dayDiv = document.querySelector(
            `.day-item[data-date='${event.dateString}']`
        );
        console.log(dayDiv);
        const dateDiv = dayDiv?.getAttribute("data-date");

        if (dateDiv !== null && dateDiv == event.dateString) {
            dayDiv?.appendChild(eventDiv);
        }

        // Event click listener to show event details
        eventDiv.addEventListener("click", () => {
            const eventContainer = document.getElementById("event-info");
            const overlay = document.querySelector(".overlay");
            eventContainer?.classList.replace("hide-event", "event--info");
            eventTime.classList.remove("event--tooltip");
            eventTime.classList.add("hide-element");
            overlay?.classList.remove("hide-element");

            // Display event details in the modal
            const titleSpan: any = document.getElementById("title-span");
            const timeSpan: any = document.getElementById("time-span");
            const dateSpan: any = document.getElementById("date-span");
            const descriptionSpan: any = document.getElementById("description-span");
            const endDateSpan: any = document.getElementById("endDate-span");
            const endTimeSpan: any = document.getElementById("endTime-span");
            const typeSpan: any = document.getElementById("type-span");

            titleSpan.textContent = "Title: " + event.title;
            timeSpan.textContent = "Time: " + event.timeString;
            dateSpan.textContent = "Date: " + event.dateString;

            // Display optional details if they exist
            if (event.description === undefined || event.description === "") {
                descriptionSpan.textContent = "";
            } else {
                descriptionSpan.textContent = "Description: " + event.description;
            }

            if (event.type === undefined) {
                typeSpan.textContent = "";
            } else {
                typeSpan.textContent = "Type: " + event.type;
            }

            if (event.endDateString === null || event.endDateString === "") {
                endDateSpan.textContent = "";
            } else {
                endDateSpan.textContent = "End Date: " + event.endDate;
            }

            if (event.endTimeString === null || event.endTimeString === "") {
                endTimeSpan.textContent = "";
            } else {
                endTimeSpan.textContent = "End Time: " + event.endTime;
            }
        });
    });
}
// Add event listeners to day cells for hover effect
const dayCells: any = document.querySelectorAll(".day-item");
const dayButton: any = document.querySelectorAll(".day-item .day__button");

if (dayCells) {
    dayCells.forEach((dayCell: any) => {
        // Show add button on mouseover
        dayCell.addEventListener("mouseover", () => {
            const dayData = dayCell.getAttribute("data-date");
            const addButton = document.querySelector(
                `.day-item[data-date="${dayData}"] .day__button`
            );

            addButton?.classList.remove("hide-element");
        });

        // Hide add button on mouseout
        dayCell.addEventListener("mouseout", () => {
            const dayData = dayCell.getAttribute("data-date");
            const addButton = document.querySelector(
                `.day-item[data-date="${dayData}"] .day__button`
            );

            addButton?.classList.add("hide-element");
        });
    });
}

if (dayButton) {
    // Add event listener to day buttons for click effect
    dayButton.forEach((button: any) => {
        button.addEventListener("click", () => {
            // Show modal on button click
            const modal = document.getElementById("modal");
            const overlay = document.querySelector(".overlay");
            const date = document.getElementById("date");

            modal?.classList.remove("hide-element");
            overlay?.classList.remove("hide-element");

            // Set the date value in the modal
            const dataDate = button.getAttribute("data-date");
            if (date && date instanceof HTMLInputElement) {
                date.value = dataDate;
            }

            console.log(button.getAttribute("data-date"));
        });
    });
}

function checkIsPastEvent(startDate: Date) {
    const startTime = new Date(startDate).getTime();
    const now = new Date().getTime();
    return startTime < now;
}

export function checkIsPastEventWithReminder2(event: Event) {
    if (event.reminder) {
        const reminderTime = getReminderDuration(event.reminder);
        const now = new Date().getTime();
        const timestamp = event.startDateTimestamp
        return timestamp - now + 100000 > reminderTime;
    }
}

// Function to delete an event and update the calendar
export function deleteEvent(title: string, date: string) {
    const previousEvents = localStorage.getItem("events");
    let eventsTotalFilter: any = [];
    console.log("title: ", title, date);

    if (previousEvents) {
        eventsTotal = JSON.parse(previousEvents);

        eventsTotal.forEach((event: Event) => {
            // Check if the event matches the provided title and date
            const eventTitle = "Title: " + event.title;
            const eventDate = "Date: " + event.date;

            if (eventTitle !== title && eventDate !== date) {
                console.log(event.title, title, event.date, date);
                eventsTotalFilter.push(event);
            }
        });

        // Update localStorage with the filtered events
        localStorage.setItem("events", JSON.stringify(eventsTotalFilter));
        // Update the calendar display
        createCalendar(currentMonth, currentYear);
    }
}

export function sortEvents() {
    const previousEvents = localStorage.getItem("events");

    // const previousEvents = localStorage.getItem("events");
    if (previousEvents) {
        eventsTotal = JSON.parse(previousEvents);
    }

    eventsTotal.sort((a, b) => a.startDateTimestamp - b.startDateTimestamp);
    console.log(eventsTotal);
    return eventsTotal;
}

//sortEvents()
