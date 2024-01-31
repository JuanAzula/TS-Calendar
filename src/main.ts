import {
  createCalendar,
  currentMonth,
  currentYear,
} from "./components/Calendar";
import { StoreEvent, checkIsPastEvent, deleteEvent } from "./components/Modal";
import { checkIsPastEventWithReminder, getReminderDuration } from "./components/Reminder";

import { Event, EventType, Reminder } from "./interfaces/event";

document.addEventListener("DOMContentLoaded", () => {
  // getEvents();
});


// ///////// EVENT LISTENERS FOR ADD EVENT BUTTON
const eventButton = document.getElementById("add-event");
const label = document.querySelector("#add-event .header__button--text");
const modal = document.getElementById("modal");
const overlay = document.querySelector(".overlay");

if (
  eventButton &&
  overlay &&
  modal &&
  eventButton instanceof HTMLButtonElement
) {
  eventButton.addEventListener("click", () => {
    overlay.classList.remove("hide-element");
    modal.classList.remove("hide-element");
    const event = localStorage.getItem("events");
    //console.log(event);
  });
}

if (label && modal && label instanceof HTMLSpanElement) {
  label.addEventListener("click", () => {
    modal.classList.remove("hide-element");
  });
}

// ///////// EVENT LISTENERS FOR CLOSE BUTTON
const closeModal = document.getElementById("close");

if (closeModal && closeModal instanceof HTMLSpanElement) {
  closeModal?.addEventListener("click", () => {
    overlay?.classList.add("hide-element");
    modal?.classList.add("hide-element");
  });
}

// ///////// CALENDAR
createCalendar(currentMonth, currentYear);

// //////// EVENT LISTENERS FOR CHECKBOX END DATE

const endDateCheckbox = document.getElementById(
  "checkbox"
) as HTMLButtonElement;
const endDateLabel = document.getElementById("endDate-label")!;
const endDateInput = document.getElementById("endDate")! as HTMLInputElement;
const endDateTimeLabel = document.getElementById("endTimeLabel")!;
const endDateTimeInput = document.getElementById(
  "endTimeInput"
) as HTMLButtonElement;

let isEndDateVisible = false;

endDateCheckbox.addEventListener("click", () => {
  if (isEndDateVisible) {
    endDateLabel?.classList.add("hide-element");
    endDateInput?.classList.add("hide-element");
    endDateTimeLabel.classList.add("hide-element");
    endDateTimeInput.classList.add("hide-element");
  } else {
    endDateLabel.classList.replace("hide-element", "modal__label");
    endDateInput.classList.replace("hide-element", "modal__input");
    endDateTimeLabel.classList.replace("hide-element", "modal__label");
    endDateTimeInput.classList.replace("hide-element", "modal__input");
  }
  isEndDateVisible = !isEndDateVisible;
});

//////// EVENT LISTENERS FOR CHECKBOX REMINDER

const reminmderCheckbox = document.getElementById("reminmderCheckbox");
const reminderTime = document.getElementById("reminderTime");

let isCheckboxVisible = false;

if (reminmderCheckbox && reminmderCheckbox instanceof HTMLInputElement) {
  reminmderCheckbox.addEventListener("click", () => {
    if (isCheckboxVisible) {
      reminderTime?.classList.add("hide-element");
    } else {
      reminderTime?.classList.replace("hide-element", "modal__label");
    }
    isCheckboxVisible = !isCheckboxVisible;
  });
}

// //////// EVENT LISTENERS FOR CLOSE MODAL
document.addEventListener("keydown", (event) => {
  if (overlay && overlay instanceof HTMLDivElement) {
    overlay?.addEventListener("click", () => {
      overlay.classList.add("hide-element");
      modal?.classList.add("hide-element");
    });
  }
  if (event.key === "Escape") {
    const modal = document.getElementById("modal");
    const eventContainer = document.getElementById("event-info");
    modal?.classList.add("hide-element");
    eventContainer?.classList.replace("event--info", "hide-event");
    overlay?.classList.add("hide-element");
  }
});

overlay?.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  const eventContainer = document.getElementById("event-info");
  modal?.classList.add("hide-element");
  eventContainer?.classList.replace("event--info", "hide-event");
  overlay?.classList.add("hide-element");
});

//  /////// EVENT LISTENERS FOR SUBMIT BUTTON

const submitButton = document.getElementById("submit");
const title = document.getElementById("title");
const date = document.getElementById("date");
const time = document.getElementById("time");
const endDate = document.getElementById("endDate");
const endTime = document.getElementById("endTimeInput");
const reminderDuration = document.getElementById("reminderTime")
const textDescription = document.getElementById("textDescription");
const typeSelected = document.getElementById("eventType");

if (
  submitButton &&
  submitButton instanceof HTMLButtonElement &&
  title &&
  title instanceof HTMLInputElement &&
  date &&
  date instanceof HTMLInputElement &&
  time &&
  time instanceof HTMLInputElement &&
  endDate &&
  endDate instanceof HTMLInputElement &&
  endTime &&
  endTime instanceof HTMLInputElement && textDescription instanceof HTMLTextAreaElement && typeSelected instanceof HTMLSelectElement &&
  reminderDuration && reminderDuration instanceof HTMLSelectElement
) {
  submitButton?.addEventListener("click", (event) => {
    event?.preventDefault();
    if (!title?.value || !date?.value || !time?.value) {
      alert("The title, date and time can not be empty!");
      return; // Salir de la función de manejo de eventos sin ejecutar el código restante
    }

    const titleValue = title?.value;
    const dateValueString = date?.value;
    const dateValue = new Date(dateValueString);
    const timeValueString = time?.value;
    const timeValue = convertHour(timeValueString, dateValue);
    const completeDate = getCompleteDate(dateValue, timeValue);
    const reminderValue = reminderDuration.value;
    console.log(completeDate);
    const endDateValueString = endDate?.value; // pasar a date
    const endDateValue = new Date(endDateValueString);
    const endTimeValueString = endTime?.value;
    const endTimeValue = convertHour(endTimeValueString, endDateValue);
    const completeEndDate = getCompleteDate(endDateValue, endTimeValue);
    const descriptionValue = textDescription?.value;
    const typeValue = typeSelected?.value;
    //console.log(reminderValue);
    const eventObject: Event = {
      title: titleValue,
      description: descriptionValue,
      dateString: dateValueString,//coger description del formulario
      date: dateValue,
      time: timeValue,
      timeString: timeValueString,
      completeDate: completeDate,
      startDateTimestamp: getTimestamp(completeDate),
      endDate: completeEndDate, //hay que cambiarlo
      endDateString: endDateValueString,
      endTime: endTimeValue, //hay que cambiarlo
      endTimeString: endTimeValueString,
      type: convertToTypeEnum(typeValue), //coger reminder del formulario
      reminder: convertToReminderEnum(reminderValue),//coger reminder del formulario
    };

    StoreEvent(eventObject);
    overlay?.classList.add("hide-element");
    modal?.classList.add("hide-element");
    title.value = "";
    date.value = "";
    time.value = "";
    textDescription.value = "";

  })
}

// /////// DELETE EVENT

const deleteButton = document.getElementById("delete-event");

if (deleteButton && deleteButton instanceof HTMLButtonElement) {
  deleteButton?.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    const eventContainer = document.getElementById("event-info");

    const eventTitle = document.getElementById("title-span")?.textContent;
    const eventDate = document.getElementById("date-span")?.textContent;

    if (eventTitle && eventDate) {
      deleteEvent(eventTitle, eventDate);
    }

    modal?.classList.add("hide-element");
    eventContainer?.classList.replace("event--info", "hide-event");
    overlay?.classList.add("hide-element");

  })
}




function convertHour(time: string, date: Date) {
  const timeString = time;

  const parts = timeString.split(":");
  const hours = parseInt(parts[0], 10); // Convert the hours part to number
  const minutes = parseInt(parts[1], 10); // Convert the minutes part to number

  // Create a new Date object (this will create a date with the current time)
  //date.setHours = new Date();

  // Set the hours and minutes to the Date object
  date.setHours(hours, minutes, 0, 0); // The last two zeros are for seconds and milliseconds

  // // Now you can use date to get the hours and minutes if needed
  // const setHours = date.getHours(); // Get the hours
  // const setMinutes = date.getMinutes(); // Get the minutes// Obtener los minutos
  return date.getHours();
}

function getCompleteDate(date: Date, hours: number) {
  date.setHours(hours);
  return date;
}

function getTimestamp(date: Date) {
  const eventDate = new Date(date);
  //console.log(eventDate);
  const eventDateMS = eventDate.getTime()
  return eventDateMS
}

function convertToReminderEnum(value: string): Reminder | null {
  switch (value) {
    case Reminder.FiveMinutes:
      return Reminder.FiveMinutes;
    case Reminder.TenMinutes:
      return Reminder.TenMinutes;
    case Reminder.FifteenMinutes:
      return Reminder.FifteenMinutes;
    case Reminder.ThirtyMinutes:
      return Reminder.ThirtyMinutes;
    case Reminder.OneHour:
      return Reminder.OneHour;
    default:
      return null;
  }
}

function convertToTypeEnum(value: string): EventType | null {
  switch (value) {
    case EventType.Meeting:
      return EventType.Meeting;
    case EventType.Party:
      return EventType.Party;
    case EventType.Work:
      return EventType.Work;
    case EventType.Conference:
      return EventType.Conference;
    case EventType.Other:
      return EventType.Other;
    default:
      return null;
  }
}



//checkEvents(sortEvents())

const eventsWithAlertShown = new Set<string>(); // Conjunto para almacenar los IDs de los eventos con alerta mostrada

function checkEventsWithReminder() {
  let eventsTotal = []
  const events = localStorage.getItem("events");
  if (events) {
    eventsTotal = JSON.parse(events);
  }

  eventsTotal.forEach((event: Event) => {
    const eventId = event.completeDate.toString();
    const eventDate = new Date(event.completeDate);
    const eventDateMS = eventDate.getTime();
    if (event.endDate) {
      checkIsPastEvent(event.endDate);

    }
    if (event.reminder && checkIsPastEventWithReminder(event) && !eventsWithAlertShown.has(eventId)) {
      const reminderTime = getReminderDuration(event.reminder);
      console.log(reminderTime);
      const newCurrentDateMS = Date.now();
      const difference = eventDateMS - newCurrentDateMS;
      console.log("EventDateMS:", eventDateMS, "newCurrentDateMS:", newCurrentDateMS, "reminderTime:", reminderTime);
      console.log(difference);
      if (difference <= reminderTime) {
        alert(
          `Your event ${event.title
          } will start at ${eventDate.toLocaleTimeString()}.`
        );
        eventsWithAlertShown.add(eventId);
      } else {
        console.log('no hay alerta');
      }
    }

  })
  setTimeout(checkEventsWithReminder, 1000);
};

checkEventsWithReminder()