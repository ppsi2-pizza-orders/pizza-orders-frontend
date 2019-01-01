export class Order {

    public constructor(init?: Partial<Order>) {
        Object.assign(this, init);
    }

    id?: number;
    restaurant_id?: number;
    token: string;
    status: string;
    price: string;
    delivery_address: string;
    phone_number: string;
    pizzas: Array<object>;
}
