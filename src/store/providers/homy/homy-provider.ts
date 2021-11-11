import { Place } from "../../domain/place.js";
import { Provider } from "../../domain/provider.js";
import { SearchFormData } from "../../domain/search-form-data.js";
import { dataDb } from './getData.js'

export class HomyProvider implements Provider {
    // public static provider = 'homy'
    // private static apiUrl = 'http://localhost:5555/places'

    private dataDb = dataDb;

    public search(formData: SearchFormData): Place[] {

        let price = formData.priceLimit;
        let allFind = [];
        let find = null;
        
        (function searchAll (data = this.dataDb, price) {
            for (let i in data) {
                if (data.hasOwnProperty(i)) {
                    if (i === 'totalPrice') {
                        if ( price >= data[i]) {
                            find = data;
                            allFind.push(data)
                        }
                    }
                    if (data[i] && data[i].constructor === Object) {
                    searchAll(data[i], price)
                    }
                }
            }
            return allFind;  
            })(this.dataDb, price)

        return allFind;
    }
}
 