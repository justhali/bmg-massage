import axios from "axios";
import { Booking } from "../types/index";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getBookings = async (): Promise<Booking[]> => {
    try {
        const response = await axios.get(`${API_URL}/bookings`);
        return response.data;
    } catch (error) {
        console.error('Erreur de récupération des Bookings', error);
    }
}

export const getBookingById = async (id: number): Promise<Booking | null> => {
    try {

        const response = await axios.get(`${API_URL}/bookings/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur de récupération du Booking ${id}`, error);
        return null;
    }
}

export const createBooking = async (bookingDate: {
    massageId: string,
    bookingDate: string,
    email?: string,
    phoneNumber?: string,
    status: string,
}): Promise<Booking | null> => {
    try {
        const response = await axios.post(`${API_URL}/booking`, bookingDate);
        return response.data;
    } catch (error) {
        console.error(`Erreur de récupération du Booking`, error);
        return null;
    }
}

