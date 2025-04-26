import {NominatimEntry, Shop} from '@/app/lib/types';

const NOMINATIM_BASE_URL =
  'https://nominatim.openstreetmap.org/search?countrycodes=us&addressdetails=1&layer=poi,address&format=jsonv2';

export const searchShops = async (query: string) => {
  const data = await fetch(
    `${NOMINATIM_BASE_URL}&q=${encodeURIComponent(query)}`,
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

  const shops: Shop[] = data.map((entry: NominatimEntry) => {
    return {
      id: entry.place_id.toString(),
      name: entry.name,
      city: entry.address.city,
      state: entry.address.state,
    };
  });

  return shops;
};
