import { z } from "zod"

export const formSchema = z.object({
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide."
    }),
    date: z.date({
        required_error: "La date est requise.",
        invalid_type_error: "Veuillez sélectionner une date valide.",
    }),
    phoneNumber: z.string().optional().refine((num) => !num || /^\d{10}$/.test(num), {
        message: "Le numéro de téléphone doit contenir 10 chiffres.",
    }),
})
