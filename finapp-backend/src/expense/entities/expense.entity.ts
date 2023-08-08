import { Payment } from "src/payments/entities/payment.entity"
import { Column, Double, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    type: string
    @Column()
    dueDay: Number
    @Column()
    availableFrom: Date
    @Column()
    active: boolean
    @Column('double')
    value: Double
    @ManyToMany(() => Payment, {cascade: ["insert", "update"]})
    @JoinTable()
    payments: Payment[]
}
