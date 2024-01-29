import { createCalendar, currentMonth, currentYear } from "./Calendar";


let eventsTotal: { title: string, date: string, time: string, endDate: string, endTime: string, description: string }[] = [];
export const StoreEvent = (title: string, date: string, time: string, endDate: string, endTime: string, description: string) => {
    if (title && date && time) {
        const previousEvents = localStorage.getItem("events");
        // Obtener la lista actual de eventos del localStorage
        if (previousEvents) {
            eventsTotal = JSON.parse(previousEvents);
        }

        // Agregar el nuevo evento a la lista
        eventsTotal.push({ title, date, time, endDate, endTime, description });

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem("events", JSON.stringify(eventsTotal));

        createCalendar(currentMonth, currentYear);
    }
}
export function getEvents() {
    const previousEvents = localStorage.getItem("events");

    // const previousEvents = localStorage.getItem("events");
    if (previousEvents) {
        eventsTotal = JSON.parse(previousEvents);
    }

    eventsTotal.forEach((event: { title: string, date: string, time: string, endDate: string, endTime: string, description: string }) => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");

        const eventName = document.createElement("p");
        eventName.textContent = event.title + " ";

        const eventTime = document.createElement("p");
        eventTime.textContent = event.time + " ";

        const endDateSpan = document.createElement("span");
        endDateSpan.textContent = event.endDate + " ";

        const endTimeSpan = document.createElement("span");
        endTimeSpan.textContent = event.endTime;

        const eventDetails = document.createElement("p");
        eventDetails.textContent = "Date: " + event.date + " Description: " + event.description + " Time: " + event.time + " End Date: " + event.endDate + " End Time: " + event.endTime;

        endDateSpan.classList.add("hide-modal");
        endTimeSpan.classList.add("hide-modal");
        eventTime.classList.add("hide-modal");

        // eventTime.classList.add("hide-modal", "event--tooltip");
        // eventTime.classList.add("event--tooltip");
        eventDetails.classList.add("event--tooltip");

        eventDiv.appendChild(eventName);
        eventDiv.appendChild(eventTime);
        eventDiv.appendChild(endDateSpan);
        eventDiv.appendChild(endTimeSpan);
        eventDiv.appendChild(eventDetails);

        console.log(event.date)
        const dayDiv = document.querySelector(`.day-item[data-date='${event.date}']`);
        console.log(dayDiv)
        const dateDiv = dayDiv?.getAttribute("data-date")

        if (dateDiv !== null && dateDiv == event.date) {
            console.log("Date found")
            dayDiv?.appendChild(eventDiv);
        } else {
            console.log("No date found")
        }

        eventDiv.addEventListener("click", () => {
            const eventContainer = document.getElementById("event-info");
            const overlay = document.querySelector(".overlay");
            eventContainer?.classList.replace("hide-event", "event--info");
            eventTime.classList.remove("event--tooltip");
            eventTime.classList.add("hide-modal");

            const titleSpan: any = document.getElementById("title-span");
            const timeSpan: any = document.getElementById("time-span");
            const dateSpan: any = document.getElementById("date-span");
            const descriptionSpan: any = document.getElementById("description-span");
            const endDateSpan: any = document.getElementById("endDate-span");
            const endTimeSpan: any = document.getElementById("endTime-span");

            titleSpan.textContent = "Title: " + event.title;
            timeSpan.textContent = "Time: " + event.time;
            dateSpan.textContent = "Date: " + event.date;
            if (event.description === "") {
                descriptionSpan.textContent = "Description: No description";
            } else {
                descriptionSpan.textContent = "Description: " + event.description;

            }
            endDateSpan.textContent = "End Date: " + event.endDate;
            endTimeSpan.textContent = "End Time: " + event.endTime;

            overlay?.classList.remove("hide-modal");
        })

    })
}








// if (eventSpan && eventSpan.endTime === undefined && eventSpan.endDate === undefined) {
//     eventSpan.textContent = `${event.title}:\n ${event.time}`;
// } else {
//     eventSpan.textContent = `${event.title}: \n ${event.time} ends at ${event.endTime} on ${event.endDate}`;
// }