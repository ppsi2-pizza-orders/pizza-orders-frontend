import { Ingredient } from './Ingredient';

export class Pizza {

    public constructor(init?: Partial<Pizza>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    price: number;
    ingredients: Array<Ingredient>;
}
