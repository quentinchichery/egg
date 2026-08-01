import cravings from '@/data/cravings.json';
import cities from '@/data/cities.json';
import tags from '@/data/tags.json';
import restaurants from '@/data/restaurants.json';
import type { FilterOption, Restaurant } from '@/types/types';

export default {
  localFetchRestaurants(): Restaurant[] {
    return restaurants as Restaurant[];
  },
  localFetchCravings(): FilterOption[] {
    return Object.entries(cravings).map(([id, name]) => ({
      id,
      label: name as string,
    }));
  },
  localFetchTags(): FilterOption[] {
    return Object.entries(tags).map(([id, name]) => ({
      id,
      label: name as string,
    }));
  },
  localFetchCities(): FilterOption[] {
    return Object.entries(cities).map(([zip, name]) => ({
      id: zip,
      label: name as string,
    }));
  },
};
