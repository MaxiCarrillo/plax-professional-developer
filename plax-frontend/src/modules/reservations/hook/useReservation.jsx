import { useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import reservationService from "../services/reservations.services";

export const useReservation = () => {

    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reservations, setReservations] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [success, setSuccess] = useState(false);

    // La idea es que este sea la estructura
    const createReservation = async (body) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await reservationService.createReservation(body, token);
            setSuccess(true);
            return response.data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const getReservationsByUser = async (date) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await reservationService.getReservationsByUser(token, date);
            setReservations(response.data);
            setSuccess(true);
            return response.data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const confirmReservation = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await reservationService.confirmReservation(id, token);
            setSuccess(true);
            return response.data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        error,
        reservations,
        totalPages,
        success,
        createReservation,
        getReservationsByUser,
        confirmReservation
    }
};