import { useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import userService from "../services/user.service";

export const useUser = () => {

    const { token } = useAuth();
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

    const deleteUser = async (id) => {
        try {
            setLoading(true);
            await userService.deleteUser(id, token);
        } catch {
            console.error("Error deleting user");
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (values) => {
        try {
            setLoading(true);
            await userService.addUser(values, token);
            setError(false);
        } catch {
            console.error("Error adding user");
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const editUser = async (values) => {
        try {
            setLoading(true);
            await userService.editUser(values, token);
            return {
                error: false,
                message: null
            };
        } catch (error) {
            console.error(error.message);
            return {
                error: true,
                message: error.message
            };
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
        deleteUser,
        addUser,
        editUser
    }
}
