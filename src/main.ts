
import { prevNext } from "./components/Calendar";

import { StoreEvent } from "./components/Modal";

// ///////// EVENT LISTENERS FOR ADD EVENT BUTTON
const eventButton = document.getElementById("add-event");
const label = document.querySelector("#add-event .header__button--text");
const modal = document.getElementById("modal");
const overlay = document.querySelector(".overlay");

if (eventButton && overlay && modal && eventButton instanceof HTMLButtonElement) {
  eventButton.addEventListener("click", () => {
    overlay.classList.remove("hide-modal");
    modal.classList.remove("hide-modal");
    const event = localStorage.getItem("events")
    console.log(event)
  })
}

if (label && modal && label instanceof HTMLSpanElement) {
  label.addEventListener("click", () => {
    modal.classList.remove("hide-modal");
  })
}


// ///////// EVENT LISTENERS FOR CLOSE BUTTON
const closeModal = document.getElementById("close");

if (closeModal && closeModal instanceof HTMLButtonElement) {
  closeModal?.addEventListener("click", () => {
    overlay?.classList.add("hide-modal");
    modal?.classList.add("hide-modal");
  })
}


if (overlay && overlay instanceof HTMLDivElement) {
  overlay?.addEventListener("click", () => {
    overlay.classList.add("hide-modal");
  })
}

// //////// EVENT LISTENERS FOR CLOSE MODAL
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const modal = document.getElementById("modal");
    modal?.classList.add("hide-modal");
  }
})

document.addEventListener("click", (event) => {
  const modal = document.querySelector("#modal .modal__div");
  if (modal !== null && event.target !== null) {
    if (event.target !== modal && event.target !== eventButton && event.target !== label) {
      modal.classList.add("hide-modal");
    }
  }
});

// EVENT LISTENERS FOR CALENDAR
const prenexIcons = document
  .querySelectorAll(".calendar--navigation span");

prenexIcons.forEach(icon => {

  // When an icon is clicked
  icon.addEventListener("click", () => {

    // Call the prevNext function
    prevNext(icon);
  })

});

// EVENT LISTENERS FOR MODAL

//  /////// EVENT LISTENERS FOR SUBMIT BUTTON

const submitButton = document.getElementById("submit");
const title = document.getElementById("title");
const date = document.getElementById("date");
const time = document.getElementById("time");

if (submitButton && submitButton instanceof HTMLButtonElement && title && title instanceof HTMLInputElement && date && date instanceof HTMLInputElement && time && time instanceof HTMLInputElement) {
  submitButton?.addEventListener("click", () => {
    const titleValue = title?.value;
    const dateValue = date?.value;
    const timeValue = time?.value;
    StoreEvent(titleValue, dateValue, timeValue);
  })
}
