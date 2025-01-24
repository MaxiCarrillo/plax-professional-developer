import { SearchOutlined } from '@ant-design/icons';
import { Empty, Skeleton } from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BooleanParam, useQueryParam } from 'use-query-params';
import { Modal } from '../../../core/components/Modal/Modal';
import { ReservationCard } from '../../components/ReservationCard/ReservationCard';
import { useReservation } from '../../hook/useReservation';
import './ReservationsUser.css';


export const ReservationsUser = () => {

    const [query, setQuery] = useQueryParam('history', BooleanParam);
    const { isLoading, success, error, reservations, getReservationsByUser } = useReservation();
    const [onRefetch, setOnRefetch] = useState(false);

    useEffect(() => {
        query ?
            getReservationsByUser()
            :
            getReservationsByUser(format(new Date(), 'yyyy-MM-dd'));
    }, [query, onRefetch]);

    const onRefetchData = () => {
        setOnRefetch(!onRefetch);
    }

    const handleViewHistory = () => {
        setQuery(true);
    }

    const handleViewCurrent = () => {
        setQuery(null);
    }

    return (
        <main className='ReservationsUser__container'>
            <h1>Mis reservas</h1>
            {
                query ?
                    <p className='ReservationsUser__container__option' onClick={handleViewCurrent}>Ver reservas actuales</p>
                    :
                    <p className='ReservationsUser__container__option' onClick={handleViewHistory}>Ver historial de reservas</p>
            }
            <hr className='separator' />
            {
                isLoading ?
                    <Skeleton
                        active
                        title={{ width: '100%', style: { height: "250px" } }}
                        paragraph={{ rows: 0 }} />
                    :
                    error ?
                        <Empty description='No se pudieron cargar las reservas' />
                        :
                        (success && reservations.length > 0) ? < section className='ReservationsUser__list'>
                            {
                                reservations.map((reservation, index) => {
                                    return (
                                        <ReservationCard reservation={reservation} key={index} onRefetch={onRefetchData} />
                                    )
                                })
                            }
                        </section>
                            :
                            <CardEmpty
                                title='¡No tienes reservas realizadas!'
                                description='Busca alojamientos y comienza a planificar tu próximo viaje.'
                            />
            }

            <hr className='separator' />
            <Modal />
        </main >
    )
}

export const CardEmpty = ({ title, description }) => {
    return (
        <section className='ReservationsUser__empty'>
            <p><strong>{title}</strong></p>
            <p>{description}</p>
            <Link to='/search' className='button button--base'><SearchOutlined />Explorar alojamientos</Link>
        </section>
    )
}