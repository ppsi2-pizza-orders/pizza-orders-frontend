export class Ingredient {

    public constructor(init?: Partial<Ingredient>) {
        Object.assign(this, init);
    }

    id?: number;
    name: string;
    cost?: number;
    image: string;
    thumbnail: string;
    index: number;
}
