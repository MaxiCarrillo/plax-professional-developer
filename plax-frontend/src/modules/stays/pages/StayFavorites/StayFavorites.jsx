import { HeartFilled } from '@ant-design/icons';
import { useAuth } from '../../../auth/context/AuthContext';
import { StayCard } from '../../components';
import './StayFavorites.css';

export const StayFavorites = () => {

    const { user } = useAuth();

    return (
        <main className='StayFavorites__container'>
            <h1>Mi próximo viaje</h1>
            <p className='StayFavorites__count'><HeartFilled /> {user?.favorites.length} alojamiento guardado.</p>
            <div className='StayFavorites__description'>
                <p><strong>Consulta tus alojamientos guardados estés donde estés</strong></p>
                <p>En esta página se mostrarán los alojamientos favoritos del usuario</p>
            </div>
            <section className='StayFavorites__list'>
                {
                    user.favorites?.map((favorite, index) => {
                        return <StayCard stay={favorite} key={index} />
                    })
                }
            </section>
        </main>
    )
}
