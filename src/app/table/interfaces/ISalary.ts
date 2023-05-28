export interface ISalary {
    id?: number;
    employeeId: string;
    wage: IChangeableField<number>;
    rate: IChangeableField<number>;
    bonus: IChangeableField<number>;
    startDate: Date;
}

export interface IChangeableField<T> {
    isChangeMode: boolean;
    value: T;
}