import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";

export const PrivateRoute = ({ children, roles = [] }) => {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to='/iniciar-sesion' />
    }

    if (roles.length && !roles.includes(user.role)) {
        return <Navigate to='/' />;
    }

    return children;
}
