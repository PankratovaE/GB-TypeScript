import { Place } from './place.js'
import { SearchFormData  } from './search-form-data.js'

export interface Provider {
    search(filter: SearchFormData): Place[]
    // getById(id: string): Promise<Place>
}