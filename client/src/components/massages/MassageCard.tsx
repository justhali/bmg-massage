"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/src/app/contexts/AuthContext";
import { cn } from "@/src/lib/utils"
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MassageCardProps {
    massageId: number;
    title: string;
    description: string;
    price: number;
    duration: number;
}

type CardProps = React.ComponentProps<typeof Card>;

export default function MassageCard({
    massageId,
    title,
    description,
    price,
    duration,
    className,
    ...props
}: MassageCardProps & CardProps) {

    const { isAuthenticated } = useAuth();
    const router = useRouter();
    console.log("Ici c'est isAuthenticated", isAuthenticated)
    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <p>Prix : {price} €</p>
                <p>Durée : {duration} min</p>
            </CardContent>
            <CardFooter>
                {isAuthenticated ? (
                    <Link href={`/massages/${massageId}`}>Voir le détail</Link>
                ) : (
                    <button
                        onClick={() => router.push("/login")}
                        className="text-blue-500 underline"
                    >
                        Connectez-vous pour voir le détail
                    </button>
                )}
            </CardFooter>
            <pre>{JSON.stringify(isAuthenticated)}</pre>
        </Card>
    )
}