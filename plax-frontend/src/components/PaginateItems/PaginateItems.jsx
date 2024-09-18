import { useEffect, useState } from 'react';
import { ItemList } from '../../components';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export const PaginateItems = ({ fetchData, loading, data, totalPages }) => {
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handlePageClick = (selectedItem) => {
        const newOffset = selectedItem.selected;
        setCurrentPage(newOffset);
    }


    return (
        <>
            {
                loading ?
                    <div className="spinner" role="status" aria-live="polite" aria-label="Cargando">
                        <span className="visually-hidden">Cargando...</span>
                    </div> :
                    (
                        data.length === 0 ? <p>No hay estancias</p> :
                            data?.map((item, index) => (
                                <Link key={index} to={`/adminitracion/estancias/${item.id}`}>
                                    <ItemList key={index} data={item} />
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
        </>
    )
}
