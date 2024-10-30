import featureService from "../services/features";
import { useState } from "react";

export const useFeature = () => {
    const [features, setFeatures] = useState(null);
    const [feature, setFeature] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

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

    const deleteFeature = async (id) => {
        try {
            setLoading(true);
            await featureService.deleteFeature(id);
        } catch {
            console.error("Error deleting feature");
        } finally {
            setLoading(false);
        }
    };

    const addFeature = async (data) => {
        try {
            setLoading(true);
            await featureService.createFeature(data);
            setError(false);
        } catch (e) {
            setError(true);
            console.error("Error creating feature", e);
        } finally {
            setLoading(false);
        }
    }

    const editFeature = async (data) => {
        try {
            setLoading(true);
            await featureService.editFeature(data);
            setError(false);
        } catch (e) {
            setError(true);
            console.error("Error editing feature", e);
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
        deleteFeature,
        addFeature,
        editFeature
    };
}