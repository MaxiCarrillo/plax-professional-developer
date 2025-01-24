import { useState } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import stayService from '../services/stays.service';


export const useStay = () => {
    const { token } = useAuth();
    const [stay, setStay] = useState(null);
    const [stays, setStays] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [success, setSuccess] = useState(false);

    const getStays = async (page = 0, size = 5) => {
        try {
            setLoading(true);
            const response = await stayService.getStays(page, size, token);
            setStays(response);
            setTotalPages(response.totalPages);
            setError(false);
        } catch {
            console.error('Error fetching stays');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getStay = async (id) => {
        try {
            setLoading(true);
            const response = await stayService.getStay(id);
            response ? setStay(response) : setStay(null);
        } catch {
            console.error('Error getting stay');
        } finally {
            setLoading(false);
        }
    };

    const getRandomStays = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await stayService.getRandomStays();
            setStays(response);
            setSuccess(true);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const searchStays = async (categoryIds = [], searchTerm = '', checkIn = null, checkOut = null) => {
        try {
            setLoading(true);
            const response = await stayService.searchStays(categoryIds, searchTerm, checkIn, checkOut);
            setStays(response);
            setError(false);
        } catch {
            console.error('Error searching stays');
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const deleteStay = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await stayService.deleteStay(id, token);
            setSuccess(true);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addStay = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await stayService.createStay(data, token);
            setSuccess(true);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const editStay = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await stayService.editStay(data, token);
            setSuccess(true);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        stay,
        stays,
        loading,
        error,
        success,
        totalPages,
        getStays,
        getRandomStays,
        searchStays,
        getStay,
        deleteStay,
        addStay,
        editStay
    };
}