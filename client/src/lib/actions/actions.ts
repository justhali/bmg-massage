import { redirect } from "next/navigation";
import { useAuth } from "@/src/app/contexts/AuthContext";

export function logout() {
    const { logout } = useAuth();
    logout();
    redirect('/');
}