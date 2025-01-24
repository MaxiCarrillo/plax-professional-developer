import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import PlaxImage from '../../../assets/images/Isologotipo.png';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import routesConfig from './routes';

export const Navigation = () => {
    return (
        <>
            <Helmet>
                <title>Plax</title>
                <meta name="description" content="Plax es una plataforma de búsqueda de alojamientos temporales." />
                <meta property="og:title" content="Plax" />
                <meta property="og:description" content="Plax es una plataforma de búsqueda de alojamientos temporales." />
                <meta property="og:image" content={PlaxImage} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Plax" />
                <meta name="twitter:title" content="Plax" />
                <meta name="twitter:description" content="Plax es una plataforma de búsqueda de alojamientos temporales." />
                <meta name="twitter:site" content="@carrillomaxj" />
                <meta name="twitter:creator" content="@carrillomaxj" />
                <meta name="twitter:image" content={PlaxImage} />
            </Helmet>
            <BrowserRouter>
                <QueryParamProvider
                    adapter={ReactRouter6Adapter}
                >
                    <Routes>
                        {routesConfig.map(({ path, component: Component, layout: Layout, roles }, index) => (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    roles.length > 0 ? (
                                        <PrivateRoute roles={roles}>
                                            <Layout>
                                                <Component />
                                            </Layout>
                                        </PrivateRoute>
                                    ) : (
                                        (path === '/iniciar-sesion' || path === '/registro') ? (
                                            <PublicRoute>
                                                <Layout>
                                                    <Component />
                                                </Layout>
                                            </PublicRoute>
                                        ) : (
                                            <Layout>
                                                <Component />
                                            </Layout>
                                        )
                                    )
                                }
                            />
                        ))}
                    </Routes>
                </QueryParamProvider>
            </BrowserRouter>
        </>
    )
}
