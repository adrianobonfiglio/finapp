import { Payment } from "src/payments/entities/payment.entity";
import { Column, Double, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Investment {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    type: string
    @Column()
    availableFrom: Date
    @Column()
    active: boolean
    @Column('double')
    balance: Double
    @ManyToMany(() => Payment, {cascade: ['insert', 'update', 'soft-remove']})
    @JoinTable()
    payments: Payment[]

}
