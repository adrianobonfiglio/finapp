import { RouteConfig } from "../routes/route-config";
import { AbstractRepository } from "./AbstractRepository";

export class ExpensesReposiotry extends AbstractRepository<Expense>{
    
    url: string;

    constructor() {
        super()
        this.url = '/expenses/'
    }
}