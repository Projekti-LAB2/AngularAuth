import { City } from './City';

export interface Offer {
  OfferId: number;
  OfferName: string;
  CityId: number;
  City: City;
  OfferDescription?: string;
  Price: number;
  Image?: string;
}

export default Offer;
