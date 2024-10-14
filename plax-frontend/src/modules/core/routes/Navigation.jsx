import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes, routesAdmin } from './routes';

export const Navigation = () => {

    const boolean = true;

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {
                        boolean ? routesAdmin.map((route, index) => (
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
                        )) :
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
