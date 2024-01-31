export interface Event {

    title: string,
    description: string,
    dateString: string,
    date: Date,
    time: number,
    timeString: string,
    completeDate: Date,
    startDateTimestamp: number,
    endDate: Date | null,
    endDateString: string | null,
    endTime: number | null,
    endTimeString: string | null,
    type: EventType | null,
    reminder: Reminder | null
}

export const enum EventType {
    Meeting = 'Meeting',
    Party = 'Party',
    Work = 'Work',
    Conference = 'Conference',
    Other = 'Other'
}
export const enum Reminder {
    FiveMinutes = '00:05',
    TenMinutes = '00:10',
    FifteenMinutes = '00:15',
    ThirtyMinutes = '00:30',
    OneHour = '01:00'

}