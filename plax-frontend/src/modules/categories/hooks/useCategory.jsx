import categoryService from "../services/categories";
import { useState } from "react";

export const useCategory = () => {
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

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

    const deleteCategory = async (id) => {
        try {
            setLoading(true);
            await categoryService.deleteCategory(id);
        } catch {
            console.error("Error deleting category");
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (data) => {
        try {
            setLoading(true);
            await categoryService.createCategory(data);
            setError(false);
        } catch (e) {
            setError(true);
            console.error("Error creating category", e);
        } finally {
            setLoading(false);
        }
    }

    const editCategory = async (data) => {
        try {
            setLoading(true);
            await categoryService.editCategory(data);
            setError(false);
        } catch (e) {
            setError(true);
            console.error("Error editing category", e);
        } finally {
            setLoading(false);
        }
    }

    return {
        categories,
        category,
        error,
        loading,
        totalPages,
        getCategories,
        deleteCategory,
        addCategory,
        editCategory
    };
}