import api from "../../core/api";

const reservationService = {
    createReservation: async (body, token) => {
        return api.post('/reservations', body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(() => {
            throw new Error('No se pudo crear la reserva. Por favor, intente nuevamente más tarde.');
        });
    },

    getReservationsByUser: async (token, date) => {
        const params = date ? `?date=${date}` : '';
        return api.get(`/reservations/user${params}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(() => {
            throw new Error('No se pudieron obtener las reservas. Por favor, intente nuevamente más tarde.');
        });
    }
};

export default reservationService;