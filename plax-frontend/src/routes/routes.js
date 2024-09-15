import { UserLayout, AdminLayout } from '../layouts';
import {
    Home,
    HomeDashboard,
    NotFound,
    StaysList,
    CategoriesList
} from '../pages';

export const routes = [
    {
        path: '/',
        component: Home,
        layout: UserLayout,
        exact: true
    },
    {
        path: '*',
        component: NotFound,
        layout: UserLayout,
        exact: true
    }
]

export const routesAdmin = [
    {
        path: '/',
        component: Home,
        layout: UserLayout,
        exact: true
    },
    {
        path: '/administracion',
        component: HomeDashboard,
        layout: AdminLayout,
        exact: true
    },
    {
        path: '/administracion/estancias',
        component: StaysList,
        layout: AdminLayout,
        exact: true
    },
    {
        path: '/administracion/categorias',
        component: CategoriesList,
        layout: AdminLayout,
        exact: true
    }
]
