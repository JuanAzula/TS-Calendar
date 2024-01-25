// ///////// EVENT LISTENERS FOR ADD EVENT BUTTON
const eventButton = document.getElementById("add-event");
const label = document.querySelector("#add-event .header__button--text");
const modal = document.getElementById("modal");
const overlay = document.querySelector(".overlay");

if (eventButton && overlay && modal && eventButton instanceof HTMLButtonElement) {
  eventButton.addEventListener("click", () => {
    overlay.classList.remove("hide-modal");
    modal.classList.remove("hide-modal");
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
    const modal = document.getElementById("modal");
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
  }
})

// document.addEventListener("click", (event) => {
//   const modal = document.getElementById("modal-div");
//   if (modal !== null && event.target !== null) {
//     if (event.target !== modal && event.target !== eventButton && event.target !== label) {
//       modal.classList.add("hide-modal");
//     }
//   }
// });