import { HeartFilled } from '@ant-design/icons';
import { useAuth } from '../../../auth/context/AuthContext';
import { CardEmpty } from '../../../reservations/pages/ReservationsUser/ReservationsUser';
import { StayCard } from '../../components';
import './StayFavorites.css';
import { useUser } from '../../../users/hooks/useUser';
import { useEffect } from 'react';

export const StayFavorites = () => {

    const { getUserAuthenticated, loading } = useUser();
    const { user } = useAuth();

    useEffect(() => {
        getUserAuthenticated();
    }, []);

    return (
        <main className='StayFavorites__container'>
            <h1>Mi próximo viaje</h1>
            <p className='StayFavorites__count'><HeartFilled /> {user?.favorites.length} alojamiento guardado.</p>
            <div className='StayFavorites__description'>
                <p><strong>Consulta tus alojamientos guardados estés donde estés</strong></p>
                <p>En esta página se mostrarán los alojamientos favoritos del usuario</p>
            </div>
            <hr className='separator' />
            <section className='StayFavorites__list'>
                {
                    user?.favorites && user.favorites.length > 0 ?
                        user.favorites?.map((favorite, index) => {
                            return <StayCard stay={favorite} key={index} />
                        }) :
                        <CardEmpty
                            title='¡Aún no tienes estancias en favoritos!'
                            description='Explora alojamientos y guárdalos para planificar tu próximo viaje con facilidad.'
                        />
                }
            </section>
        </main>
    )
}
