import { HomeFilled } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import ImagePlax from '../../../../assets/images/plax-dashboard.png';
import { FormModalProvider } from '../../context';
import './AdminLayout.css';

const routes = [
    {
        path: '/administracion/estancias',
        name: 'Estancias'
    },
    {
        path: '/administracion/categorias',
        name: 'Categorias'
    },
    {
        path: '/administracion/caracteristicas',
        name: 'Características'
    },
    {
        path: '/administracion/usuarios',
        name: 'Usuarios'
    }
]

export const AdminLayout = ({ children }) => {
    return (
        <main>
            <div className='adminLayout__container'>
                <section className='sidebar__container'>
                    <nav className='sidebar__nav'>
                        <Link to={'/administracion'}>
                            <img src={ImagePlax} alt="Logo" />
                        </Link>
                        <ul className='sidebar__list'>
                            <p className='sidebar__title'>
                                Administración
                            </p>
                            {routes.map((route, index) => (
                                <li key={index}>
                                    <NavLink to={route.path}
                                        className={({ isActive }) => {
                                            return isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item'
                                        }}>
                                        {route.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <Link to={'/'} className='button button--base'>
                            <HomeFilled />Volver al inicio
                        </Link>
                    </nav>
                </section>
                <FormModalProvider>
                    {children}
                </FormModalProvider>
            </div>
            <h1 className='adminLayout__displayMessage'>Debe ingresar desde un dispositivo con una resolución mayor a 1024px.</h1>
        </main>
    )
}