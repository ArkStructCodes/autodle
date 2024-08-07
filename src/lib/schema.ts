import { z } from 'zod';

export const CarSchema = z.object({
  country: z.string(),
  make: z.string(),
  year: z.number(),
  name: z.string(),
  drivetrain: z.string(),
  power: z.number(),
  weight: z.number()
});

export const CarlistSchema = z.array(CarSchema);
