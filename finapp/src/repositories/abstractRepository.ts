import { RouteConfig } from "../routes/route-config";

export abstract class AbstractRepository<T> {

    abstract url:string

    async getAll(): Promise<T[]> {
        const response = await fetch(RouteConfig.HOST_URL+this.url);
        return await response.json();
    };

    async getOne(id: string): Promise<T> {
        let response = await fetch(RouteConfig.HOST_URL+this.url+id)
         return await response.json() as T
    }

    async remove(id: string) {
        const res = await fetch(RouteConfig.HOST_URL+this.url+id, {
            method: 'DELETE'
        })
    }

    async create(entity: T): Promise<T> {
        const res = await fetch(RouteConfig.HOST_URL+'/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity),
        })

        if(res.status !== 201) {
            throw Error()
        }

        return res.json()
    }

    async update(entity: Expense) : Promise<Expense> {
        const res = await fetch(RouteConfig.HOST_URL+this.url+entity.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity),
        })

        if(res.status !== 200) {
            throw Error()
        }

        return res.json()
    }
}