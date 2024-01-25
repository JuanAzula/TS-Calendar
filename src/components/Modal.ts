
export const StoreEvent = (title: string, date: string, time: string) => {
    if (title && date && time) {
        // Obtener la lista actual de eventos del localStorage
        const previousEvents = localStorage.getItem("events");
        let eventsTotal: { title: string, date: string, time: string }[] = [];
        if (previousEvents) {
            eventsTotal = JSON.parse(previousEvents);
        }

        // Agregar el nuevo evento a la lista
        eventsTotal.push({ title, date, time });

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem("events", JSON.stringify(eventsTotal));
    }
}