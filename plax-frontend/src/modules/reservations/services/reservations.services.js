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
    }
};

export default reservationService;