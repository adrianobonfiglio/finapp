import { Payment } from "src/payments/entities/payment.entity"
import { Double } from "typeorm"

export class CreateExpenseDto {
    type: string
    dueDay: Number
    availableFrom: Date
    active: true
    value: Double
}
