import type { MonthSpend } from "../models/MonthSpend";
import { RouteConfig } from "../routes/route-config";

export class MonthSpendRepository {

    url = "/dashboard/month-spend"
    authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI4ODQ4ODMsInVzZXJfaWQiOjF9.tBgT8RzGaVCUeGtfJ8dbAriF0Ib9ptd4SlQZyIeNEvM"

    async getMonthSpend(): Promise<MonthSpend> {
        const response = await fetch(RouteConfig.HOST_URL+this.url, {
            headers: {
                'Authorization': this.authorization
            }
        });
        if(response.status == 401) {
            throw Error()
        }
        return await response.json();
    };
} 