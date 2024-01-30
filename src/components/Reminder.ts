import { Event, Reminder } from "../interfaces/event";

// Constants in TypeScript for time durations in milliseconds
// const oneHourInMs: number = 3600000;
// const thirtyMinutesInMs: number = 1800000;
// const fifteenMinutesInMs: number = 900000;
// const tenMinutesInMs: number = 600000;
// const fiveMinutesInMs: number = 300000;

// FiveMinuts ='00:05',
// TenMinuts = '00:10',
// FiveteenMinuts = '00:15',
// ThirtyMinuts = '00:30',
// OneHour = '01:00'

export function getReminderDuration(duration: Reminder): number {
  let reminderDuration: number = 0;
  switch (duration) {
    case "01:00":
      reminderDuration = 3600000;
      return reminderDuration; // 1 hour in milliseconds
    case "00:30":
      reminderDuration = 1800000;
      return reminderDuration; // 30 minutes in milliseconds
    case "00:15":
      reminderDuration = 900000;
      return reminderDuration; // 15 minutes in milliseconds
    case "00:10":
      reminderDuration = 600000;
      return reminderDuration; // 10 minutes in milliseconds
    case "00:05":
      reminderDuration = 300000;
      return reminderDuration; // 5 minutes in milliseconds
  }
  return reminderDuration;
}

export function setReminder(event: Event) {
  //console.log('funcionando');
  const eventDate = new Date(event.completeDate);
  //console.log(eventDate);
  const eventDateMS = eventDate.getTime(); // devuelve chorronumero de la fecha del evento
  const currentDateObject = Date.now();
  const currentDate = new Date(currentDateObject);
  const currentDateMS = currentDate.getTime();
  if (event.reminder && checkIsPastEventWithReminder(event)) {
    const reminderTime = getReminderDuration(event.reminder);
    const difference = eventDateMS - currentDateMS - reminderTime;
    console.log(difference);
    setTimeout(() => {
      if (difference === 0) { // Verifica si la diferencia es igual al tiempo del recordatorio
        alert(
          `Your event ${event.title
          } will start at ${eventDate.toLocaleTimeString()}.`
        );
      }
    }, difference);
  }
}


// const interval = setInterval(() => {
//   let eventsTotal = []
//   const events = localStorage.getItem("events");
//   if (events) {
//     eventsTotal = JSON.parse(events);
//   }

//   eventsTotal.forEach((event: Event) => {
//     const eventDate = new Date(event.completeDate);
//     const eventDateMS = eventDate.getTime();
//     if (event.reminder && checkIsPastEventWithReminder(event)) {
//       const reminderTime = getReminderDuration(event.reminder);
//       console.log(reminderTime);
//       const newCurrentDateMS = Date.now();
//       const difference = eventDateMS - newCurrentDateMS - reminderTime;
//       console.log(difference);
//       if (difference <= reminderTime) {
//         alert(
//           `Your event ${event.title
//           } will start at ${eventDate.toLocaleTimeString()}.`
//         );
//         clearInterval(interval);
//       }
//     }
//   })
// }, 1000);

// function reminderNotification(event: Event) {
//   setTimeout(() => {
//     alert(
//       `Your event ${event.title
//       } will start at ${event.endDate?.toLocaleTimeString()}.`
//     );
//   }, 1000);
// }

// function reminderInterval(event: Event) {
//   setInterval(() => {

//   }, 10000);
// }




//al entrar en el página, función forEach que guarde un item en local storage con un array de timestamps de todos los reminders que debo iniciar
// de este array. Ordenar el array (y todo el localstorage) por fecha de inicio. Función .sort().
//array vacío y push de todos los timestamps.
//El primer valor del array es el más cercano a ahora y es el que se pasa a setReminder.
//Después comprobar si hay algo más en el array de timestamps y activar el siguiente setReminder con el primer valor
// let sortedEvents: Event[] = [] ;
// //let sortedEvents: Event[] = [];
// export function sortEvents() {

//   const previousEvents = localStorage.getItem("events");

//   // const previousEvents = localStorage.getItem("events");
//   if (previousEvents) {
//     sortedEvents = JSON.parse(previousEvents);
//   }
//  console.log(previousEvents);
//   sortedEvents.sort((a, b) => a.startDateTimestamp - b.startDateTimestamp);
//   console.log(sortedEvents);
//   return sortedEvents;
// }

// if (
//   !checkIfIsPastEvent(sortedEvents[0].startDateTimestamp) &&
//   sortedEvents[0].reminder != undefined
// ) {
//   setReminder(sortedEvents[0]);
// } else {
//   sortedEvents.shift();
// }

export function checkIsPastEventWithReminder(event: Event) {
  if (event.reminder) {
    const reminderTime = getReminderDuration(event.reminder);
    const now = new Date().getTime();
    const timestamp = event.startDateTimestamp
    return timestamp - reminderTime < now;
  } else {
    return true;
  }
}
// function checkFirstEvent() {
//   if (
//     !checkIfIsPastEvent(sortedEvents[0].startDateTimestamp) &&
//     sortedEvents[0].reminder != null
//   ) {
//     setReminder(sortedEvents[0]);
//     return true
//   }

// }

// ///////////////////////////////////
// interface Evento {
//   startDateTimestamp: number;
//   reminder?: () => void; // Suponiendo que el recordatorio es una función
// }

export function checkEvents(sortedEvents: Event[]) {
  console.log(sortedEvents);
  while (sortedEvents.length > 0) {
    // Comprobar si el evento ya pasó o si no tiene recordatorio
    if (
      !checkIsPastEventWithReminder(sortedEvents[0]) &&
      sortedEvents[0].reminder
    ) {
      // Activar el recordatorio para el primer evento que no ha pasado y tiene recordatorio
      setReminder(sortedEvents[0]);
      break; // Salir del bucle después de activar el recordatorio
    } else {
      // Eliminar el primer evento si ya pasó o no tiene recordatorio y continuar con el siguiente
      sortedEvents.shift();
      console.log("hola");
      console.log(sortedEvents);
    }
  }
}

// Ejemplo de cómo usar la función `procesarEventos`
// const eventos: Evento[] = [
//   // Agrega aquí tus eventos con el formato { startDateTimestamp, reminder }
// ];

//procesarEventos(eventos);
//checkEvents(sortEvents())

let sortedEvents: Event[] = [];
export function sortTheEvents() {
  const previousEvents = localStorage.getItem("events");

  // const previousEvents = localStorage.getItem("events");
  if (previousEvents) {
    sortedEvents = JSON.parse(previousEvents);
  }

  sortedEvents.sort((a, b) => a.startDateTimestamp - b.startDateTimestamp);
  console.log(sortedEvents);
  return sortedEvents;
}

sortTheEvents();
checkEvents(sortTheEvents());
