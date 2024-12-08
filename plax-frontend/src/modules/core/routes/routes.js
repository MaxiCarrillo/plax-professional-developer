import {
    AdminLayout,
    AuthLayout,
    UserLayout
} from '../../core/layouts';

import {
    Home,
    HomeDashboard,
    NotFound,
} from '../../core/pages';

import { CategoriesList } from '../../categories/pages';

import {
    StayDetail,
    StaysList,
    StaysSearch
} from '../../stays/pages';

import { FeaturesList } from '../../features/pages';

import { Login, Register } from '../../auth/pages';

import { UsersList } from '../../users/pages';

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
    },
    {
        path: '/iniciar-sesion',
        component: Login,
        layout: AuthLayout,
        exact: true
    },
    {
        path: '/registro',
        component: Register,
        layout: AuthLayout,
        exact: true
    },
    {
        path: '/estancias/:id',
        component: StayDetail,
        layout: UserLayout,
        exact: true
    },
    {
        path: '/search',
        component: StaysSearch,
        layout: UserLayout,
        exact: true
    },
]

export const routesUser = [
    {
        path: '/',
        component: Home,
        layout: UserLayout,
        exact: true
    },
    {
        path: '/search',
        component: StaysSearch,
        layout: UserLayout,
        exact: true
    },
    {
        path: '*',
        component: NotFound,
        layout: UserLayout,
        exact: true
    },
    {
        path: '/estancias/:id',
        component: StayDetail,
        layout: UserLayout,
        exact: true
    },
]

export const routesAdmin = [
    {
        path: '/',
        component: Home,
        layout: UserLayout,
        exact: true
    },
    {
        path: '/estancias/:id',
        component: StayDetail,
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
        path: '/administracion/estancias/:id',
        component: StayDetail,
        layout: AdminLayout,
        exact: true
    },
    {
        path: '/administracion/categorias',
        component: CategoriesList,
        layout: AdminLayout,
        exact: true
    },
    {
        path: '/administracion/caracteristicas',
        component: FeaturesList,
        layout: AdminLayout,
        exact: true
    },
    {
        path: '/administracion/usuarios',
        component: UsersList,
        layout: AdminLayout,
        exact: true
    },
    {
        path: '/search',
        component: StaysSearch,
        layout: UserLayout,
        exact: true
    },
    {
        path: '*',
        component: NotFound,
        layout: UserLayout,
        exact: true
    },
]
