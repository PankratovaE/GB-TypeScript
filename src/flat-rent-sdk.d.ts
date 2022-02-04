import { SearchFormData } from './store/domain/search-form-data'
import { Place } from './store/domain/place'

export declare class FlatRentSdk {
    database: Object[]
    constructor()

    get(id: string): Place | null;
    search(params: SearchFormData): Promise<Place[] | null>;
    book(id: number, checkInDate: string, checkOutDate:string): number;

}

