import { Event } from "./event";

export interface Calendar {
    eventList: Event[],
    title: string,
    currentMonth: Months
}

export enum Months {
    January = 1,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
  }