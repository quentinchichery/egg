import { z } from 'zod';

export const restaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  lat: z.number().nullable(),
  long: z.number().nullable(),
  city: z.number(),
  craving: z.string(),
  tags: z.array(z.string()),
  addresse: z.string(),
});

export const restaurantsSchema = z.array(restaurantSchema);
