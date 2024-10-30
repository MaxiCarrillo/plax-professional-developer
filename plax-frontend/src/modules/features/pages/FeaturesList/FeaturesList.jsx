import { PaginateItems, FormModal } from '../../../core/components';
import { FeatureForm } from '../../components';
import { useFeature } from '../../hooks/useFeature';
import { useState, useContext } from 'react';
import { FormModalContext } from '../../../core/context';

export const FeaturesList = () => {
    const { openCloseModal } = useContext(FormModalContext);
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
        openCloseModal();
    }

    const editFeature = (feature) => {
        setContentModal(
            <FeatureForm
                title={'Editar Característica'}
                onRefetch={onRefetch}
                feature={feature}
            />
        );
        openCloseModal();
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
            <FormModal>
                {contentModal}
            </FormModal>
        </main>
    )
}
