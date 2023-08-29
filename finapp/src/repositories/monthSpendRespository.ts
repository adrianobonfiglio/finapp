import type { MonthSpend } from "../models/month-spend";
import { RouteConfig } from "../routes/route-config";
import { AbstractRepository } from "./abstractRepository";

export class MonthSpendRepository extends AbstractRepository<MonthSpend>{

    url = "/dashboard/month-spend"

    async getMonthSpend(): Promise<MonthSpend> {
        return fetch(RouteConfig.HOST_URL+this.url, {
            headers: {
                'Authorization': this.authorization
            }
        }).then(response => {
            if(response.status === 401) {
                throw new Error()
            }
            return response.json() as Promise<MonthSpend>
        })
    }
} 