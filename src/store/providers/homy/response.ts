export interface PlaceListResponse {
    errorMessage?: string,
    items: Place[]
}

export interface PlaceResponse {
    errorMessage?: string,
    item: Place
}

export interface Place {
    "id": number,
    "title": string,
    "details": string,
    "photos": string [],
    "coordinates": [],
    "bookedDates": string[],
    "totalPrice": number
  }