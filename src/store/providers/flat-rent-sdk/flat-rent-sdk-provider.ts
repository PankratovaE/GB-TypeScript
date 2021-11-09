import { HttpHelper } from "../../domain/http-helper.js";
import { Place } from "../../domain/place.js";
import { Provider } from "../../domain/provider.js";
import { SearchFilter } from "../../domain/search-filter.js";
import { PlaceListResponse, PlaceResponse, Place as SDKPlace } from "./response.js"

export class FlatRentProvider implements Provider {
    public static provider = 'flat-rent'
    private static apiUrl = 'http://localhost:5555/places'

    public find(filter: SearchFilter): Promise<Place[]> {
        return HttpHelper.fetchAsJson<PlaceListResponse>(
            FlatRentProvider.apiUrl
        )
        .then((response) => {
            this.assertIsValidResponse(response)
            return this.convertPlaceListResponse(response)
        })
    }

    public getById(id: string): Promise<Place> {
        return HttpHelper.fetchAsJson<PlaceResponse>(FlatRentProvider.apiUrl + '/place/' + id)
        .then((response) => {
            this.assertIsValidResponse(response)
            return this.convertPlaceResponse(response.item)
        })
    }
    private assertIsValidResponse(response: PlaceListResponse | PlaceResponse): void {
        if (response.errorMessage != null) {
            throw new Error(response.errorMessage)
        }
    }
    private convertFilterToQueryString(filter: SearchFilter): string {
        return `search=${filter.price}` + `&dates=${filter.dateIn} ${filter.dateOut}`
    }
    private convertPlaceListResponse(response: PlaceListResponse): Place[] {
        return response.items.map((item) => {
            return this.convertPlaceResponse(item)
        })
    }
    private convertPlaceResponse(item: SDKPlace): Place {
        return new Place(
            FlatRentProvider.provider,
            String(item.id),
            item.title,
            item.details,
            item.photos,
            item.coordinates,
            item.bookedDates,
            item.totalPrice,
        )
    }
}