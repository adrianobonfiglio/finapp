import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from './entities/investment.entity';

@Module({
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
  imports: [TypeOrmModule.forFeature([Investment])]
})
export class InvestmentsModule {}
