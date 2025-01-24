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
    getRandomStays: () => {
        return api.get('/stays/random')
            .then(response => {
                return response.data;
            }).catch(() => {
                throw new Error("No se pudieron obtener los alojamientos. Por favor, intente nuevamente más tarde.");
            })
    }
    ,
    searchStays: (categoryIds, searchTerm, checkIn, checkOut) => {
        categoryIds = categoryIds.map(id => `categoryIds=${id}`).join('&');
        searchTerm && (categoryIds += `&searchTerm=${searchTerm}`);
        (checkIn && checkOut) && (categoryIds += `&checkIn=${checkIn}&checkOut=${checkOut}`);
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
    deleteStay: (id, token) => {
        return api.delete(`/stays/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => {
                console.error(error);
                throw new Error('No se pudo eliminar el alojamiento. Por favor, intente nuevamente más tarde.');
            });
    },
    createStay: async (data, token) => {
        const formData = new FormData();
        const stay = {
            name: data.name,
            price: data.price,
            description: data.description,
            address: data.address,
            category_id: data.category_id,
            features: data.features,
            policies: data.policies
        };
        formData.append('stay', new Blob([JSON.stringify(stay)], { type: 'application/json' }));
        data.images.forEach(image => {
            formData.append('images', image);
        });

        return api.post('/stays', formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.error(error);
            throw new Error('No se pudo crear el alojamiento. Por favor, intente nuevamente más tarde.');
        })
    },
    editStay: async (data, token) => {
        const formData = new FormData();
        const stay = {
            id: data.id,
            name: data.name,
            price: data.price,
            description: data.description,
            address: data.address,
            category_id: data.category_id,
            features: data.features,
            policies: data.policies
        };
        formData.append('stay', new Blob([JSON.stringify(stay)], { type: 'application/json' }));
        data.images?.forEach(image => {
            formData.append('images', image);
        });
        data.imagesToDelete.length > 0 && formData.append('imagesToDelete', new Blob([JSON.stringify(data.imagesToDelete)], { type: 'application/json' }));

        return api.put('/stays', formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.error(error);
            throw new Error('No se pudo editar el alojamiento. Por favor, intente nuevamente más tarde.');
        })
    }
};

export default stayService;
