"use server"
import { createUser, loginUser } from "@/src/lib/api/users";

export async function auth(
    formData
) {
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        const user = await loginUser({ email, password });

        if (user) {
            return { success: true, message: "Connexion réussie, vous êtes maintenant connecté.", user };
        }
        const newUser = await createUser({ email, password });


        if (newUser) {
            return { success: true, message: "Compte créé avec succès.", user: newUser };
        }

        return { error: "Impossible de créer un compte." };
    } catch (error) {
        console.error("Erreur dans registerUser :", error);
        return { error: "Une erreur s'est produite. Réessayez plus tard." };
    }

}

