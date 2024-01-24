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
