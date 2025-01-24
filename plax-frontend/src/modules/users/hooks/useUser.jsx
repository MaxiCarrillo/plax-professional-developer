import { useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import userService from "../services/user.service";

export const useUser = () => {

    const { token, updateUser } = useAuth();
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState({
        error: false,
        message: null
    });
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const getUsers = async (page = 0, size = 5) => {
        try {
            setLoading(true);
            const response = await userService.getUsers(token);
            setUsers(response);
            setTotalPages(response.totalPages);
            setError(false);
        } catch {
            console.error("Error fetching users");
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const getUserAuthenticated = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await userService.getUserAuthenticated(token);
            setUser(response);
            updateUser(response);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userService.deleteUser(id, token);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (values) => {
        try {
            setLoading(true);
            await userService.createUser(values, token);
            setError(false);
        } catch {
            console.error("Error adding user");
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const editUser = async (values) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userService.editUser(values, token);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const updateName = async (values) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userService.updateName(values, token);
            setUser(response.data);
            return response.data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addFavoriteStay = async (values) => {
        try {
            setLoading(true);
            await userService.addFavoriteStay(values, token);
            setError({
                error: false,
                message: null
            })
            return error;
        } catch (error) {
            console.error(error.message);
            return {
                error: true,
                message: error.message
            }
        } finally {
            setLoading(false);
        }
    };

    const removeFavoriteStay = async (values) => {
        try {
            setLoading(true);
            await userService.removeFavoriteStay(values, token);
            return {
                error: false,
                message: null
            }
        } catch (error) {
            console.error(error.message);
            return {
                error: true,
                message: error.message
            }
        } finally {
            setLoading(false);
        }
    }


    return {
        users,
        user,
        error,
        loading,
        totalPages,
        getUsers,
        getUserAuthenticated,
        deleteUser,
        addUser,
        editUser,
        addFavoriteStay,
        removeFavoriteStay,
        updateName
    }
}
