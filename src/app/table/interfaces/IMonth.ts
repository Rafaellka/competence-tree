export interface IMonth {
    name: string;
    value: string;
    startDate: Date;
}

export const months: IMonth[] = [
    {
        name: 'Январь',
        value: 'Jan',
        startDate: new Date('2023-01-01T00:00:00Z')
    }, {
        name: 'Февраль',
        value: 'Feb',
        startDate: new Date('2023-02-01T00:00:00Z')
    }, {
        name: 'Март',
        value: 'Mar',
        startDate: new Date('2023-03-01T00:00:00Z')
    },{
        name: 'Апрель',
        value: 'Apr',
        startDate: new Date('2023-04-01T00:00:00Z')
    },{
        name: 'Май',
        value: 'May',
        startDate: new Date('2023-05-01T00:00:00Z')
    },{
        name: 'Июнь',
        value: 'Jun',
        startDate: new Date('2023-06-01T00:00:00Z')
    },{
        name: 'Июль',
        value: 'Jul',
        startDate: new Date('2023-07-01T00:00:00Z')
    },{
        name: 'Август',
        value: 'Aug',
        startDate: new Date('2023-08-01T00:00:00Z')
    },{
        name: 'Сентябрь',
        value: 'Sep',
        startDate: new Date('2023-09-01T00:00:00Z')
    },{
        name: 'Октябрь',
        value: 'Oct',
        startDate: new Date('2023-10-01T00:00:00Z')
    },{
        name: 'Ноябрь',
        value: 'Nov',
        startDate: new Date('2023-11-01T00:00:00Z')
    },{
        name: 'Декабрь',
        value: 'Dec',
        startDate: new Date('2023-12-01T00:00:00Z')
    }
];
