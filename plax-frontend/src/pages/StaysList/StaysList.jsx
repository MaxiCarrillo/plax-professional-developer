import './StaysList.css';
import { PaginateItems } from '../../components';
import { useStay } from '../../hooks/';

export const StaysList = () => {

    const { stays, getStays, deleteStay, loading, totalPages, error } = useStay();

    return (
        <main className="dashboardList__container">
            <header className='dashboard__header'>
                <h1>Lista de Estancias</h1>
            </header>
            <button className='button button--primary'>Agregar estancia</button>
            <section className='dashboardList__itemSection'>
                <PaginateItems
                    fetchData={getStays}
                    loading={loading}
                    data={stays?.data}
                    totalPages={totalPages}
                    deleteItem={deleteStay}
                    error={error}
                />
            </section>
        </main>
    )
}