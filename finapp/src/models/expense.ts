import type { Payment } from "./payment";

export interface Expense {
    ID: number;
    type: string;
    description: string
    dueDay: number;
    value: number;
    availableFrom: string;
    active: boolean;
    payments: Payment[]
}