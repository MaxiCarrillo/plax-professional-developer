import api from "../../core/api";

const userService = {
    getUsers: (token) => {
        return api.get('/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            return response.data;
        }
        ).catch(() => {
            throw new Error('No se pudieron obtener los usuarios. Por favor, intente nuevamente más tarde.');
        });
    },
    deleteUser: (id, token) => {
        return api.delete(`/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).catch((error) => {
            console.error(error);
            throw new Error('No se pudo eliminar el usuario. Por favor, intente nuevamente más tarde.');
        });
    },
    getUserAuthenticated: (token) => {
        return api.get('/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            return response.data;
        }).catch(() => {
            throw new Error('No se pudo obtener el usuario. Por favor, intente nuevamente más tarde.');
        });
    },
    createUser: (values, token) => {
        return api.post('/users', values, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(error => {
            throw new Error(error.response.data);
        });
    },
    editUser: (values, token) => {
        return api.put('/users', values, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(error => {
            console.log(error);
            throw new Error(error.response.data);
        });
    },
    updateName: (values, token) => {
        return api.put('/users/update-name', values, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch((error) => {
            console.error(error);
            throw new Error('No se pudo actualizar el nombre. Por favor, intente nuevamente más tarde.');
        });
    },
    addFavoriteStay: (values, token) => {
        return api.post('/users/add-favorite', values, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(() => {
            throw new Error('No se pudo agregar a favoritos. Por favor, intente nuevamente más tarde.');
        })
    },
    removeFavoriteStay: (values, token) => {
        return api.post('/users/remove-favorite', values, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(() => {
            throw new Error('No se pudo eliminar de favoritos. Por favor, intente nuevamente más tarde.');
        })
    }
}

export default userService;