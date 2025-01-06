// "use client"
import "./styles/globals.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "@/src/app/contexts/AuthContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    )
}