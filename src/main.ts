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
    modal?.classList.add("hide-modal");
  })
}

// //////// EVENT LISTENERS FOR CLOSE MODAL
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const modal = document.getElementById("modal");
    modal?.classList.add("hide-modal");
  })
}

// ///////// CALENDAR
7
import { createCalendar } from "./components/Calendar"
createCalendar(new Date().getMonth(), new Date().getFullYear());