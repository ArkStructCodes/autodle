import { z } from 'zod';


const CarSchema = z.object({
    'make': z.string(),
    'year': z.number(),
    'name': z.string(),
    'drivetrain': z.string(),
    'power': z.number(),
    'weight': z.number(),
});
export type Car = z.infer<typeof CarSchema>;

export const CarlistSchema = z.array(CarSchema);
export type Carlist = z.infer<typeof CarlistSchema>;
