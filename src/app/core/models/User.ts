import { RESTAURANT_ROLES } from '..';

export class User {

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    id: number;
    email: string;
    password: string;
    admin: number;
    restaurants?: Array<Object>;
    firstName?: string;
    lastName?: string;
    name?: string;

    public isAdmin(): boolean {
        return this.admin === 1;
    }

    public isRestaurantMember(restaurantID?: number): boolean {
        if (restaurantID) {
            return this.restaurants.find(r => r['id'] === restaurantID) ? true : false;
        }
        return this.restaurants.length > 0;
    }

    public getRestaurantRole(): RESTAURANT_ROLES {
        if (this.isRestaurantMember()) {
            return this.restaurants['role'];
        }
    }
}
