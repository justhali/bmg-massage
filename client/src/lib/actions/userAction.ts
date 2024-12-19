"use server"
import { createUser, loginUser } from "@/src/lib/api/users";

export async function registerUser(
    prevState,
    formData
) {
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        const user = await loginUser({ email, password });

        if (user) {
            return { success: true, message: "Connexion réussie.", user }
        }

        const newUser = await createUser({ email, password });


        if (newUser) {
            return { success: true, message: "Utilisateur créé avec succès.", user: newUser };
        }

        return { error: "Impossible de créer l'utilisateur." };
    } catch (error) {
        console.error("Erreur dans registerUser :", error);
        return { error: "Une erreur s'est produite. Réessayez plus tard." };
    }

}

