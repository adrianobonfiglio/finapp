import type { Expense } from "../models/expense";
import { RouteConfig } from "../routes/route-config";

export abstract class AbstractRepository<T> {

    abstract url:string
    authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI4ODQ4ODMsInVzZXJfaWQiOjF9.tBgT8RzGaVCUeGtfJ8dbAriF0Ib9ptd4SlQZyIeNEvM"

    async getAll(): Promise<T[]> {
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

    async getOne(id: number): Promise<T> {
        let response = await fetch(RouteConfig.HOST_URL+this.url+"/"+id, {
            headers: {
                'Authorization': this.authorization
            }
        })
         return await response.json() as T
    }

    async remove(id: number) {
        const res = await fetch(RouteConfig.HOST_URL+this.url+id, {
            method: 'DELETE',
            headers: {
                'Authorization': this.authorization
            }
        })
    }

    async create(entity: T): Promise<T> {
        const res = await fetch(RouteConfig.HOST_URL+'/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authorization
            },
            body: JSON.stringify(entity),
        })

        if(res.status !== 201) {
            throw Error()
        }

        return res.json()
    }

    async update(entity: Expense) : Promise<Expense> {
        const res = await fetch(RouteConfig.HOST_URL+this.url+"/"+entity.ID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authorization
                
            },
            body: JSON.stringify(entity),
        })

        if(res.status !== 200) {
            throw Error()
        }

        return res.json()
    }
}