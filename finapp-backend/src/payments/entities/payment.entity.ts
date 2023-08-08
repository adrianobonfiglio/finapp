import { Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export abstract class Payment {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    type: string
    @Column()
    description: string
    @Column('double')
    value: Double
    @Column()
    date: Date
}
