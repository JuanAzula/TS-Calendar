
let eventsTotal: { title: string, date: string, time: string }[] = [];
const previousEvents = localStorage.getItem("events");
export const StoreEvent = (title: string, date: string, time: string) => {
    if (title && date && time) {
        // Obtener la lista actual de eventos del localStorage
        if (previousEvents) {
            eventsTotal = JSON.parse(previousEvents);
        }

        // Agregar el nuevo evento a la lista
        eventsTotal.push({ title, date, time });

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem("events", JSON.stringify(eventsTotal));

        getEvents();
    }
}
export function getEvents() {

    // const previousEvents = localStorage.getItem("events");
    if (previousEvents) {
        eventsTotal = JSON.parse(previousEvents);
    }

    eventsTotal.forEach((event: { title: string, date: string, time: string }) => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");

        eventDiv.innerHTML = `
            <p>Title: ${event.title}</p>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
        `;

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
    })
}