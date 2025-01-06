"use client"
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/app/contexts/AuthContext";

export default function LogoutButton() {
    const { logout } = useAuth();
    return (
        <div>
            <Button onClick={() => logout()}>Déconnexion</Button>
        </div>
    );
}
