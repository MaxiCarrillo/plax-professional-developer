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
        api.delete(`/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).catch(() => {
            throw new Error('No se pudo eliminar el usuario. Por favor, intente nuevamente más tarde.');
        });
    },
    editUser: (values, token) => {
        api.put('/users', values, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch(error => {
            if (error.response.status === 409) {
                throw new Error('El email ya se encuentra registrado.');
            }
            throw new Error('No se pudo editar el usuario. Por favor, intente nuevamente más tarde.');
        });
    }
}

export default userService;