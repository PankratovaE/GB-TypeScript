export class Place {
    constructor(
        private readonly provaider: string,
        readonly originalId: string,
        readonly title: string,
        readonly details: string,
        readonly photos: string [],
        readonly coordinates: [],
        readonly bookedDates: string[],
        readonly totalPrice: number
    ){}

    get id() {
        return this.provaider + '-' + this.originalId
    }
    public isProvidedBy(provaiderName: string): boolean {
        return this.provaider === provaiderName
    }
    
  }