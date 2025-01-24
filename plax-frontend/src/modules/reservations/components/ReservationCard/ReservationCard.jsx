import { CheckCircleOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { useContext } from 'react';
import { FormModalContext } from '../../../core/context';
import { NotificationContext } from '../../../core/context/notificationContext';
import { ReviewForm } from '../../../reviews/components';
import { useReservation } from '../../hook/useReservation';

import numeral from 'numeral';
import './ReservationCard.css';

export const ReservationCard = ({ reservation, onRefetch }) => {

    const { toaster } = useContext(NotificationContext);
    const { handleShowModal, handleContentModal } = useContext(FormModalContext);
    const { confirmReservation, isLoading } = useReservation();

    const handleConfirm = async () => {
        try {
            await confirmReservation(reservation.id);
            onRefetch();
            toaster['success']({
                message: 'Reserva confirmada.',
                description: `Su reserva con el código ${reservation.id} ha sido confirmada.`,
                duration: 3
            });
        } catch (error) {
            toaster['error']({
                message: 'Error al confirmar reserva.',
                description: error.message,
                duration: 3
            });
        }
    }

    const handleShowReviewModal = () => {
        handleContentModal(
            <ReviewForm reservation={reservation} onRefetch={onRefetch} />
        )
        handleShowModal();
    }

    return (
        <article className='ReservationCard__container'>
            <figure className='ReservationCard__figure'>
                {
                    reservation.stay.appreciation > 0 &&
                    <p className='ReservationCard__appreciation'>{numeral(reservation.stay.appreciation).format('0.0')}</p>
                }
                <img src={reservation.stay.images[0]} alt={reservation.stay.name} />
                {
                    reservation.confirmed &&
                    (reservation.reviewed ? null : <button className='button button--secondary' onClick={handleShowReviewModal}>Calificar estancia</button>)
                }
            </figure>
            <section className='ReservationCard__content'>
                <section className='ReservationCard__stay-header'>
                    <h2>{reservation.stay.name}</h2>
                    <p>{reservation.stay.address.street} {reservation.stay.address.city}, {reservation.stay.address.country}</p>
                </section>
                <section className='ReservationCard__reservation-info'>
                    <p className='ReservationCard__info-text'>Entrada<strong>{format(reservation.checkIn, "dd/MM/yyyy")}</strong></p>
                    <p className='ReservationCard__info-text'>Salida<strong>{format(reservation.checkOut, "dd/MM/yyyy")}</strong></p>
                    <p className='ReservationCard__info-text'>Precio total<strong>${reservation.total}</strong></p>
                </section>
                <p className='ReservationCard__info-text'>Nombre del cliente<strong>{reservation.user.firstname} {reservation.user.lastname}</strong></p>
                <p className='ReservationCard__info-text'>Email<strong>{reservation.user.email}</strong></p>
                {
                    reservation.confirmed ?
                        <p className='ReservationCard__confirm' ><CheckCircleOutlined className='icon' /> Confirmada</p>
                        :
                        <button className='button button--primary' onClick={handleConfirm} disabled={isLoading}>
                            {isLoading ? <Loading3QuartersOutlined className='spin-animation' /> : <CheckCircleOutlined/>}
                            Confirmar reserva
                        </button>
                }
            </section>

        </article>
    )
}
