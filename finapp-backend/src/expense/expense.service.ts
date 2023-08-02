import { Get, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    return this.expenseRepository.find()
  }

  findOne(id: string) {
    return this.expenseRepository.findOne({where: {id: id}})
  }

  async findExpensePayments(id: string) {
    const expense = await this.expenseRepository.findOne({relations: ['payments'], where: {id: id}})
    return expense.payments

  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    console.log(updateExpenseDto.payments)
    return this.expenseRepository.update(id, updateExpenseDto)
  }

  remove(id: number) {
    this.expenseRepository.delete(id)
  }
}
