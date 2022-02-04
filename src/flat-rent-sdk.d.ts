import { Places, Place } from './search-form.js'
export declare class FlatRentSdk {
    database: Object[]
    constructor()

    get(id: string): Place | null;
    search(params: Object): Promise<Places | null>;
    book(id: number, checkInDate: string, checkOutDate:string): number;

}

