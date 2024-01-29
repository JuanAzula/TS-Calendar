import { Event } from "../interfaces/event"

let eventsTotal: { title: string, date: string, time: string, endDate: string, endTime: string }[] = [];
const previousEvents = localStorage.getItem("events");
export const StoreEvent = (title: string, date: string, time: string, endDate: string, endTime: string) => {
    if (title && date && time) {
        // Obtener la lista actual de eventos del localStorage
        if (previousEvents) {
            eventsTotal = JSON.parse(previousEvents);
        }

        // Agregar el nuevo evento a la lista
        eventsTotal.push({ title, date, time, endDate, endTime });

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem("events", JSON.stringify(eventsTotal));

    }
}
export function getEvents() {

    // const previousEvents = localStorage.getItem("events");
    if (previousEvents) {
        eventsTotal = JSON.parse(previousEvents);
    }

    eventsTotal.forEach((event: { title: string, date: string, time: string, endDate: string, endTime: string }) => {
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

        endDateSpan.classList.add("hide-modal");
        endTimeSpan.classList.add("hide-modal");

        // eventTime.classList.add("hide-modal", "event--tooltip");
        eventTime.classList.add("event--tooltip");

        eventDiv.appendChild(eventName);
        eventDiv.appendChild(eventTime);
        eventDiv.appendChild(endDateSpan);
        eventDiv.appendChild(endTimeSpan);

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

            const eventSpan: any = document.getElementById("event-span");

            if (eventSpan && eventSpan.endTime === undefined && eventSpan.endDate === undefined) {
                eventSpan.textContent = `${event.title}:\n ${event.time}`;
            } else {
                eventSpan.textContent = `${event.title}: \n ${event.time} ends at ${event.endTime} on ${event.endDate}`;
            }

            overlay?.classList.remove("hide-modal");
        })

    })
}