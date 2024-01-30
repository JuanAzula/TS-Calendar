export interface Event {

    title: string,
    description: string,
    date: string,
    time: string,
    endDate: string | null,
    endTime: string | null,
    type: EventType,
    reminder: Reminder | null
}

export const enum EventType {
    Meeting = 'meeting',
    Party = 'party',
    Work = 'work',
    Conference = 'conference',
    Other = 'other'
}
export const enum Reminder {
    FiveMinuts = '00:05',
    TenMinuts = '00:10',
    FiveteenMinuts = '00:15',
    ThirtyMinuts = '00:30',
    OneHour = '01:00'

}