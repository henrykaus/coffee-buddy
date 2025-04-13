import {OrderType} from './enums';

export interface User {
  id?: string;
  email: string;
}

export interface Visit {
  id: string;
  userId?: string;
  date: string;
  notes: string | null;
  drink: string;
  orderType: OrderType;
  price: number;
  rating: number;
  shop: string;
  size: number;
}

export interface Shop {
  id: string;
  name: string;
  city: string;
  state: string;
}
