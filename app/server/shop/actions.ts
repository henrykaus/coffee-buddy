import {NominatimEntry, Shop} from '@/app/lib/types';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

const NOMINATIM_SEARCH_URL = `${NOMINATIM_BASE_URL}/search?countrycodes=us&addressdetails=1&layer=poi,address&format=jsonv2`;
const NOMINATIM_LOOKUP_URL = `${NOMINATIM_BASE_URL}/lookup?format=jsonv2`;

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
    city: entry.address.city ?? entry.address.town,
    state: entry.address.state,
    street: street,
    houseNumber: houseNumber,
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
      console.error(error);
    });

  console.log('Nominatim', data);

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

export const lookupShop = async (id: string) => {
  const data = await fetch(
    `${NOMINATIM_LOOKUP_URL}&osm_ids=${encodeURIComponent(id)}`,
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
      console.error(error);
    });

  console.log('Nominatim Lookup', data);

  if (data.length > 0) {
    return convertNominatimEntryToShop(data[0]);
  } else {
    return null;
  }
};
