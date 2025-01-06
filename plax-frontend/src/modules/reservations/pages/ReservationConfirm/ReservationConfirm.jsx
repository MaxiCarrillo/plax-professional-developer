import { Link, useParams } from 'react-router-dom'
import './ReservationConfirm.css'
import { SmileOutlined } from '@ant-design/icons'

export const ReservationConfirm = () => {

    const { id } = useParams();

    const handleConfirm = () => {
        console.log('Confirmar reserva', id);
    }

    return (
        <main className='ReservationConfirm__container'>
            <section>
                <SmileOutlined className='ReservationConfirm__icon' />
                <h1 className='ReservationConfirm__title'>¡Felicidades su reserva se ha realizado con éxito!</h1>
                <p>No te olvides confirmar tu reserva, podes hacerlo ahora mismo o más adelante.</p>
            </section>
            <section className='ReservationConfirm__actions'>
                <button className='button button--primary' onClick={handleConfirm}>Confirmar reserva</button>
                <Link to='/mis-reservas' className='button button--secondary'>Ir a reservas</Link>
            </section>
        </main>
    )
}
