import api from "../../core/api";

const featureService = {
    getFeatures: (page, size) => {
        return api.get(`/features?page=${page}&size=${size}`)
            .then(response => {
                return response.data;
            }).catch(() => {
                throw new Error('No se pudieron obtener las características. Por favor, intente nuevamente más tarde');
            });
    },
    getAllFeatures: () => {
        return api.get('/features/all')
            .then(response => {
                return response.data;
            }).catch(() => {
                throw new Error('No se pudieron obtener las características. Por favor, intente nuevamente más tarde');
            });
    },
    getFeature: (id) => {
        return api.get(`/features/${id}`)
            .then(response => {
                return response.data;
            }).catch(error => {
                if (error.response.status === 404) throw new Error('Característica no encontrada');
                throw new Error('No se pudo obtener la característica. Por favor, intente nuevamente más tarde');
            });
    },
    deleteFeature: (id, token) => {
        return api.delete(`/features/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).catch(error => {
            console.error(error);
            throw new Error('No se pudo eliminar la característica. Por favor, intente nuevamente más tarde');
        });
    },
    createFeature: (data, token) => {
        const formData = new FormData();
        const feature = {
            name: data.name,
        };
        formData.append('feature', new Blob([JSON.stringify(feature)], { type: 'application/json' }));
        data.icon[0] && formData.append('icon', data.icon[0]);

        return api.post('/features', formData, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(error => {
            console.error(error);
            throw new Error('No se pudo crear la característica. Por favor, intente nuevamente más tarde');
        });
    },
    editFeature: (data, token) => {
        const formData = new FormData();
        const feature = {
            id: data.id,
            name: data.name,
        };
        formData.append('feature', new Blob([JSON.stringify(feature)], { type: 'application/json' }));
        data.icon && formData.append('icon', data.icon[0]);

        return api.put('/features', formData, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(error => {
            console.error(error);
            throw new Error('No se pudo editar la característica. Por favor, intente nuevamente más tarde');
        });
    }
}

export default featureService;