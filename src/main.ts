
import { createCalendar } from "./components/Calendar"
import { StoreEvent } from "./components/Modal";


document.addEventListener("DOMContentLoaded", () => {

  // getEvents();
})




// ///////// EVENT LISTENERS FOR ADD EVENT BUTTON
const eventButton = document.getElementById("add-event");

if (eventButton && eventButton instanceof HTMLButtonElement) {
  eventButton.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal?.classList.remove("hide-modal");
  })
}

const closeModal = document.getElementById("close");

if (closeModal && closeModal instanceof HTMLButtonElement) {
  closeModal?.addEventListener("click", () => {

    const modal = document.getElementById("modal");
    modal?.classList.add("hide-modal");
  })
}

    overlay?.classList.add("hide-modal");
    modal?.classList.add("hide-modal");
  })
}

// ///////// CALENDAR
createCalendar(new Date().getMonth(), new Date().getFullYear());


// //////// EVENT LISTENERS FOR CLOSE MODAL
document.addEventListener("keydown", (event) => {
  if (overlay && overlay instanceof HTMLDivElement) {
    overlay?.addEventListener("click", () => {
      overlay.classList.add("hide-modal");
      modal?.classList.add("hide-modal");
    })
  }
  if (event.key === "Escape") {
    const modal = document.getElementById("modal");
    modal?.classList.add("hide-modal");
  }
})

//  /////// EVENT LISTENERS FOR SUBMIT BUTTON

const submitButton = document.getElementById("submit");
const title = document.getElementById("title");
const date = document.getElementById("date");
const time = document.getElementById("time");

if (submitButton && submitButton instanceof HTMLButtonElement && title && title instanceof HTMLInputElement && date && date instanceof HTMLInputElement && time && time instanceof HTMLInputElement) {
  submitButton?.addEventListener("click", (event) => {
    console.log("hola")
    event?.preventDefault();
    const titleValue = title?.value;
    const dateValue = date?.value;
    const timeValue = time?.value;
    console.log(titleValue, dateValue, timeValue)
    StoreEvent(titleValue, dateValue, timeValue);
    overlay?.classList.add("hide-modal");
    modal?.classList.add("hide-modal");
  })
}

//  /////// EVENT LISTENERS FOR CHECKBOX

const endDateCheckbox = document.getElementById('checkbox');
const endDateLabel = document.getElementById('endDate-label');
