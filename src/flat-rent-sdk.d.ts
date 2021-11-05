import { SearchFormData } from './search-form.js'
export declare class FlatRentSdk {
    database: Object[]
    constructor()

    get(id: string): Flat | null;
    search(params: Object): Promise<Flat | null>;
    book(id: number, checkInDate: string, checkOutDate:string): number;

    }
export interface Flat {
    id: string,
    title: string,
    details: string,
    photos: string[],
    coordinates: number[],
    bookedDates: [],
    price: number
}

