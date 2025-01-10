// "use client"
import "./styles/globals.css";
import { AuthProvider } from "@/src/app/contexts/AuthContext";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body className=" tw-flex tw-flex-col">
                <AuthProvider>
                    <Navbar />
                    <div className="tw-container tw-flex-grow">
                        {children}
                    </div>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    )
}