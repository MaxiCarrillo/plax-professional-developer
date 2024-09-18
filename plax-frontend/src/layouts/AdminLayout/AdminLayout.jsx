import './AdminLayout.css';
import { NavLink, Link } from 'react-router-dom';

const routes = [
    {
        path: '/administracion/estancias',
        name: 'Estancias'
    },
    {
        path: '/administracion/categorias',
        name: 'Categorias'
    }
]

export const AdminLayout = ({ children }) => {
    return (
        <>
            <div className='adminLayout__container'>
                <section className='sidebar__container'>
                    <nav className='sidebar__nav'>
                        <Link to={'/administracion'}>
                            <img src="https://placehold.co/600x400" alt="Logo" />
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
                    </nav>
                </section>
                {children}
            </div>
            <h1 className='adminLayout__displayMessage'>Debe ingresar desde un dispositivo con una resolución mayor a 1024px.</h1>
        </>
    )
}