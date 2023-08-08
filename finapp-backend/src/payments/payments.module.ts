import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { ExpenseService } from 'src/expense/expense.service';
import { InvestmentsService } from 'src/investments/investments.service';
import { ExpenseModule } from 'src/expense/expense.module';
import { InvestmentsModule } from 'src/investments/investments.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService], 
  imports: [TypeOrmModule.forFeature([Payment]), ExpenseModule]
})
export class PaymentsModule {}
