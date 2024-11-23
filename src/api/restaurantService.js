import restaurants from './data-20241118.json';
import filters from './cities-cravings-tags.json';

export default {
  localFetchRestaurants() {
    return restaurants;
  },
  localFetchCravings() {
    return filters.cravings
  },
  localFetchTags() {
    return filters.tags
  },
  localFetchCities() {
    return filters.cities.sort((a, b) => a - b);
  }
};
