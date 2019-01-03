import { RestaurantRoles } from '..';


export class User {

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    id: number;
    email: string;
    password: string;
    admin: number;
    restaurants?: Array<object>;
    firstName?: string;
    lastName?: string;
    name?: string;

    public isAdmin(): boolean {
        return this.admin === 1;
    }

    public isRestaurantMember(restaurantID: number): boolean {
        return this.restaurants.find(r => r['id'] === restaurantID) ? true : false;
    }

    public isAnyRestaurantMember(): boolean {
        return this.restaurants.length > 0;
    }

    public getRestaurantRole(restaurantID: number): RestaurantRoles {
        if (this.isRestaurantMember(restaurantID)) {
            return this.restaurants.find(r => r['id'] === restaurantID)['role'];
        }
    }

    public getRestaurantToken(restaurantID: number): string {
        if (this.isRestaurantMember(restaurantID)) {
            return this.restaurants.find(r => r['id'] === restaurantID)['token'];
        }
    }
}
