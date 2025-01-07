import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { FormModalContext } from '../../../core/context';
import { ReviewForm } from '../../../reviews/components';
import './ReservationCard.css';
import { CheckCircleOutlined } from '@ant-design/icons';

export const ReservationCard = ({ reservation }) => {

    const { handleShowModal, handleContentModal } = useContext(FormModalContext);

    const handleConfirm = () => {
        handleContentModal(
            <ReviewForm reservation={reservation} />
        )
        handleShowModal();
    }

    return (
        <article className='ReservationCard__container'>
            <figure className='ReservationCard__figure'>
                <p className='ReservationCard__appreciation'>{reservation.stay.appreciation}</p>
                <img src={reservation.stay.images[0]} alt={reservation.stay.name} />
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
                        <button className='button button--primary' onClick={handleConfirm}>Confirmar reserva</button>
                }
            </section>

        </article>
    )
}
