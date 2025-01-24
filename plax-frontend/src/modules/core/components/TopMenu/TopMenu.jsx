import { CalendarOutlined, DashboardOutlined, HeartOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Isologo from '../../../../assets/images/Isologotipo.png'
import { useAuth } from '../../../auth/context/AuthContext'
import './TopMenu.css'

export const TopMenu = () => {

    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false)

    const handleClick = () => {
        setMenuOpen((prev) => !prev)
    }

    const handleLogout = () => {
        console.log("Cerrando sesion")
        logout();
    }

    const AvatarCharacter = useMemo(() => {
        const items = [
            {
                label: <Link to="/favoritos"><HeartOutlined /> Favoritos</Link>,
                key: '0',
            },
            {
                label: <Link to="/perfil"><UserOutlined /> Perfil</Link>,
                key: '1',
            },
            {
                label: <Link to="/mis-reservas"><CalendarOutlined /> Reservas</Link>,
                key: '2',
            },
            {
                type: 'divider',
            },
            {
                label: <Link to="/" onClick={handleLogout}><LogoutOutlined /> Cerrar Sesión</Link>,
                key: '3',
            },
        ];

        if (user?.role === 'ADMIN') {
            items.unshift({
                label: <Link to="/administracion"><DashboardOutlined /> Administración</Link>,
                key: '5',
            });
        }

        return (
            <Dropdown
                menu={{ items }}
                trigger={['click']}

            >
                <button className='button__avatar'>
                    <Avatar className='avatar' size={40}>{user ? `${user.firstname[0]}${user.lastname[0]}` : 'USER'}</Avatar>
                </button>
            </Dropdown>
        );
    }, [user]);

    return (
        <header className='topMenu'>
            <Link className='topMenu__logo' to="/">
                <img src={Isologo} alt="logo" height={40} width={40} />
                <span>Take me out tonight</span>
            </Link>
            <nav className={`topMenu__nav ${menuOpen ? 'topMenu__nav--active' : ''}`}>
                {menuOpen &&
                    <button
                        onClick={handleClick}
                        className='topMenu__toggleButton'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </button>
                }
                {
                    user && AvatarCharacter
                }
                <ul>
                    {
                        user ?
                            <>

                                {
                                    user.role === 'ADMIN' &&
                                    <li className='navbar__link'>
                                        <Link to="/administracion"><DashboardOutlined /> Administración</Link>
                                    </li>
                                }
                                <li className='navbar__link'>
                                    <Link to="/favoritos"><HeartOutlined /> Favoritos</Link>
                                </li>
                                <li className='navbar__link'>
                                    <Link to="/perfil"><UserOutlined /> Perfil</Link>
                                </li>
                                <li className='navbar__link'>
                                    <Link to="/mis-reservas"><CalendarOutlined /> Reservas</Link>
                                </li>
                                <li className='navbar__link'>
                                    <Link to="/" onClick={handleLogout}><LogoutOutlined /> Cerrar Sesión</Link>
                                </li>
                            </> :
                            <>
                                <li>
                                    <Link to="/registro"><UserAddOutlined /> Crear Cuenta</Link>
                                </li>
                                <li>
                                    <Link to="/iniciar-sesion"><UserOutlined /> Iniciar Sesión</Link>
                                </li>
                            </>
                    }
                </ul>
            </nav>
            {!menuOpen &&
                <button
                    onClick={handleClick}
                    className='topMenu__toggleButton'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
                </button>
            }
        </header>
    )
}
