import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Expense } from 'src/expense/entities/expense.entity';
import { ExpenseService } from 'src/expense/expense.service';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private expenseService: ExpenseService
  ){}

  async create(createPaymentDto: CreatePaymentDto) {
    return await this.paymentRepository.save(createPaymentDto)
    .then((payment) => {
      if(createPaymentDto.expenseId != null) {
        this.expenseService.addPayment(createPaymentDto.expenseId, payment)
      }
    })

  }

  findAll() {
    return this.paymentRepository.find()
  }

  findOne(id: string) {
    return this.paymentRepository.find({where: {id: id}})
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(id, updatePaymentDto)
  }

  remove(id: string,) {
    this.paymentRepository.delete(id)
  }
}
