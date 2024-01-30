import { Event } from "../interfaces/event";
import { setReminder } from "./Reminder";
import { createCalendar, currentMonth, currentYear } from "./Calendar";

let eventsTotal: Event[] = [];

export const StoreEvent = (event: Event) => {
    if (event.title && event.date && event.time) {
        // Obtener la lista actual de eventos del localStorage
        const previousEvents = localStorage.getItem("events");
        if (previousEvents) {
            eventsTotal = JSON.parse(previousEvents);
        }

        // Agregar el nuevo evento a la lista
        eventsTotal.push(event);

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem("events", JSON.stringify(eventsTotal));

    createCalendar(currentMonth, currentYear);
  }
};
export function getEvents() {
  const previousEvents = localStorage.getItem("events");

  // const previousEvents = localStorage.getItem("events");
  if (previousEvents) {
    eventsTotal = JSON.parse(previousEvents);
  }

    eventsTotal.forEach((event: Event) => {
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
        eventDetails.textContent = "Date: " + event.dateString + " Description: " + event.description + " Time: " + event.time + " Type: " + event.type + " End Date: " + event.endDate + " End Time: " + event.endTime;

    endDateSpan.classList.add("hide-modal");
    endTimeSpan.classList.add("hide-modal");
    eventTime.classList.add("hide-modal");

    // eventTime.classList.add("hide-modal", "event--tooltip");
    // eventTime.classList.add("event--tooltip");
    eventDetails.classList.add("event--tooltip");
    const isPastEvent = checkIsPastEvent(event.date)
    if (!isPastEvent && event.reminder) {
      setReminder(event);
    } 
    
    if(isPastEvent){
      eventDiv.classList.add('past-event')
    }

    eventDiv.appendChild(eventName);
    eventDiv.appendChild(eventTime);
    eventDiv.appendChild(endDateSpan);
    eventDiv.appendChild(endTimeSpan);
    eventDiv.appendChild(eventDetails);

        //console.log(event.date);
        const dayDiv = document.querySelector(
            `.day-item[data-date='${event.dateString}']`
        );
        console.log(dayDiv);
        const dateDiv = dayDiv?.getAttribute("data-date");

        if (dateDiv !== null && dateDiv == event.dateString) {
            console.log("Date found");
            dayDiv?.appendChild(eventDiv);
        } else {
            console.log("No date found");
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
      const typeSpan: any = document.getElementById("type-span");

            titleSpan.textContent = "Title: " + event.title;
            timeSpan.textContent = "Time: " + event.timeString;
            dateSpan.textContent = "Date: " + event.dateString;
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

      // }

            overlay?.classList.remove("hide-modal");
        });
    });
}


// /////// ADD DAYCELL EVENT

const dayCells: any = document.querySelectorAll(".day-item");
const dayButton: any = document.querySelectorAll(".day-item .day__button");

if (dayCells) {
    dayCells.forEach((dayCell: any) => {
        dayCell.addEventListener("mouseover", () => {

            const dayData = dayCell.getAttribute("data-date");
            const addButton = document.querySelector(`.day-item[data-date="${dayData}"] .day__button`);

            addButton?.classList.remove("hide-modal");
        })
        dayCell.addEventListener("mouseout", () => {

            const dayData = dayCell.getAttribute("data-date");
            const addButton = document.querySelector(`.day-item[data-date="${dayData}"] .day__button`);

            addButton?.classList.add("hide-modal");
        })
    })
}



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
        })
    })
}