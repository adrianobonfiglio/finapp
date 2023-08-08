import { Get, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatePaymentDto } from 'src/payments/dto/create-payment.dto';
import { PaymentsService } from 'src/payments/payments.service';
import { Payment } from 'src/payments/entities/payment.entity';
import { error } from 'console';


@Injectable()
export class ExpenseService {

  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>
  ){}

  create(createExpenseDto: CreateExpenseDto) {
    return this.expenseRepository.save(createExpenseDto)
  }

  findAll() {
    return this.expenseRepository.find({relations: ['payments']})
  }

  findAllActiveForMonth() {
    return this.expenseRepository.find({relations: ['payments'], where: {active: true}})
  }

  findOne(id: string) {
    return this.expenseRepository.findOne({where: {id: id}})
  }

  async findExpensePayments(id: string) {
    return this.expenseRepository.findOne({relations: ['payments'], where: {id: id}})
  }

  findExpensePaymentsByMonth(id: string, month: number, year: number){
    let firstDayOfMonth = new Date(year, month-1, 0)
    let lastDayOfMonth = new Date(year, month, 0)
    let expense: Expense
  
    return this.expenseRepository.findOne(
      {
        relations: ['payments'], 
        where: {id: id, payments: {
          date: Between(
            firstDayOfMonth,
            lastDayOfMonth
          )
        }}
      }
      )
  }

  addPayment(id: string, payment: Payment) {
    this.findExpensePayments(id).then((expense) => {
      //expense.payments
      this.expenseRepository.save(expense)
    })
  }

  update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.expenseRepository.update(id, updateExpenseDto)
  }

  remove(id: string) {
    this.expenseRepository.delete(id)
  }

}
