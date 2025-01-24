import { ArrowLeftOutlined, CalendarOutlined, CameraOutlined, HeartFilled, HeartOutlined, Loading3QuartersOutlined, ShareAltOutlined, StarFilled, UserOutlined } from '@ant-design/icons';
import { DatePicker, Empty, Skeleton } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import { differenceInDays } from 'date-fns';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import ImageFallback from '../../../../assets/images/image-fallback.jpg';
import { useAuth } from '../../../auth/context/AuthContext';
import { Modal } from '../../../core/components/Modal/Modal';
import { FormModalContext } from '../../../core/context';
import { NotificationContext } from '../../../core/context/notificationContext';
import { useReservation } from '../../../reservations/hook/useReservation';
import { ReviewCard } from '../../../reviews/components/ReviewCard/ReviewCard';
import userService from '../../../users/services/user.service';
import { StayShare } from '../../components/StayShare/StayShare';
import { useStay } from '../../hooks/useStay';
import './StayDetail.css';

export const StayDetail = () => {

    const { toaster } = useContext(NotificationContext);
    const [loadingFavorite, setLoadingFavorite] = useState(false);
    const { user, token, updateUser } = useAuth();
    const [reservation, setReservation] = useState({
        total: 0,
        dateRange: []
    });
    const { RangePicker } = DatePicker;
    const { stay, getStay, loading, error } = useStay();
    const { createReservation, isLoading } = useReservation();
    const { handleShowModal, handleContentModal } = useContext(FormModalContext);

    const { id } = useParams();

    const dialogRef = useRef(null);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

    useEffect(() => {
        getStay(id);
    }, [])

    const handleClickShowImages = () => {
        dialogRef.current.showModal();
    }

    const handleClickCloseDialog = () => {
        dialogRef.current.close();
    }

    const handleAddFavorite = async () => {

        const body = {
            id: user.id,
            favorite: stay.id
        }

        try {
            setLoadingFavorite(true);
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
        } finally {
            setLoadingFavorite(false);
        }
    }

    const handleRemoveFavorite = async () => {
        const body = {
            id: user.id,
            favorite: stay.id
        }

        try {
            setLoadingFavorite(true);
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
            setLoadingFavorite(false);
        }
    }

    const handleDateRangeOnChange = (date) => {
        setReservation((prevState) => ({
            ...prevState,
            dateRange: date
        }))
        if (date !== null && date[0] && date[1]) {
            let days = differenceInDays(date[1], date[0]);
            if (days === 0) days = 1;
            setReservation((prevState) => ({
                ...prevState,
                total: days * stay.price
            }))
        } else {
            setReservation((prevState) => ({
                ...prevState,
                total: 0
            }))
        }
    }

    const handleReservation = async () => {
        if (reservation.dateRange === null || !reservation.dateRange[0] || !reservation.dateRange[1] || reservation.total === 0) {
            toaster['error']({
                message: 'Debe completar todos los campos',
                description: 'Por favor, seleccione un rango de fechas.',
                duration: 3
            });
            return;
        }

        const body = {
            id_stay: stay.id,
            id_user: user.id,
            checkIn: reservation.dateRange[0].format('YYYY-MM-DD'),
            checkOut: reservation.dateRange[1].format('YYYY-MM-DD'),
            total: reservation.total
        }

        console.log(body);

        try {
            const data = await createReservation(body);
            navigate(`/confirmar-reserva/${data.id}`);
            toaster['success']({
                message: 'Reserva realizada',
                description: `Se ha realizado la reserva de ${stay.name} por un total de $${reservation.total}`,
                duration: 3
            });
        } catch (error) {
            toaster['error']({
                message: 'Error al realizar la reserva',
                description: error.message,
                duration: 3
            });
        }

    }

    const handleShare = () => {
        handleShowModal();
        handleContentModal(<StayShare stay={stay} />);
    }

    const images = (images) => {
        const displayedImages = images.slice(0, 5);
        while (displayedImages.length < 5) {
            displayedImages.push(ImageFallback);
        }

        return displayedImages.map((image, index) => (
            <figure key={index}>
                <img src={image} alt={stay.name} />
            </figure>
        ));
    }

    const disabledDate = (current) => {
        const unavailableDates = stay?.unavailableDates?.map((date) => dayjs(date));
        // Deshabilita fechas anteriores a hoy
        if (current && current < dayjs().startOf('day')) {
            return true;
        }

        // Deshabilita fechas no disponibles
        if (unavailableDates) {
            return unavailableDates.some((date) => date.isSame(current, 'day'));
        }

        return false;
    };

    return (
        <main className='StayDetail__container'>
            {
                loading ? (
                    <>
                        <Skeleton
                            active
                            title={{ style: { height: "16px" } }}
                            paragraph={{ rows: 0 }} />
                        <Skeleton
                            active
                            title={{ width: "100%", style: { height: "700px" } }}
                            paragraph={{ rows: 0 }} />
                    </>
                ) : (
                    !stay ? <>
                        <header className='StayDetail__header'>
                            <button className='StayDetail__back' onClick={handleBackClick}>
                                <ArrowLeftOutlined />
                                Volver atrás
                            </button>
                        </header>
                        <Empty description='No se encontró la estancia' />
                    </> :
                        <>
                            <Helmet>
                                <title>{stay.name} | Plax</title>
                                <meta name="description" content={stay.description} />
                                <meta property="og:title" content={stay.name} />
                                <meta property="og:description" content={stay.description} />
                                <meta property="og:image" content={stay.images[0]} />
                                <meta property="og:url" content={window.location.href} />
                                <meta property="og:type" content="website" />
                                <meta property="og:site_name" content="Plax" />
                                <meta name="twitter:title" content={stay.name} />
                                <meta name="twitter:description" content={stay.description} />
                                <meta name="twitter:site" content="@carrillomaxj" />
                                <meta name="twitter:creator" content="@carrillomaxj" />
                                <meta name="twitter:image" content={stay.images[0]} />
                            </Helmet>
                            <header className='StayDetail__header'>
                                <button className='StayDetail__back' onClick={handleBackClick}>
                                    <ArrowLeftOutlined />
                                    Volver atrás
                                </button>
                                <div className='StayDetail__header-info'>
                                    <h1>{stay.name}</h1>
                                    <div className='StayDetail__header-actions'>
                                        <button className='button--icon' onClick={handleShare}>
                                            <ShareAltOutlined />
                                        </button>
                                        {
                                            user && (
                                                user.favorites.find(item => {
                                                    return item.id === id
                                                }) ? (
                                                    <button className='stayCard__favorite stayCard__favorite--active'
                                                        onClick={handleRemoveFavorite}
                                                        disabled={loadingFavorite}
                                                    >
                                                        {loadingFavorite ? <Loading3QuartersOutlined className='spin-animation' /> : <HeartFilled />}
                                                    </button>
                                                ) : (
                                                    <button className='stayCard__favorite'
                                                        onClick={handleAddFavorite}
                                                        disabled={loading}
                                                    >
                                                        {loadingFavorite ? <Loading3QuartersOutlined className='spin-animation' /> : <HeartOutlined />}
                                                    </button>
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            </header>
                            <section className='StayDetail__galery'>
                                {
                                    images(stay?.images)
                                }
                                <button
                                    className='stayGalery__button button button--secondary'
                                    onClick={() => handleClickShowImages()}
                                >
                                    <CameraOutlined />
                                    Mostrar todas las fotos
                                </button>
                            </section>
                            <section className='StayDetail__info'>
                                <div className='StayDetail__information-container'>
                                    <section>
                                        <h2>Información del alojamiento</h2>
                                        <div className='StayDetail__description'>
                                            <p>Dirección</p>
                                            <p className='StayDetail__location'>
                                                {stay.address.street}, {stay.address.city} {stay.address.country}
                                            </p>
                                        </div>
                                        <div className='StayDetail__description'>
                                            <p>Descripción</p>
                                            <p>{stay.description}</p>
                                        </div>
                                    </section>
                                    <hr className='separator' />
                                    <section className='stayDetail__features'>
                                        <h2>Características</h2>
                                        <ul>
                                            {
                                                stay?.features?.map((feature, index) =>
                                                    <li key={index}>
                                                        <ReactSVG
                                                            src={feature.icon}
                                                            beforeInjection={(svg) => {
                                                                svg.setAttribute("fill", "#ff8e3d");
                                                            }}
                                                        />
                                                        <span>{feature.name}</span>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </section>
                                    <hr className='separator' />
                                    <section>
                                        <h2>Políticas</h2>
                                        <div className='StayDetail__description__container'>
                                            {
                                                stay.policies.map((policy, index) =>
                                                    <div key={index} className='StayDetail__description'>
                                                        <p><strong>{policy.policy}</strong></p>
                                                        <p>{policy.description}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </section>
                                </div>
                                <div className='StayDetail__booking'>
                                    <p className='StayDetail__pricePerNight'>
                                        <span>${stay.price}</span> por noche
                                    </p>
                                    <RangePicker
                                        id="date"
                                        className='form__date-rage-picker'
                                        onChange={handleDateRangeOnChange}
                                        format={'DD/MM/YYYY'}
                                        placeholder={['Check-in', 'Check-out']}
                                        locale={locale}
                                        disabledDate={disabledDate}
                                        disabled={isLoading}
                                    />
                                    {
                                        user ?
                                            <button
                                                className='button button--primary'
                                                onClick={handleReservation}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? <Loading3QuartersOutlined className='spin-animation' /> : <CalendarOutlined />}
                                                Reservar
                                            </button> :
                                            <Link
                                                className='button button--base'
                                                to='/iniciar-sesion'
                                            >
                                                <UserOutlined />Iniciar sesión
                                            </Link>
                                    }
                                    <div className='StayDetail__price'>
                                        <p>Total</p>
                                        <p>${reservation.total}</p>
                                    </div>
                                </div>
                            </section>
                            <hr className='separator' />
                            {
                                stay.totalReviews === 0 ?
                                    // TODO: Crear componente de mensaje de no hay calificaciones 
                                    <p>No hay calificaciones</p>
                                    :
                                    <section className='stayDetail__reviews'>
                                        <h2><StarFilled /> {numeral(stay.appreciation).format('0.0')} • {stay.totalReviews} Calificaciones</h2>
                                        <div className='stayDetail__reviews-comments'>
                                            {
                                                loading ?
                                                    <p>Cargando...</p>
                                                    :
                                                    error ?
                                                        <p>Error</p>
                                                        :
                                                        stay.reviews.map((review, index) =>
                                                            <ReviewCard key={index} review={review} />
                                                        )}
                                        </div>
                                    </section>
                            }
                            <dialog ref={dialogRef} className='dialogGallery__dialog'>
                                <div className='dialogGallery__container'>
                                    <button
                                        className='dialogGallery__close'
                                        onClick={() => handleClickCloseDialog()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                    </button>
                                    <Carousel showArrows={true} infiniteLoop={true} className='gallery__container'>
                                        {
                                            stay?.images?.map((image, index) =>
                                                <div key={index}>
                                                    <img src={image} alt={stay.name} className='' />
                                                </div>
                                            )
                                        }
                                    </Carousel>
                                </div>
                            </dialog>
                            <Modal />
                        </>
                )
            }
        </main>
    )
}