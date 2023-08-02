interface Expense {
    id: string;
    type: string;
    dueDay: number;
    value: number;
    availableFrom: string;
    active: boolean;
}