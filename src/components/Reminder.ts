import { Event, Reminder } from "../interfaces/event";



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
  const eventDate = new Date(event.completeDate);
  const eventDateMS = eventDate.getTime();
  const currentDateObject = Date.now();
  const currentDate = new Date(currentDateObject);
  const currentDateMS = currentDate.getTime();
  if (event.reminder && checkIsPastEventWithReminder(event)) {
    const reminderTime = getReminderDuration(event.reminder);
    const difference = eventDateMS - currentDateMS - reminderTime;
    setTimeout(() => {
      if (difference === 0) {
        alert(
          `Your event ${event.title
          } will start at ${eventDate.toLocaleTimeString()}.`
        );
      }
    }, difference);
  }
}


export function checkIsPastEventWithReminder(event: Event) {
  if (event.reminder) {
    const reminderTime = getReminderDuration(event.reminder);
    const now = new Date().getTime();
    const timestamp = event.startDateTimestamp
    return timestamp - now + 100000 > reminderTime;
  }
}


export function checkEvents(sortedEvents: Event[]) {
  while (sortedEvents.length > 0) {
    if (
      !checkIsPastEventWithReminder(sortedEvents[0]) &&
      sortedEvents[0].reminder
    ) {
      setReminder(sortedEvents[0]);
      break;
    } else {
      sortedEvents.shift();
    }
  }
}



let sortedEvents: Event[] = [];
export function sortTheEvents() {
  const previousEvents = localStorage.getItem("events");

  if (previousEvents) {
    sortedEvents = JSON.parse(previousEvents);
  }

  sortedEvents.sort((a, b) => a.startDateTimestamp - b.startDateTimestamp);
  return sortedEvents;
}

sortTheEvents();
checkEvents(sortTheEvents());
