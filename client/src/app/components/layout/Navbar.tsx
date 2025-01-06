"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, User, X, ShoppingCart } from 'lucide-react'
import { cn } from "@/src//lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { useAuth } from "../../contexts/AuthContext"
import LogoutButton from "../ui/logoutButton"

const components: { title: string; href: string }[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Mes commandes",
        href: "/orders",
    }
]
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    return (
        <nav className="tw-border-b tw-bg-white tw-relative">
            <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
                <div className="tw-flex tw-items-center tw-justify-between tw-h-16">

                    <div className="tw-hidden md:tw-block tw-absolute tw-left-1/2 tw-transform -tw-translate-x-1/2">
                        <Link href={"/"} className="tw-text-base tw-font-bold">
                            BMG Massage
                        </Link>
                    </div>

                    <div className="md:tw-hidden">
                        <Link href={"/"} className="tw-text-xl tw-font-bold">
                            BMG Massage
                        </Link>
                    </div>

                    <div className="md:tw-hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(!isOpen)}
                            className="tw-p-2"
                        >
                            {isOpen ? <X className="tw-size-6" /> : <Menu className="tw-size-6" />}
                        </Button>
                    </div>

                    <div className="tw-hidden md:tw-block tw-ml-auto">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link href={"/massages"} legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Nos massages
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                {isAuthenticated ? (
                                    <><NavigationMenuItem>
                                        <Link href="/login" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                <User className="tw-mr-2 tw-size-4" />
                                                Connexion
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem><NavigationMenuItem>
                                            <Link href="/register" legacyBehavior passHref>
                                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                    S'inscrire
                                                </NavigationMenuLink>
                                            </Link>
                                        </NavigationMenuItem></>
                                ) : (
                                    <><NavigationMenuItem>
                                        <Link href="/" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                <ShoppingCart className="tw-mr-2 tw-size-4" />
                                                Panier
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger>
                                                Avatar
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="tw-grid w-[400px] tw-gap-3 tw-p-4 tw-md:w-[500px] tw-md:grid-cols-2 tw-lg:w-[600px]">
                                                    {components.map((component) => (
                                                        <ListItem
                                                            key={component.title}
                                                            title={component.title}
                                                            href={component.href}
                                                        >
                                                        </ListItem>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                            <NavigationMenuItem>
                                                <LogoutButton />
                                            </NavigationMenuItem>
                                        </NavigationMenuItem>
                                    </>
                                )}

                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Menu mobile */}
                {isOpen && (
                    <div className="md:tw-hidden tw-py-2">
                        <div className="tw-space-y-1">
                            <Link
                                href={"/massages"}
                                className="tw-block tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium hover:tw-bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                Nos massages
                            </Link>
                            <Link
                                href={"/login"}
                                className="tw-block tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium hover:tw-bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="tw-flex tw-items-center">
                                    <User className="tw-mr-2 tw-size-4" />
                                    Connexion
                                </div>
                            </Link>
                            <Link
                                href={"/register"}
                                className="tw-block tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium hover:tw-bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                S'inscrire
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )

}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <NavigationMenuLink asChild >
            <a
                ref={ref}
                className={cn(
                    "tw-block tw-select-none tw-space-y-1 tw-rounded-md tw-p-3 tw-leading-none tw-no-underline tw-outline-none tw-transition-colors tw-hover:bg-accent tw-hover:text-accent-foreground tw-focus:bg-accent tw-focus:text-accent-foreground",
                    className
                )}
                {...props}
            >
                <div className="tw-text-sm tw-font-medium tw-leading-none">{title}</div>
                <p className="tw-line-clamp-2 tw-text-sm tw-leading-snug tw-text-muted-foreground">
                    {children}
                </p>
            </a>
        </NavigationMenuLink>
    )
})
ListItem.displayName = "ListItem"