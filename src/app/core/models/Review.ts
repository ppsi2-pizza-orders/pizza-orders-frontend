import { User } from './User';

export class Review {

    public constructor(init?: Partial<Review>) {
        Object.assign(this, init);
    }

    id: number;
    user: User;
    base_rating: number;
    ingredients_rating: number;
    delivery_time_rating: number;
    comment?: string;
    created_at: number;
}
