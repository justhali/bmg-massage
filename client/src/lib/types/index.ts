export interface Massage {
    id: number;
    name: string;
    description: string;
    duration: number;
    price: number;
}
export interface Booking {
    massageId: number;
    date: Date;
    customerEmail: string;
    customerPhone?: string;
    status: string;
}