import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestmentDto } from './create-investment.dto';
import { Payment } from 'src/payments/entities/payment.entity';

export class UpdateInvestmentDto extends PartialType(CreateInvestmentDto) {
    payments: Payment[]
}
