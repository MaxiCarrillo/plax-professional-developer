import { useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import featureService from "../services/features.service";

export const useFeature = () => {
    const { token } = useAuth();
    const [features, setFeatures] = useState(null);
    const [feature, setFeature] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [success, setSuccess] = useState(false);

    const getFeatures = async (page = 0, size = 5) => {
        try {
            setLoading(true);
            const response = await featureService.getFeatures(page, size);
            setFeatures(response);
            setTotalPages(response.totalPages);
            setError(false);
        } catch {
            console.error("Error fetching features");
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getAllFeatures = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await featureService.getAllFeatures();
            setFeatures(response);
            setSuccess(true);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const deleteFeature = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await featureService.deleteFeature(id, token);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addFeature = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await featureService.createFeature(data, token);
            setSuccess(true);
            return response;
        } catch (e) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }

    const editFeature = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await featureService.editFeature(data, token);
            setSuccess(true);
            return response;
        } catch (e) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return {
        features,
        feature,
        error,
        loading,
        totalPages,
        getFeatures,
        getAllFeatures,
        deleteFeature,
        addFeature,
        editFeature
    };
}