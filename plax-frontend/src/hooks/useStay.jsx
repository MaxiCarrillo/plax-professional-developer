import stayService from '../services/stays';
import { useState } from 'react';


export const useStay = () => {
    const [stays, setStays] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    const getStays = async (page = 0, size = 5) => {
        try {
            setLoading(true);
            const response = await stayService.getStays(page, size);
            setStays(response);
            setTotalPages(response.totalPages);
        } catch {
            console.error('Error fetching stays');
        }
        setLoading(false);
    };


    return {
        stays,
        loading,
        totalPages,
        getStays
    }
}