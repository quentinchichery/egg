import cravings from '@/data/cravings.json';
import cities from '@/data/cities.json';
import tags from '@/data/tags.json';
import restaurants from '@/data/restaurants.json';

export default {
  localFetchRestaurants() {
    return restaurants;
  },
  localFetchCravings() {
    return Object.entries(cravings).map(([id, name]) => ({
      id: id,
      label: name,
    }));
  },
  localFetchTags() {
    return Object.entries(tags).map(([id, name]) => ({
      id: id,
      label: name,
    }));
  },
  localFetchCities() {
    return Object.entries(cities).map(([zip, name]) => ({
      id: zip,
      label: name,
    }));
  },
};