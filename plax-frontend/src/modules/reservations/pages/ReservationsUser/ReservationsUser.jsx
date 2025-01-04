import { Link } from 'react-router-dom';
import './ReservationsUser.css';
import { ReservationCard } from '../../components/ReservationCard/ReservationCard';

const reservations = [
    {
        "id": "4e2a0782-6c38-4b91-9e87-758deb44ba72",
        "checkIn": "2024-12-28",
        "checkOut": "2024-12-28",
        "total": 50000.0,
        "stay": {
            "id": "8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8",
            "name": "Hotel Duna",
            "price": 50000.0,
            "images": [
                "http://localhost:8080/api/stays/images/hotel-duna-1.jpg",
                "hotel-duna-2.jpg",
                "hotel-duna-1.jpg",
                "hotel-duna-3.jpg",
                "hotel-duna-4.jpg"
            ],
            "address": {
                "id": "fccf90c9-288e-451c-9543-d03375c9efab",
                "street": "Av. Playa 123",
                "city": "Buenos Aires",
                "country": "Argentina"
            },
            "appreciation": 0.0
        },
        "user": {
            "id": "8b07383c-cfbe-4dfe-b122-3ee0f5ac4234",
            "firstname": "Lionel",
            "lastname": "Messi",
            "email": "messi@gmail.com"
        }
    }
]

export const ReservationsUser = () => {
    return (
        <main className='ReservationsUser__container'>
            <h1>Mis reservas</h1>
            <Link>Ver historial completo</Link>
            <hr className='separator' />
            {/* <CardEmpty
                title='¡No tienes reservas actualmente!'
                description='Sacá las valijas del armario y empezá a planificar tu próxima aventura.'
            /> */}
            <section className='ReservationsUser__list'>
                {
                    reservations.map((reservation, index) => {
                        return (
                            <ReservationCard reservation={reservation} key={index} />
                        )
                    })
                }
            </section>
            <hr className='separator' />
        </main>
    )
}

const CardEmpty = ({ title, description }) => {
    return (
        <section className='ReservationsUser__empty'>
            <p><strong>{title}</strong></p>
            <p>{description}</p>
            <Link to='/search' className='button button--base'>Explorar alojamientos</Link>
        </section>
    )
}