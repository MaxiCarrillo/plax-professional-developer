const featureService = {
    getFeatures: async (page, size, token) => {
        const response = await fetch(`http://localhost:8080/api/features?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const features = await response.json();
        return features;
    },
    getFeature: async (id) => {
        const response = await fetch(`http://localhost:8080/api/features/${id}`);
        const feature = await response.json();
        return feature;
    },
    deleteFeature: async (id) => {
        const response = await fetch(`http://localhost:8080/api/features/${id}`, {
            method: 'DELETE'
        });
        return response.status === 204;
    },
    createFeature: async (data) => {
        const formData = new FormData();
        const feature = {
            name: data.name,
        };
        formData.append('feature', new Blob([JSON.stringify(feature)], { type: 'application/json' }));
        data.icon[0] && formData.append('icon', data.icon[0]);
        try {
            const response = await fetch('http://localhost:8080/api/features', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.status !== 201) {
                throw new Error('Error creating feature');
            }
            const feature = await response.json();
            return feature;
        } catch (e) {
            console.error('Error creating feature', e);
        }
    },
    editFeature: async (data) => {
        const formData = new FormData();
        const feature = {
            id: data.id,
            name: data.name,
        };
        formData.append('feature', new Blob([JSON.stringify(feature)], { type: 'application/json' }));
        data.icon && formData.append('icon', data.icon[0]);
        try {
            const response = await fetch('http://localhost:8080/api/features', {
                method: 'PUT',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.status !== 200) {
                throw new Error('Error editing feature');
            }
            const feature = await response.json();
            return feature;
        } catch (e) {
            console.error('Error editing feature', e);
        }
    }
}

export default featureService;