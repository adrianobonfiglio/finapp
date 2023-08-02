import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import { Payment } from 'src/payments/entities/payment.entity';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
    payments: Payment[]
}
