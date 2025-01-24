import { Empty } from 'antd';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { ConfirmAction, ItemList, ItemSkeleton } from '../../components';

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
        <>
            {
                loading ?
                    <>
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                        <ItemSkeleton />
                    </>
                    :
                    error ? <Empty description="¡Ops! Ha ocurrido un error." /> :
                        (
                            data?.length === 0 ? <Empty description="¡Ops! No hay datos cargados." /> :
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
