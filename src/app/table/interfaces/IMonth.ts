export interface IMonth {
    name: string;
    value?: string;
    date: Date;
}

export const months: IMonth[] = [
    {
        name: 'Январь',
        value: 'Jan',
        date: new Date('2023-01-01T00:00:00Z')
    }, {
        name: 'Февраль',
        value: 'Feb',
        date: new Date('2023-02-01T00:00:00Z')
    }, {
        name: 'Март',
        value: 'Mar',
        date: new Date('2023-03-01T00:00:00Z')
    }, {
        name: 'Апрель',
        value: 'Apr',
        date: new Date('2023-04-01T00:00:00Z')
    }, {
        name: 'Май',
        value: 'May',
        date: new Date('2023-05-01T00:00:00Z')
    }, {
        name: 'Июнь',
        value: 'Jun',
        date: new Date('2023-06-01T00:00:00Z')
    }, {
        name: 'Июль',
        value: 'Jul',
        date: new Date('2023-07-01T00:00:00Z')
    }, {
        name: 'Август',
        value: 'Aug',
        date: new Date('2023-08-01T00:00:00Z')
    }, {
        name: 'Сентябрь',
        value: 'Sep',
        date: new Date('2023-09-01T00:00:00Z')
    }, {
        name: 'Октябрь',
        value: 'Oct',
        date: new Date('2023-10-01T00:00:00Z')
    }, {
        name: 'Ноябрь',
        value: 'Nov',
        date: new Date('2023-11-01T00:00:00Z')
    }, {
        name: 'Декабрь',
        value: 'Dec',
        date: new Date('2023-12-01T00:00:00Z')
    }
];
