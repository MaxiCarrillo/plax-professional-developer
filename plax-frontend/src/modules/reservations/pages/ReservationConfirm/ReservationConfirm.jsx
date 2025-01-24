import { CheckCircleOutlined, Loading3QuartersOutlined, SmileOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NotificationContext } from '../../../core/context/notificationContext';
import { useReservation } from '../../hook/useReservation';
import './ReservationConfirm.css';

export const ReservationConfirm = () => {

    const navigate = useNavigate();
    const { toaster } = useContext(NotificationContext);
    const { id } = useParams();
    const { confirmReservation, isLoading } = useReservation();

    const handleConfirm = async () => {
        console.log('Confirmar reserva', id);
        try {
            await confirmReservation(id);
            toaster['success']({
                message: 'Reserva confirmada.',
                description: `Su reserva con el código ${id} ha sido confirmada.`,
                duration: 3
            });
            navigate('/mis-reservas');
        } catch (error) {
            toaster['error']({
                message: 'Error al confirmar reserva.',
                description: error.message,
                duration: 3
            });
        }
    }

    return (
        <main className='ReservationConfirm__container'>
            <section>
                <SmileOutlined className='ReservationConfirm__icon' />
                <h1 className='ReservationConfirm__title'>¡Felicidades su reserva se ha realizado con éxito!</h1>
                <p>No te olvides confirmar tu reserva, podes hacerlo ahora mismo o más adelante.</p>
            </section>
            <section className='ReservationConfirm__actions'>
                <button
                    className='button button--primary'
                    onClick={handleConfirm}
                    disabled={isLoading}
                >
                    {isLoading ? <Loading3QuartersOutlined className='spin-animation' /> : <CheckCircleOutlined />}
                    Confirmar reserva
                </button>
                <Link to='/mis-reservas' className='button button--secondary'>Ir a reservas</Link>
            </section>
        </main>
    )
}
