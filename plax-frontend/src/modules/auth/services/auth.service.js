const authService = {
    login: async (body) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            switch (response.status) {
                case 200:
                    const data = await response.json();
                    return data;
                case 401:
                    throw new Error('El email o la contraseña son incorrectos.');
                case 404:
                    throw new Error('El usuario no se encuentra registrado en el sistema.');
                default:
                    throw new Error('No se pudo iniciar sesión. Por favor, intente nuevamente más tarde.');
            }
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Verifique su conexión a Internet.');
            }
            throw new Error(error.message);
        }
    },
    register: async (body) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            switch (response.status) {
                case 201:
                    const token = await response.json();
                    return token;
                case 409:
                    throw new Error('El usuario con ese email ya se encuentra registrado en el sistema.');
                default:
                    throw new Error('El usuario no pudo ser registrado. Por favor, intente nuevamente más tarde.');
            }
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Verifique su conexión a Internet.');
            }
            throw new Error(error.message);
        }
    }
}

export default authService;