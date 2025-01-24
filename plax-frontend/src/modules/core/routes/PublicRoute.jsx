import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";

export const PublicRoute = ({ children }) => {

    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" />;
    }

    return children;
}
