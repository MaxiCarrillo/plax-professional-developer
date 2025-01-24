import { HeartFilled, HeartOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import numeral from 'numeral';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/context/AuthContext';
import { NotificationContext } from '../../../core/context/notificationContext';
import userService from '../../../users/services/user.service';
import './StayCard.css';

export const StayCard = ({ stay }) => {
    const [loading, setLoading] = useState(false);
    const { toaster } = useContext(NotificationContext);
    const { user, token, updateUser } = useAuth();

    const handleAddFavorite = async () => {

        const body = {
            id: user.id,
            favorite: stay.id
        }

        try {
            setLoading(true);
            const response = await userService.addFavoriteStay(body, token);
            updateUser(response.data);
            toaster['success']({
                message: 'Estancia añadida a favoritos.',
                description: '¡Listo!',
                duration: 3
            })
        } catch (error) {
            toaster['error']({
                message: 'Error al añadir a favoritos.',
                description: error.message,
                duration: 3
            })
        } finally{
            setLoading(false);
        }
    }

    const handleRemoveFavorite = async () => {
        const body = {
            id: user.id,
            favorite: stay.id
        }

        try {
            setLoading(true);
            const response = await userService.removeFavoriteStay(body, token);
            updateUser(response.data);
            toaster['success']({
                message: 'Estancia eliminada de favoritos.',
                description: '¡Listo!',
                duration: 3
            })

        } catch (error) {
            toaster['error']({
                message: 'Error al eliminar de favoritos.',
                description: error.message,
                duration: 3
            })
        } finally {
            setLoading(false);
        }
    }

    const { id, name, images, address, price, appreciation, totalReviews } = stay;
    return (
        <article className='stayCard'>
            {
                user && (
                    user.favorites.find(item => {
                        return item.id === id
                    }) ? (
                        <button className='stayCard__favorite stayCard__favorite--active'
                            onClick={handleRemoveFavorite}
                            disabled={loading}
                        >
                            {loading ? <Loading3QuartersOutlined className='spin-animation' /> : <HeartFilled />}
                        </button>
                    ) : (
                        <button className='stayCard__favorite'
                            onClick={handleAddFavorite}
                            disabled={loading}
                        >
                            {loading ? <Loading3QuartersOutlined className='spin-animation' /> : <HeartOutlined />}
                        </button>
                    )
                )
            }
            <Link to={`/estancias/${id}`}>
                <article className='stayCard__container'>
                    <figure>
                        <img src={images[0]} alt="Hotel" height={250} width={250} />
                    </figure>
                    <div className='stayCard__info'>
                        <h3 className='stayCard__titulo'>{name}</h3>
                        <p>{address.street}</p>
                        {
                            totalReviews === 0 || !totalReviews ? <p className='stayCard___score'>Sin calificaciones</p>
                                :
                                <p className='stayCard___score'><span>{numeral(appreciation).format('0.0')}</span>{totalReviews} calificaciones</p>
                        }
                        <p className='stayCard__price'><small>1 noche</small><strong>${price}</strong></p>
                    </div>
                </article>
            </Link>
        </article>
    )
}
