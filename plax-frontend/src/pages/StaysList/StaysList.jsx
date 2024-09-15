import './StaysList.css';
import { ItemList } from '../../components';
import { Link } from 'react-router-dom';

export const StaysList = () => {
    return (
        <main className="dashboardList__container">
            <header className='dashboard__header'>
                <h1>Lista de Estancias</h1>
            </header>
            <button className='button button--primary'>Agregar estancia</button>
            <section className='dashboardList__itemSection'>
                <Link>
                    <ItemList />
                </Link>
            </section>
        </main>
    )
}
