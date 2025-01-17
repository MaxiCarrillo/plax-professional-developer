import { useState } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import stayService from '../services/stays.service';


export const useStay = () => {
    const { token } = useAuth();
    const [stay, setStay] = useState(null);
    const [stays, setStays] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

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

    const searchStays = async (categoryIds = [], searchTerm = '') => {
        try {
            setLoading(true);
            const response = await stayService.searchStays(categoryIds, searchTerm);
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
        try {
            setLoading(true);
            await stayService.deleteStay(id);
        } catch {
            console.error('Error deleting stay');
        } finally {
            setLoading(false);
        }
    };

    const addStay = async (data) => {
        try {
            setLoading(true);
            await stayService.createStay(data);
            setError(false);
        } catch (e) {
            setError(true);
            console.error('Error creating stay', e);
        } finally {
            setLoading(false);
        }
    };

    const editStay = async (data) => {
        try {
            setLoading(true);
            await stayService.editStay(data);
            setError(false);
        } catch (e) {
            setError(true);
            console.error('Error editing stay', e);
        } finally {
            setLoading(false);
        }
    }

    return {
        stay,
        stays,
        loading,
        error,
        totalPages,
        getStays,
        searchStays,
        getStay,
        deleteStay,
        addStay,
        editStay
    };
}