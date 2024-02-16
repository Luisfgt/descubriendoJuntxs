import { z } from 'zod'

export const programSchema = z.object({
    name: z.string(),
    description: z.string(),
    dateIn: z.string().optional(),
    dateOut: z.string().optional(),
    objective: z.string(),
    syllabus: z.string(),
    urlYoutube: z.string(),
    state: z.enum(["Activo", "Inactivo"]),
    categoryId: z.number(),
    image: z.string().optional(),
});