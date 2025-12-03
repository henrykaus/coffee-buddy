import {RequiredVisitFieldsValidity} from '@/app/lib/types';
import {OrderType} from '@/app/lib/enums';
import {Visit} from '@/app/lib/types';

export const SEARCH_PLACEHOLDER_KEYWORDS = [
  'Vanilla Latte',
  'Starbucks',
  'The Blue Scorcher',
  'Insomnia',
  'Dutch',
  'Blackrock',
  'Flat White',
  'Smoothie',
  'Caramel',
  'Frappuccino',
  'Mocha',
  'Oat milk',
  'Lavender',
  'Cappuccino',
];

export const NOTES_PLACEHOLDER_KEYWORDS = [
  'Anything of note?',
  'Vibes?',
  'Feelings about the location?',
  'Notes',
  'Was it dark and dreary?',
  'Did it pick up your mood?',
  'Great for groups?',
  'Too quiet?',
  'Too loud?',
  'Is this your new home?',
];

export const DEFAULT_ADD_VISIT_REQUIRED_FIELDS: RequiredVisitFieldsValidity = {
  shopIsValid: false,
  drinkIsValid: false,
  priceIsValid: false,
};

export const DEFAULT_EDIT_VISIT_REQUIRED_FIELDS: RequiredVisitFieldsValidity = {
  shopIsValid: true,
  drinkIsValid: true,
  priceIsValid: true,
};

export const EMPTY_VISIT: Visit = {
  id: '',
  reconId: '',
  userId: '',
  date: null,
  notes: null,
  drink: '',
  orderType: OrderType.ToGo,
  price: -1,
  rating: -1,
  shopName: '',
  shopId: '',
  size: -1,
};
