import api from "../../core/api";

const stayService = {
    getStays: (page, size, token) => {
        return api.get(`/stays?page=${page}&size=${size}`)
            .then(response => {
                return response.data;
            }).catch(() => {
                throw new Error('No se pudieron obtener los alojamientos. Por favor, intente nuevamente más tarde.');
            });
    },
    searchStays: (categoryIds) => {
        categoryIds = categoryIds.map(id => `categoryIds=${id}`).join('&');
        return api.get(`/stays/search?${categoryIds}`)
            .then(response => {
                return response.data;
            }).catch(() => {
                throw new Error('No se pudieron obtener los alojamientos. Por favor, intente nuevamente más tarde.');
            });
    },
    getStay: (id) => {
        return api.get(`/stays/${id}`)
            .then(response => {
                return response.data;
            }).catch(error => {
                if (error.response.status === 404) throw new Error('Alojamiento no encontrado.');
                throw new Error('No se pudo obtener el alojamiento. Por favor, intente nuevamente más tarde.');
            })
    },
    deleteStay: (id) => {
        api.delete(`/stays/${id}`)
            .catch(error => {
                if (error.response.status === 404) throw new Error('Alojamiento no encontrado.');
                throw new Error('No se pudo eliminar el alojamiento. Por favor, intente nuevamente más tarde.');
            });
    },
    createStay: async (data) => {
        const formData = new FormData();
        const stay = {
            name: data.name,
            price: data.price,
            description: data.description,
            address: data.address,
            category_id: data.category_id,
        };
        formData.append('stay', new Blob([JSON.stringify(stay)], { type: 'application/json' }));
        data.images.forEach(image => {
            formData.append('images', image);
        });

        api.post('/stays', formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        }).catch(() => {
            if (error.response.status === 409) {
                throw new Error('El alojamiento ya se encuentra registrado.');
            }
            throw new Error('No se pudo crear el alojamiento. Por favor, intente nuevamente más tarde.');
        })
    },
    editStay: async (data) => {
        const formData = new FormData();
        const stay = {
            id: data.id,
            name: data.name,
            price: data.price,
            description: data.description,
            address: data.address,
            category_id: data.category_id,
        };
        formData.append('stay', new Blob([JSON.stringify(stay)], { type: 'application/json' }));
        data.images?.forEach(image => {
            formData.append('images', image);
        });
        data.imagesToDelete.length > 0 && formData.append('imagesToDelete', new Blob([JSON.stringify(data.imagesToDelete)], { type: 'application/json' }));

        api.put('/stays', formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        }).catch(() => {
            if (error.response.status === 409) {
                throw new Error('El alojamiento ya se encuentra registrado.');
            }
            throw new Error('No se pudo editar el alojamiento. Por favor, intente nuevamente más tarde.');
        })
    }
};

export default stayService;
