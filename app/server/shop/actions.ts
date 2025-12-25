'use server';

import {GoogleMapsEntry, Shop} from '@/app/lib/types';
import {logError} from '@/app/server/common';

const GOOGLE_PLACES_BASE_URL =
  'https://places.googleapis.com/v1/places:searchText';

const GOOGLE_FIELD_MASK =
  'places.id,places.displayName,places.formattedAddress';

const convertGoogleMapsEntryToShop = (entry: GoogleMapsEntry): Shop => {
  const address = entry.formattedAddress;
  const cleanAddress = address
    .split('')
    .reverse()
    .join('')
    .replace(/^.*?\d{5}\s/, '')
    .split('')
    .reverse()
    .join('')
    .trim();

  const splitAddress = cleanAddress.split(', ');

  const city = splitAddress[splitAddress.length - 2];
  const state = splitAddress[splitAddress.length - 1];

  // Street is substring excluding num characters at end of string the lengths of combined ", " + city + ", " + state
  const lengthToTrim = 2 + city.length + 2 + state.length;
  const localAddress = cleanAddress.substring(
    0,
    cleanAddress.length - lengthToTrim,
  );

  return {
    id: entry.id,
    name: entry.displayName.text,
    city: city,
    state: state,
    address: localAddress,
  };
};

/**
 * Searches Google Places entries based on user query while prioritizing the user's
 * current location. If no location is provided, it biases location results around
 * Portland Oregon's Pioneer Square.
 */
export const searchShops = async (
  query: string,
  lat?: number,
  long?: number,
) => {
  let latitude = '45.51887';
  let longitude = '-122.6793';

  if (lat !== undefined && long !== undefined) {
    latitude = lat.toFixed(5);
    longitude = long.toFixed(5);
  }

  const data = await fetch(GOOGLE_PLACES_BASE_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Goog-FieldMask': GOOGLE_FIELD_MASK,
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY ?? 'INVALID_KEY',
    },
    body: JSON.stringify({
      textQuery: query,
      locationBias: {
        circle: {
          center: {
            latitude: latitude,
            longitude: longitude,
          },
        },
      },
    }),
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

  // console.log('Google Maps:', data);

  const shops: Shop[] = [];

  if (data.places) {
    data.places.forEach((entry: GoogleMapsEntry) => {
      if (entry.displayName?.text) {
        shops.push(convertGoogleMapsEntryToShop(entry));
      }
    });
  }

  // console.log(shops);

  return shops;
};
