import { useState } from 'react'
import './TopMenu.css'
import Isologo from '../../../../assets/images/Isologotipo.png'
import { Link } from 'react-router-dom'

export const TopMenu = () => {

    const [menuOpen, setMenuOpen] = useState(false)

    const handleClick = () => {
        setMenuOpen((prev) => !prev)
    }

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
                <ul>
                    <li>
                        <Link to="/registro">Crear Cuenta</Link>
                    </li>
                    <li><Link to="/iniciar-sesion">Iniciar Sesión</Link></li>
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
