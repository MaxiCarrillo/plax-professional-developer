import {
    AdminLayout,
    AuthLayout,
    UserLayout
} from '../../core/layouts';

import {
    Home,
    HomeDashboard,
    NotFound
} from '../../core/pages';

import { CategoriesList } from '../../categories/pages';

import {
    StayDetail,
    StayFavorites,
    StaysList,
    StaysSearch
} from '../../stays/pages';

import { FeaturesList } from '../../features/pages';

import { Login, Register } from '../../auth/pages';

import { UsersList } from '../../users/pages';

import { ReservationConfirm, ReservationsUser } from '../../reservations/pages';
import { Profile } from '../pages/Profile/Profile';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: UserLayout,
        roles: [],
        exact: true
    },
    {
        path: '/iniciar-sesion',
        component: Login,
        layout: AuthLayout,
        roles: [],
        exact: true
    },
    {
        path: '/registro',
        component: Register,
        layout: AuthLayout,
        roles: [],
        exact: true
    },
    {
        path: '/estancias/:id',
        component: StayDetail,
        layout: UserLayout,
        roles: [],
        exact: true
    },
    {
        path: '/search',
        component: StaysSearch,
        layout: UserLayout,
        roles: [],
        exact: true
    },
    {
        path: '*',
        component: NotFound,
        layout: UserLayout,
        roles: [],
        exact: true
    },
    {
        path: '/perfil',
        component: Profile,
        layout: UserLayout,
        roles: ['USER', 'ADMIN'],
        exact: true
    },
    {
        path: '/favoritos',
        component: StayFavorites,
        layout: UserLayout,
        roles: ['USER', 'ADMIN'],
        exact: true
    },
    {
        path: '/mis-reservas',
        component: ReservationsUser,
        layout: UserLayout,
        roles: ['USER', 'ADMIN'],
        exact: true
    },
    {
        path: '/confirmar-reserva/:id',
        component: ReservationConfirm,
        layout: UserLayout,
        roles: ['USER', 'ADMIN'],
        exact: true
    }
]

const adminRoutes = [
    {
        path: '/administracion',
        component: HomeDashboard,
        layout: AdminLayout,
        roles: ['ADMIN'],
        exact: true
    },
    {
        path: '/administracion/estancias',
        component: StaysList,
        layout: AdminLayout,
        roles: ['ADMIN'],
        exact: true
    },
    {
        path: '/administracion/estancias/:id',
        component: StayDetail,
        layout: AdminLayout,
        roles: ['ADMIN'],
        exact: true
    },
    {
        path: '/administracion/categorias',
        component: CategoriesList,
        layout: AdminLayout,
        roles: ['ADMIN'],
        exact: true
    },
    {
        path: '/administracion/caracteristicas',
        component: FeaturesList,
        layout: AdminLayout,
        roles: ['ADMIN'],
        exact: true
    },
    {
        path: '/administracion/usuarios',
        component: UsersList,
        layout: AdminLayout,
        roles: ['ADMIN'],
        exact: true
    },
]

const routesConfig = [
    ...publicRoutes,
    ...adminRoutes
]

export default routesConfig;