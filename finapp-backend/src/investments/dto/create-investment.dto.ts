import { Double } from "typeorm"

export class CreateInvestmentDto {
    type: string
    availableFrom: Date
    active: true
    balance: Double
}
