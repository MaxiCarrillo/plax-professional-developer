import './ReservationCard.css';

export const ReservationCard = ({ reservation }) => {
    return (
        <article className='ReservationCard__container'>
            <figure className='ReservationCard__figure'>
                <img src={reservation.stay.images[0]} alt={reservation.stay.name} />
            </figure>
            <section>
                <section>
                    <p>{reservation.stay.appreciation}</p>
                    <div>
                        <h2>{reservation.stay.name}</h2>
                        <p>{reservation.stay.address.street} {reservation.stay.address.city}, {reservation.stay.address.country}</p>
                    </div>
                </section>
                <section>
                    <p><strong>Entrada</strong> {reservation.checkIn}</p>
                    <p><strong>Salida</strong> {reservation.checkOut}</p>
                    <p><strong>Precio total:</strong> ${reservation.total}</p>
                </section>
                <p><strong>Nombre del cliente:</strong>{reservation.user.firstname} {reservation.user.lastname}</p>
                <p><strong>Email:</strong>{reservation.user.email}</p>
                <button className='button button--primary'>Confirmar reserva</button>
            </section>
        </article>
    )
}
