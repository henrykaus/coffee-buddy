import {OrderType, ToastType, VisitActionType} from './enums';

export interface User {
  id?: string;
  email: string;
}

export interface Visit {
  id: string;
  reconId?: string; // This should only be used to reconcile between client and db visit records
  userId?: string;
  date: string | null;
  notes: string | null;
  drink: string;
  orderType: OrderType;
  price: number;
  rating: number;
  shopName: string;
  shopId: string;
  size: number;
}

export interface Shop {
  id: string;
  name: string;
  city: string;
  state: string;
  street: string;
}

/**
 * This class maps exactly what Nominatim responds with for queries
 */
export interface NominatimEntry {
  osm_id: number;
  osm_type: string;
  address: {
    city: string;
    hamlet: string;
    house_number: string;
    neighborhood: string;
    road: string;
    state: string;
    town: string;
    village: string;
  };
  name: string;
}

export interface GoogleMapsEntry {
  id: string;
  displayName: {
    text: string;
  };
  formattedAddress: string;
  businessStatus: string;
}

export interface VisitAction {
  action: VisitActionType;
  isClient: boolean;
  visit: Visit;
}

export interface ToastConfig {
  message: string;
  type: ToastType;
}

export interface PatchNotes {
  date?: string;
  divider?: boolean;
  features?: string[];
  fixes?: string[];
  title: string;
}

export interface RequiredVisitFieldsValidity {
  shopIsValid: boolean;
  drinkIsValid: boolean;
  priceIsValid: boolean;
}
