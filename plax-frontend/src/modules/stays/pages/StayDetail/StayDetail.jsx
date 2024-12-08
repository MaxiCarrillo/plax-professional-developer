import { useEffect, useRef } from 'react';
import './StayDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useStay } from '../../hooks/useStay';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageFallback from '../../../../assets/images/image-fallback.jpg';
import { ReactSVG } from 'react-svg';

export const StayDetail = () => {
    const { stay, getStay, loading } = useStay();
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
                                <p className='StayDetail__location'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 19.35C14.0333 17.4833 15.5417 15.7875 16.525 14.2625C17.5083 12.7375 18 11.3833 18 10.2C18 8.38333 17.4208 6.89583 16.2625 5.7375C15.1042 4.57917 13.6833 4 12 4C10.3167 4 8.89583 4.57917 7.7375 5.7375C6.57917 6.89583 6 8.38333 6 10.2C6 11.3833 6.49167 12.7375 7.475 14.2625C8.45833 15.7875 9.96666 17.4833 12 19.35ZM12 22C9.31666 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z" fill="#23262F" />
                                    </svg>
                                    {stay.address}
                                </p>
                                <p className='StayDetail__description'>
                                    {stay.description}
                                </p>
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