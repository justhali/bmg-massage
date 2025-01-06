import { GalleryVerticalEnd } from "lucide-react"

import { RegisterForm } from "../../components/user/register-form"
import Link from "next/link"

export default function Page() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    BMG Massage
                </a>
                <RegisterForm />
                <p className="mt-4 text-center">
                    Pas encore de compte ?{" "}
                    <Link href={"/login"} className="text-blue-600 hover:underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    )
}
