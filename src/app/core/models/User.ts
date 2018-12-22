export class User {

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    id: number;
    email: string;
    password: string;
    role: Array<string>;
    restaurant_id?: number;
    firstName?: string;
    lastName?: string;
    name?:string;
}
