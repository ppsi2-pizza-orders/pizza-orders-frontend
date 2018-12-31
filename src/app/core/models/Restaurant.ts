import { Review } from './Review';
import { Pizza } from './Pizza';
import { Ingredient } from './Ingredient';

export class Restaurant {

    public constructor(init?: Partial<Restaurant>) {
        Object.assign(this, init);
    }

    id?: number;
    name: string;
    city: string;
    address: string;
    phone: string;
    photo?: string;
    owner?: Object;
    created_at?: string;
    description?: string;
    review_stars?: number;
    reviews?: Array<Review>;
    pizzas?: Array<Pizza>;
    ingredients?: Array<Ingredient>;
}
