import { describe, it, expect } from 'vitest';
import restaurants from './restaurants.json';
import { restaurantsSchema } from './restaurantSchema';

// Garde-fou : le pipeline Python (src/api/data_to_json.py) génère ce fichier
// à partir d'un CSV édité à la main, une erreur de saisie ne doit pas casser
// silencieusement le site en production.
describe('restaurants.json', () => {
  it('respecte le schéma attendu par le front', () => {
    const result = restaurantsSchema.safeParse(restaurants);
    if (!result.success) {
      throw new Error(result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('\n'));
    }
  });

  it("n'est pas vide", () => {
    expect((restaurants as unknown[]).length).toBeGreaterThan(0);
  });
});
