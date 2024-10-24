import { useEffect, useState } from 'react';
import { ItemList, ConfirmAction } from '../../components';
import { Link, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export const PaginateItems = ({ fetchData, loading, data, deleteItem, totalPages, error, editItem, refetch, onRefetch }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, refetch]);

    const handlePageClick = (selectedItem) => {
        const newOffset = selectedItem.selected;
        setCurrentPage(newOffset);
    }

    const openCloseModalDelete = () => {
        setShowModal((prev) => !prev);
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
                            data?.length === 0 ? <p>No hay elementos</p> :
                                data?.map((item, index) => (
                                    <Link key={index} to={`${location.pathname}/${item.id}`}>
                                        <ItemList
                                            key={index}
                                            data={item}
                                            openCloseModal={openCloseModalDelete}
                                            setDeleteItemId={setDeleteItemId}
                                            editItem={editItem}
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
                    openCloseModal={openCloseModalDelete}
                    deleteItem={() => deleteItem(deleteItemId)}
                    onRefetch={onRefetch}
                />
            </>
    )
}
