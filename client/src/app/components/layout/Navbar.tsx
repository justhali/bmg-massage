"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, User, X, ShoppingCart } from 'lucide-react'
// import { cn } from "@/src/lib/utils"
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


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
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

                                            </NavigationMenuContent>
                                            <NavigationMenuItem>
                                                <Button onClick={logout}>Déconnexion</Button>
                                            </NavigationMenuItem>
                                        </NavigationMenuItem>
                                    </>
                                ) : (
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
