import { Ingredient } from './Ingredient';
import { Product } from './IProduct';

export class Pizza implements Product {

    public constructor(init?: Partial<Pizza>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    price: string;
    ingredients: Array<Ingredient>;
    type?: string;
}
