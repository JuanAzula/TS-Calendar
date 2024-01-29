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

function getReminderDuration(duration: Reminder): number {
    let reminderDuration:  number = 0
    switch (duration) {
      case '01:00':
        reminderDuration =  3600000; 
        return reminderDuration// 1 hour in milliseconds
      case '00:30':
        reminderDuration =  1800000;
        return reminderDuration // 30 minutes in milliseconds
      case '00:15':
        reminderDuration =  900000;
        return reminderDuration // 15 minutes in milliseconds
      case '00:10':
        reminderDuration = 600000;
        return reminderDuration // 10 minutes in milliseconds
      case '00:05':
        reminderDuration =  300000;
        return reminderDuration // 5 minutes in milliseconds
    }
    return reminderDuration
  }

export function setReminder(event:Event){
    console.log('funcionando');
    const eventDate = new Date (event.completeDate);
    console.log(eventDate);
    const eventDateMS = eventDate.getTime() // devuelve chorronumero de la fecha del evento
    const currentDateObject = Date.now();
    const currentDate = new Date(currentDateObject)
    const currentDateMS = currentDate.getTime()
    if (event.reminder){
    const reminderTime = getReminderDuration(event.reminder)
    const difference = eventDateMS - currentDateMS - reminderTime;
    console.log(difference);
    setTimeout(() => {
        alert(`Your event ${event.title} will start at ${eventDate.toLocaleTimeString()}.`);
    }, difference);}

      
}

