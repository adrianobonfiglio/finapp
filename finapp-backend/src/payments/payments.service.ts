import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ){}

  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepository.save(createPaymentDto)
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
