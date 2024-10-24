import { PaginateItems, FormModal } from "../../../core/components";
import { useCategory } from "../../hooks/useCategory";
import { useState, useContext } from "react";
import { FormModalContext } from "../../../core/context";
import { CategoryForm } from "../../components";

export const CategoriesList = () => {
    const { openCloseModal } = useContext(FormModalContext);
    const { categories, getCategories, deleteCategory, loading, totalPages, error } = useCategory();
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const onRefetch = () => {
        setRefetch((prev) => !prev);
    }

    const addCategory = () => {
        setContentModal(
            <CategoryForm 
                title={'Agregar Categoria'}
                onRefetch={onRefetch}
            />
        );
        openCloseModal();
    }

    const editCategory = (category) => {
        setContentModal(
            <CategoryForm 
                title={'Editar Categoria'}
                onRefetch={onRefetch}
                category={category}
            />
        );
        openCloseModal();
    }

    return (
        <main className="dashboardList__container">
            <header className='dashboard__header'>
                <h1>Lista de Categorias</h1>
            </header>
            <button className='button button--primary' onClick={() => addCategory()}>Agregar categoria</button>
            <section className='dashboardList__itemSection'>
                <PaginateItems
                    fetchData={getCategories}
                    loading={loading}
                    data={categories?.data}
                    totalPages={totalPages}
                    deleteItem={deleteCategory}
                    error={error}
                    editItem={editCategory}
                    refetch={refetch}
                    onRefetch={setRefetch}
                />
            </section>
            <FormModal>
                {contentModal}
            </FormModal>
        </main>
    )
}
