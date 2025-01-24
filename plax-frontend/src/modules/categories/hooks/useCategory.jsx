import { useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import categoryService from "../services/categories.service";

export const useCategory = () => {
    const { token } = useAuth();
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [success, setSuccess] = useState(false);

    const getCategories = async () => {
        try {
            setLoading(true);
            const response = await categoryService.getCategories();
            setCategories(response);
            setTotalPages(response.totalPages);
            setError(false);
        } catch {
            console.error("Error fetching categories");
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getAllCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await categoryService.getAllCategories();
            setCategories(response);
            setSuccess(true);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const deleteCategory = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await categoryService.deleteCategory(id, token);
            setSuccess(true);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await categoryService.createCategory(data, token);
            setSuccess(true);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const editCategory = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await categoryService.editCategory(data, token);
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
        categories,
        category,
        error,
        success,
        loading,
        totalPages,
        getCategories,
        getAllCategories,
        deleteCategory,
        addCategory,
        editCategory
    };
}