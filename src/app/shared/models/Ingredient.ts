export class Ingredient {

    public constructor(init?: Partial<Ingredient>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    cost: number;
    photo: string;
    available: boolean;
}
