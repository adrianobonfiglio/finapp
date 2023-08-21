import type { Expense } from "../models/expense";
import type { Payment } from "../models/payment";
import { RouteConfig } from "../routes/route-config";
import { AbstractRepository } from "./abstractRepository";

export class ExpensesReposiotry extends AbstractRepository<Expense>{
    url: string;

    constructor() {
        super()
        this.url = '/expenses'
    }


	async getExpensesWithPaymentsByMonth(month: number, year: number) {
        let response = await fetch(RouteConfig.HOST_URL+this.url+"?month="+month+'&year='+year,{
            headers: {
                'Authorization': this.authorization
            }
        })
        return await response.json() as Expense[]
	}
    
}