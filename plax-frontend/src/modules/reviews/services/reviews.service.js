import api from "../../core/api";

const reviewService = {
    createReview: async (body, token) => {
        return api.post('/reviews', body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(() => {
            throw new Error('No se pudo crear la review. Por favor, intente nuevamente más tarde.');
        });
    },

    getReviewsByStay: async (id) => {
        return api.get(`/reviews/stay/${id}`)
            .then(response => {
                return response.data;
            }).catch(() => {
                throw new Error('No se pudieron obtener las reviews. Por favor, intente nuevamente más tarde.');
            });
    }
}

export default reviewService;