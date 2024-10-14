import {
    UserLayout,
    AdminLayout
} from '../../core/layouts';

import {
    Home,
    HomeDashboard,
    NotFound,
} from '../../core/pages';

import {
    CategoriesList
} from '../../categories/pages';

import {
    StayDetail,
    StaysList
} from '../../stays/pages';

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
    }
]
