const userService = {
    getUsers: async (token) => {
        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            switch (response.status) {
                case 200:
                    const users = await response.json();
                    return users;
                default:
                    throw new Error('No se pudieron obtener los usuarios. Por favor, intente nuevamente más tarde.');
            }
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Verifique su conexión a Internet.');
            }
            throw new Error(error.message);
        }
    },
    deleteUser: async (id, token) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            switch (response.status) {
                case 204:
                    return true;
                default:
                    throw new Error('No se pudo eliminar el usuario. Por favor, intente nuevamente más tarde.');
            }
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Verifique su conexión a Internet.');
            }
            throw new Error(error.message);
        }
    },
    editUser: async (values, token) => {
        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });
            switch (response.status) {
                case 200:
                    return true;
                case 409: 
                    throw new Error('El email ya se encuentra registrado.');
                default:
                    throw new Error('No se pudo editar el usuario. Por favor, intente nuevamente más tarde.');
            }
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Verifique su conexión a Internet.');
            }
            throw new Error(error.message);
        }
    }
}

export default userService;