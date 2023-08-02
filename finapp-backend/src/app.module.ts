import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModule } from './expense/expense.module';
import { InvestmentsModule } from './investments/investments.module';

@Module({
  imports: [PaymentsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ExpenseModule,
    InvestmentsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
