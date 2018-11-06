import { Review } from './Review';
import { Pizza } from './Pizza';
import { Ingredient } from './Ingredient';

export class Restaurant {

    public constructor(init?: Partial<Restaurant>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    city: string;
    adress: string;
    phone: string;
    photo?: string;
    description?: string;
    review?: number;
    reviews?: Array<Review>;
    pizzas?: Array<Pizza>;
    ingredients?: Array<Ingredient>;
}
