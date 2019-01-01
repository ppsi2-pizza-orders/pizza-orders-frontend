export class Order {

    public constructor(init?: Partial<Order>) {
        Object.assign(this, init);
    }

    id?: number;
    token: string;
    status: string;
    delivery_address: string;
    phone_number: string;
    pizzas: Array<object>;
}
