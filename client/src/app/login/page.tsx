import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "../../components/user/login-form"

export default function LoginPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    BMG Massage
                </a>
                <LoginForm />
            </div>
        </div>
    )
}