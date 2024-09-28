import { useEffect, useState } from 'react';
import { ItemList, ConfirmAction } from '../../components';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export const PaginateItems = ({ fetchData, loading, data, deleteItem, totalPages, error }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, refetch]);

    const onRefetch = () => {
        setRefetch((prev) => !prev);
    }

    const handlePageClick = (selectedItem) => {
        const newOffset = selectedItem.selected;
        setCurrentPage(newOffset);
    }

    const openCloseModal = () => {
        setShowModal((prev) => !prev);
    }

    const selectItem = (id) => {
        setDeleteItemId(id);
    }

    return (
        error ? <p>Ha ocurrido un error</p> : 
        <>
            {
                loading ?
                    <div className="spinner" role="status" aria-live="polite" aria-label="Cargando">
                        <span className="visually-hidden">Cargando...</span>
                    </div> :
                    (
                        data?.length === 0 ? <p>No hay estancias</p> :
                            data?.map((item, index) => (
                                <Link key={index} to={`/administracion/estancias/${item.id}`}>
                                    <ItemList
                                        key={index}
                                        data={item}
                                        openCloseModal={openCloseModal}
                                        deleteItem={selectItem}
                                    />
                                </Link>
                            ))

                    )
            }
            <ReactPaginate
                previousLabel='Anterior'
                nextLabel='Siguiente'
                breakLabel='...'
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={totalPages}
                containerClassName='pagination'
                pageClassName='page'
                breakClassName='page'
                breakLinkClassName='page__link'
                previousClassName='page page--letter'
                nextClassName='page page--letter'
                nextLinkClassName='page__link'
                previousLinkClassName='page__link'
                pageLinkClassName='page__link'
                activeClassName='page--active'
                activeLinkClassName='page--active'
                disabledClassName='page--disabled'
            />
            <ConfirmAction
                showModal={showModal}
                openCloseModal={openCloseModal}
                deleteItem={() => deleteItem(deleteItemId)}
                onRefetch={onRefetch}
            />
        </>
    )
}
