import {
  createCalendar,
  currentMonth,
  currentYear,
} from "./components/Calendar";
import { StoreEvent, deleteEvent } from "./components/Modal";
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
    overlay.classList.remove("hide-modal");
    modal.classList.remove("hide-modal");
    const event = localStorage.getItem("events");
    console.log(event);
  });
}

if (label && modal && label instanceof HTMLSpanElement) {
  label.addEventListener("click", () => {
    modal.classList.remove("hide-modal");
  });
}

// ///////// EVENT LISTENERS FOR CLOSE BUTTON
const closeModal = document.getElementById("close");

if (closeModal && closeModal instanceof HTMLSpanElement) {
  closeModal?.addEventListener("click", () => {
    overlay?.classList.add("hide-modal");
    modal?.classList.add("hide-modal");
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
    endDateLabel?.classList.add("hide-modal");
    endDateInput?.classList.add("hide-modal");
    endDateTimeLabel.classList.add("hide-modal");
    endDateTimeInput.classList.add("hide-modal");
  } else {
    endDateLabel.classList.replace("hide-modal", "modal__label");
    endDateInput.classList.replace("hide-modal", "modal__input");
    endDateTimeLabel.classList.replace("hide-modal", "modal__label");
    endDateTimeInput.classList.replace("hide-modal", "modal__input");
  }
  isEndDateVisible = !isEndDateVisible;
});

// //////// EVENT LISTENERS FOR CHECKBOX REMINDER

const reminmderCheckbox = document.getElementById("reminmderCheckbox");
const reminderTime = document.getElementById("reminderTime");

let isCheckboxVisible = false;

if (reminmderCheckbox && reminmderCheckbox instanceof HTMLInputElement) {
  reminmderCheckbox.addEventListener("click", () => {
    if (isCheckboxVisible) {
      reminderTime?.classList.add("hide-modal");
    } else {
      reminderTime?.classList.replace("hide-modal", "modal__label");
    }
    isCheckboxVisible = !isCheckboxVisible;
  });
}

// //////// EVENT LISTENERS FOR CLOSE MODAL
document.addEventListener("keydown", (event) => {
  if (overlay && overlay instanceof HTMLDivElement) {
    overlay?.addEventListener("click", () => {
      overlay.classList.add("hide-modal");
      modal?.classList.add("hide-modal");
    });
  }
  if (event.key === "Escape") {
    const modal = document.getElementById("modal");
    const eventContainer = document.getElementById("event-info");
    modal?.classList.add("hide-modal");
    eventContainer?.classList.replace("event--info", "hide-event");
    overlay?.classList.add("hide-modal");
  }
});

overlay?.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  const eventContainer = document.getElementById("event-info");
  modal?.classList.add("hide-modal");
  eventContainer?.classList.replace("event--info", "hide-event");
  overlay?.classList.add("hide-modal");
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
    console.log(reminderValue);
    const eventObject: Event = {
      title: titleValue,
      description: descriptionValue,
      dateString: dateValueString,//coger description del formulario
      date: dateValue,
      time: timeValue,
      timeString: timeValueString,
      completeDate: completeDate,
      endDate: completeEndDate, //hay que cambiarlo
      endDateString: endDateValueString,
      endTime: endTimeValue, //hay que cambiarlo
      endTimeString: endTimeValueString,
      type: convertToTypeEnum(typeValue), //coger reminder del formulario
      reminder: convertToReminderEnum(reminderValue),//coger reminder del formulario
    };

    StoreEvent(eventObject);
    overlay?.classList.add("hide-modal");
    modal?.classList.add("hide-modal");

  })
}

// /////// DELETE EVENT

const deleteButton = document.getElementById("delete-event");

// if (events) {
//   events.forEach((event) => {
//     event.addEventListener("click", () => {
//       console.log(event.textContent)
//       overlay?.classList.remove("hide-modal");


//       const eventContainer = document.getElementById("event-info");

//       eventContainer?.classList.replace("hide-event", "event--info");

//       const eventSpan = document.getElementById("event-span");

//       if (eventSpan) {
//         eventSpan.textContent = event.textContent;
//       }


//     })
//   })
// }