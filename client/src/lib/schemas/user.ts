import { z } from "zod"

export const registerSchema = z.object({
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide."
    }),
    password: z.string().min(5)
})
