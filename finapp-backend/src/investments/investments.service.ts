import { Injectable } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Injectable()
export class InvestmentsService {

  constructor(
    @InjectRepository(Investment)
    private investmentRepository: Repository<Investment>,
  ){}

  create(createInvestmentDto: CreateInvestmentDto) {
    return this.investmentRepository.save(createInvestmentDto)
  }

  findAll() {
    return this.investmentRepository.find()
  }

  findOne(id: string) {
    return this.investmentRepository.findOne({where: {id: id}})
  }

  async findInvestmenetPayments(id: string) {
    const investment = await this.investmentRepository.findOne({relations: ['payments'], where: {id: id}})
    return investment
  }

  update(id: string, updateInvestmentDto: UpdateInvestmentDto) {
    return this.investmentRepository.update(id, updateInvestmentDto)
  }
  
  addPayment(id: string, payment: Payment) {
    this.findOne(id).then((investment) => {
      investment.payments = [payment]
      this.investmentRepository.save(investment)
    })
  }


  remove(id: string) {
    this.remove(id)
  }
}
