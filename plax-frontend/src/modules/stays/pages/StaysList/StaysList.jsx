import './StaysList.css';
import { PaginateItems, FormModal } from '../../../core/components';
import { StayForm } from '../../components';
import { useStay } from '../../hooks/useStay';
import { useState } from 'react';

export const StaysList = () => {

    const { stays, getStays, deleteStay, loading, totalPages, error } = useStay();
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const onRefetch = () => {
        setRefetch((prev) => !prev);
    }

    const openCloseModalAddEdit = () => {
        setShowModal((prev) => !prev);
    }

    const addStay = () => {
        setContentModal(
            <StayForm
                title={'Agregar Estancia'}
                openCloseModal={openCloseModalAddEdit}
                onRefetch={onRefetch}
            />
        );
        openCloseModalAddEdit();
    }

    const editStay = (stay) => {
        setContentModal(
            <StayForm
                title={'Editar Estancia'}
                stay={stay}
                openCloseModal={openCloseModalAddEdit}
                onRefetch={onRefetch}
            />
        );
        openCloseModalAddEdit();
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
            <FormModal showModal={showModal} openCloseModal={openCloseModalAddEdit}>
                {contentModal}
            </FormModal>
        </main>
    )
}