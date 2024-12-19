import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatErrorMessages = (errorDetails: any) => {
    return Object.entries(errorDetails).flatMap(([key, messages]: any) =>
        messages.map((message: any) => `${message}`)
    ).join("<br/>\n");
}