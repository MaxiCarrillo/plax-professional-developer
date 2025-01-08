import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import { differenceInDays } from 'date-fns';
import { useContext, useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import ImageFallback from '../../../../assets/images/image-fallback.jpg';
import { useAuth } from '../../../auth/context/AuthContext';
import { NotificationContext } from '../../../core/context/notificationContext';
import { useReservation } from '../../../reservations/hook/useReservation';
import { useStay } from '../../hooks/useStay';
import './StayDetail.css';

export const StayDetail = () => {

    const { toaster } = useContext(NotificationContext);
    const { user } = useAuth();
    const [reservation, setReservation] = useState({
        total: 0,
        dateRange: []
    });
    const { RangePicker } = DatePicker;
    const { stay, getStay, loading } = useStay();
    const { createReservation, isLoading } = useReservation();
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

    return (
        <main className='StayDetail__container'>
            {
                loading ? (
                    <p>Cargando...</p>
                ) : (
                    !stay ? <p>Estancia no encontrada</p> :
                        <>
                            <header className='StayDetail__header'>
                                <button className='StayDetail__back' onClick={handleBackClick}>
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.62969 6.1875L6.47969 10.0375L5.5 11L0 5.5L5.5 0L6.47969 0.9625L2.62969 4.8125H11V6.1875H2.62969Z" fill="#FF8E3C" />
                                    </svg>
                                    Volver atrás
                                </button>
                                <h1>{stay.name}</h1>
                            </header>
                            <section className='StayDetail__galery'>
                                {
                                    images(stay?.images)
                                }
                                <button
                                    className='stayGalery__button button button--secondary'
                                    onClick={() => handleClickShowImages()}
                                >
                                    Mostrar todas las fotos
                                </button>
                            </section>
                            <section className='StayDetail__info'>
                                <div className='StayDetail__information-container'>
                                    <div>
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
                                    </div>
                                    <hr className='separator' />
                                    <div>
                                        <h2>Políticas</h2>
                                        <p>No se aceptan invitados de los huespedes para pasar la noche y esta prohibido el ingreso de animales.</p>
                                    </div>
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
                                    />
                                    <button
                                        className='button button--primary'
                                        onClick={handleReservation}
                                        disabled={isLoading}
                                    >
                                        Reservar
                                    </button>
                                    <div className='StayDetail__price'>
                                        <p>Total</p>
                                        <p>${reservation.total}</p>
                                    </div>
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
                        </>
                )
            }
        </main>
    )
}