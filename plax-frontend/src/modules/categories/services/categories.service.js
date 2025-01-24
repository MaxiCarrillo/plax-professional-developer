import api from "../../core/api";

const categoryService = {
    getCategories: () => {
        return api.get('/categories')
            .then(response => {
                return response.data;
            }).catch(() => {
                throw new Error('No se pudieron obtener las categorías. Por favor, intente nuevamente más tarde.');
            });
    },
    getAllCategories: () => {
        return api.get('/categories/all')
            .then(response => {
                return response.data;
            })
            .catch(() => {
                throw new Error('No se pudieron obtener las categorías. Por favor, intente nuevamente más tarde.');
            });
    },
    getCategory: (id) => {
        return api.get(`/categories/${id}`)
            .then(response => {
                return response.data;
            }).catch(error => {
                if (error.response.status === 404) throw new Error('Categoría no encontrada.');
                throw new Error('No se pudo obtener la categoría. Por favor, intente nuevamente más tarde.');
            });
    },
    deleteCategory: (id, token) => {
        return api.delete(`/categories/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .catch(error => {
                console.error(error);
                throw new Error(error.response.data);
            });
    },
    createCategory: (data, token) => {
        const formData = new FormData();
        const category = {
            name: data.name,
            description: data.description
        };
        formData.append('category', new Blob([JSON.stringify(category)], { type: 'application/json' }));
        data.image[0] && formData.append('image', data.image[0]);

        return api.post('/categories', formData, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(error => {
            console.error(error);
            throw new Error('No se pudo crear la categoría. Por favor, intente nuevamente más tarde.');
        });
    },
    editCategory: (data, token) => {
        const formData = new FormData();
        const category = {
            id: data.id,
            name: data.name,
            description: data.description
        };
        formData.append('category', new Blob([JSON.stringify(category)], { type: 'application/json' }));
        data.image && formData.append('image', data.image[0]);

        return api.put('/categories', formData, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(error => {
            console.error(error);
            throw new Error('No se pudo editar la categoría. Por favor, intente nuevamente más tarde');
        });
    }
};

export default categoryService;