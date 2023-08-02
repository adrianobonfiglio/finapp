import { Injectable } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';

@Injectable()
export class InvestmentsService {

  constructor(
    @InjectRepository(Investment)
    private investmentRepository: Repository<Investment>
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

  update(id: string, updateInvestmentDto: UpdateInvestmentDto) {
    return this.investmentRepository.update(id, updateInvestmentDto)
  }

  remove(id: string) {
    this.remove(id)
  }
}
