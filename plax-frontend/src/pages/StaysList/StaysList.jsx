import './StaysList.css';
import { PaginateItems, ConfirmAction } from '../../components';
import { useStay } from '../../hooks';
import { useState } from 'react';

export const StaysList = () => {

    const { stays, getStays, loading, totalPages } = useStay();
    const [showModal, setShowModal] = useState(false);

    const openCloseModal = () => {
        setShowModal((prev) => !prev);
    }

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
                />
            </section>
            <ConfirmAction showModal={showModal} openCloseModal={openCloseModal} />
        </main>
    )
}