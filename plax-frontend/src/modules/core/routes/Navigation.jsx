import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes, routesAdmin, routesUser } from './routes';
import { useAuth } from '../../auth/context/AuthContext';

export const Navigation = () => {

    const { user } = useAuth();

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {
                        user?.role === 'ADMIN' ? routesAdmin.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <route.layout>
                                        <route.component />
                                    </route.layout>
                                }
                                exact={route.exact}
                            />
                        ))
                            :
                            user?.role === 'USER' ? routesUser.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <route.layout>
                                            <route.component />
                                        </route.layout>
                                    }
                                    exact={route.exact}
                                />
                            ))
                                :
                                routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <route.layout>
                                                <route.component />
                                            </route.layout>
                                        }
                                        exact={route.exact}
                                    />
                                ))
                    }
                </Routes>
            </BrowserRouter>
        </>
    )
}
