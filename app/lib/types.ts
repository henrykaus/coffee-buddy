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
  address: string;
}

/**
 * This class maps exactly what Google Places responds with for queries
 */
export interface GoogleMapsEntry {
  id: string;
  displayName: {
    text: string;
  };
  formattedAddress: string;
  businessStatus: string;
}

export interface Coordinates {
  latitude?: number;
  longitude?: number;
}

export interface VisitAction {
  action: VisitActionType;
  isClient: boolean;
  isError: boolean;
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
