import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, HttpException, Res } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Response } from 'express';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    console.log(createExpenseDto)
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(id);
  }

  @Get(':id/payments')
  async findPayments(@Param('id') id: string, @Query('month') month: number, @Query('year') year: number, @Res() response: Response) {
    let expense = await this.expenseService.findExpensePaymentsByMonth(id, month, year);
    if(expense == null) {
      return response.status(HttpStatus.NOT_FOUND).send()
    }
    response.send(expense.payments)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }
}
