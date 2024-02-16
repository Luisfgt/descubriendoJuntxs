import { z } from 'zod'

export const serviceSchema = z.object({
    name: z.string(),
    description: z.string(),
    userId: z.number(),
    categoryId: z.number(),
    dateIn: z.string().transform((value) => new Date(value)),
    dateOut: z.string().transform((value) => new Date(value)),
    hourIn: z.string(),
    hourOut: z.string(),
    amount: z.number(),
    objective: z.string(),
    syllabus: z.string(),
    type: z.enum(["coaching", "taller", "retiro"])
});














