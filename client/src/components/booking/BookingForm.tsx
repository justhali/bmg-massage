"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useState } from "react"
import { formSchema } from "@/src/lib/schemas/booking"
import { createBooking } from "@/src/lib/api/bookings"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/src/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"



export function BookingForm({ isOpen, massageId }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [date, setDate] = useState<Date | undefined>(new Date());

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            date: new Date,
            phoneNumber: "",
        },
    })

    async function onSubmit(values) {
        setIsSubmitting(true);
        try {
            const result = await createBooking({ ...values, massageId });
            console.log(result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Réserver le massage</DialogTitle>
                    <DialogDescription>Choisir une date de réservation et entrer un mail ou numéro de téléphone valide afin de recevoir un lien de paiement. </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon />
                                                    {field.value ? format(field.value, "PPP") : <span>Sélectionner une date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 bg-gray-900 text-white" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="vous@exemple.com"
                                            className="px-2"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Téléphone (optionnel)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="0612345678"
                                            className="px-2"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="justify-self-end"
                        >
                            {isSubmitting ? " Validation en cours..." : "Confirmer"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}