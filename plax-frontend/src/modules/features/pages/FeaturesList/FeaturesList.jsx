import { useContext, useState } from 'react';
import { PaginateItems } from '../../../core/components';
import { Modal } from '../../../core/components/Modal/Modal';
import { FormModalContext } from '../../../core/context';
import { FeatureForm } from '../../components';
import { useFeature } from '../../hooks/useFeature';

export const FeaturesList = () => {
    const { handleShowModal } = useContext(FormModalContext);
    const { features, getFeatures, deleteFeature, loading, totalPages, error } = useFeature();
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const onRefetch = () => {
        setRefetch((prev) => !prev);
    }

    const addFeature = () => {
        setContentModal(
            <FeatureForm
                title={'Agregar Característica'}
                onRefetch={onRefetch}
            />
        );
        handleShowModal();
    }

    const editFeature = (feature) => {
        setContentModal(
            <FeatureForm
                title={'Editar Característica'}
                onRefetch={onRefetch}
                feature={feature}
            />
        );
        handleShowModal();
    }

    return (
        <main className="dashboardList__container">
            <header className='dashboard__header'>
                <h1>Lista de características</h1>
            </header>
            <button className='button button--primary' onClick={() => addFeature()}>Agregar característica</button>
            <section className='dashboardList__itemSection'>
                <PaginateItems
                    fetchData={getFeatures}
                    loading={loading}
                    data={features?.data}
                    totalPages={totalPages}
                    deleteItem={deleteFeature}
                    error={error}
                    editItem={editFeature}
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
