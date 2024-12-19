export interface Massage {
    id: number;
    name: string;
    description: string;
    duration: number;
    price: number;
}
export interface Booking {
    massageId: number;
    bookingDate: string;
    email?: string;
    phoneNumber?: string;
    status: string;
}
export interface User {
    username?: string;
    email: string;
    password: string;
}