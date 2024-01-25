// ///////// EVENT LISTENERS FOR ADD EVENT BUTTON
const eventButton = document.getElementById("add-event");
const label = document.querySelector("#add-event .header__button--text");

if (eventButton && eventButton instanceof HTMLButtonElement) {
  eventButton.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal?.classList.remove("hide-modal");
  })
}

if (label && label instanceof HTMLSpanElement) {
  label.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal?.classList.remove("hide-modal");
  })
}


// ///////// EVENT LISTENERS FOR CLOSE BUTTON
const closeModal = document.getElementById("close");

if (closeModal && closeModal instanceof HTMLButtonElement) {
  closeModal?.addEventListener("click", () => {
    const modal = document.getElementById("modal");
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

document.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (modal !== null && event.target !== null) {
    if (event.target !== modal && event.target !== eventButton && event.target !== label) {
      modal.classList.add("hide-modal");
    }
  }
});