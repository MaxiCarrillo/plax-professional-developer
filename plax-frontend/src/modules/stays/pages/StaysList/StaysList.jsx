import { useContext, useState } from 'react';
import { PaginateItems } from '../../../core/components';
import { Modal } from '../../../core/components/Modal/Modal';
import { FormModalContext } from '../../../core/context';
import { StayForm } from '../../components';
import { useStay } from '../../hooks/useStay';
import './StaysList.css';

export const StaysList = () => {
    const { handleShowModal } = useContext(FormModalContext);
    const { stays, getStays, deleteStay, loading, totalPages, error } = useStay();
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const onRefetch = () => {
        setRefetch((prev) => !prev);
    }

    const addStay = () => {
        setContentModal(
            <StayForm
                title={'Agregar Estancia'}
                onRefetch={onRefetch}
            />
        );
        handleShowModal();
    }

    const editStay = (stay) => {
        setContentModal(
            <StayForm
                title={'Editar Estancia'}
                stay={stay}
                onRefetch={onRefetch}
            />
        );
        handleShowModal();
    }

    return (
        <main className="dashboardList__container">
            <header className='dashboard__header'>
                <h1>Lista de Estancias</h1>
            </header>
            <button className='button button--primary' onClick={() => addStay()}>Agregar estancia</button>
            <section className='dashboardList__itemSection'>
                <PaginateItems
                    fetchData={getStays}
                    loading={loading}
                    data={stays?.data}
                    totalPages={totalPages}
                    deleteItem={deleteStay}
                    error={error}
                    editItem={editStay}
                    refetch={refetch}
                    onRefetch={onRefetch}
                />
            </section>
            <Modal>
                {contentModal}
            </Modal>
        </main>
    )
}