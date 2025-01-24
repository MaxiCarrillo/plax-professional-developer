import { Link } from 'react-router-dom';
import './AuthLayout.css';

export const AuthLayout = ({ children }) => {
    return (
        <main className='authLayout'>
            <section className='auth-info__section'>
                <h1><Link to="/">Plax</Link></h1>
                <p>Plax es uno de los mejores sitios de hospedaje.</p>
            </section>
            <section className='auth-form__section'>
                {children}
            </section>
        </main>
    )
}
