export interface Event {

    title: string, 
    description: string,
    dateString: string,
    date: Date,
    time: number, 
    completeDate: Date,
    endDate: Date | null,
    endTime: number | null,
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
    FiveMinutes ='00:05',
    TenMinutes = '00:10',
    FifteenMinutes = '00:15',
    ThirtyMinutes = '00:30',
    OneHour = '01:00'

}