// src/context/BookingContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BookingContextProps {
    bookingUpdated: boolean;
    setBookingUpdated: (updated: boolean) => void;
}
const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [bookingUpdated, setBookingUpdated] = useState(false);

    return (
        <BookingContext.Provider value={{ bookingUpdated, setBookingUpdated }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
