'use server';

import {GoogleMapsEntry, NominatimEntry, Shop} from '@/app/lib/types';
import {logError} from '@/app/server/common';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

const NOMINATIM_SEARCH_URL = `${NOMINATIM_BASE_URL}/search?countrycodes=us&addressdetails=1&layer=poi,address&format=jsonv2`;

const GOOGLE_PLACES_BASE_URL =
  'https://places.googleapis.com/v1/places:searchText';

const shortenAddress = (address: string) => {
  if (!address) {
    return '';
  }

  let newAddress = address.replace(/^north /i, 'N ');
  newAddress = newAddress.replace(/^south /i, 'S ');
  newAddress = newAddress.replace(/^east /i, 'E ');
  newAddress = newAddress.replace(/^west /i, 'W ');
  newAddress = newAddress.replace(/^southwest /i, 'SW ');
  newAddress = newAddress.replace(/^southeast /i, 'SE ');
  newAddress = newAddress.replace(/^northwest /i, 'NW ');
  newAddress = newAddress.replace(/^northeast /i, 'NE ');

  newAddress = newAddress.replace(/ road$/i, ' Rd');
  newAddress = newAddress.replace(/ lane$/i, ' Ln');
  newAddress = newAddress.replace(/ street$/i, ' St');
  newAddress = newAddress.replace(/ highway$/i, ' Hwy');
  newAddress = newAddress.replace(/ boulevard$/i, ' Blvd');
  newAddress = newAddress.replace(/ avenue$/i, ' Ave');

  return newAddress;
};

const convertNominatimEntryToShop = (
  entry: NominatimEntry,
  makeSpecific: boolean = false,
): Shop => {
  const street = !makeSpecific ? '' : shortenAddress(entry.address.road);
  const houseNumber = !makeSpecific ? '' : entry.address.house_number;

  const id = `${entry.osm_type[0].toUpperCase()}${entry.osm_id}`;

  return {
    id: id,
    name: entry.name,
    city:
      entry.address.city ??
      entry.address.town ??
      entry.address.village ??
      entry.address.hamlet,
    state: entry.address.state,
    street: street,
    houseNumber: houseNumber,
  };
};

const convertGoogleMapsEntryToShop = (entry: GoogleMapsEntry): Shop => {
  const address = entry.formattedAddress;
  let cleanAddress = address
    .split('')
    .reverse()
    .join('')
    .replace(/^.*\d{5}\s/, '')
    .split('')
    .reverse()
    .join('')
    .trim();

  const streetNumber = cleanAddress.split(' ', 1)[0];

  cleanAddress = cleanAddress.replace(streetNumber, '');
  cleanAddress = cleanAddress.trimStart();
  const splitAddress = cleanAddress.split(', ');

  const city = splitAddress[splitAddress.length - 2];
  const state = splitAddress[splitAddress.length - 1];
  const street = splitAddress[0];

  return {
    id: entry.id,
    name: entry.displayName.text,
    city: city,
    state: state,
    street: street,
    houseNumber: streetNumber,
  };
};

export const searchShops = async (query: string) => {
  const data = await fetch(
    `${NOMINATIM_SEARCH_URL}&q=${encodeURIComponent(query)}`,
    {
      method: 'GET',
      headers: {
        Referer: 'https://coffee-buddy.henrykaus.com',
      },
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      logError(error);
    });

  // console.log('Nominatim', data);

  const entryDict: Map<string, NominatimEntry[]> = new Map();
  data.forEach((entry: NominatimEntry) => {
    if (entry.name) {
      const key =
        `${entry.name}-${entry.address.city ?? entry.address.town}`.toLowerCase();

      const dictValue = entryDict.get(key);
      if (dictValue) {
        dictValue.push(entry);
      } else {
        entryDict.set(key, [entry]);
      }
    }
  });

  const shops: Shop[] = [];
  entryDict.forEach((entries) => {
    if (entries.length === 1) {
      shops.push(convertNominatimEntryToShop(entries[0]));
    } else {
      entries.forEach((entry) => {
        shops.push(convertNominatimEntryToShop(entry, true));
      });
    }
  });

  return shops;
};

export const searchGoogleMapsShops = async (query: string) => {
  const data = await fetch(GOOGLE_PLACES_BASE_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.formattedAddress,places.businessStatus',
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY ?? 'INVALID_KEY',
    },
    body: JSON.stringify({textQuery: query}),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      logError(error);
    });

  console.log('Google Maps:', data);

  const shops: Shop[] = [];

  if (data.places) {
    data.places.forEach((entry: GoogleMapsEntry) => {
      if (entry.displayName?.text) {
        shops.push(convertGoogleMapsEntryToShop(entry));
      }
    });
  }

  return shops;
};
