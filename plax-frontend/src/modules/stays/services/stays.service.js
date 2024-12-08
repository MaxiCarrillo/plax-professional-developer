const stayService = {
    getStays: async (page, size, token) => {
        const response = await fetch(`http://localhost:8080/api/stays?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const stays = await response.json();
        return stays;
    },
    searchStays: async (categoryIds) => {
        categoryIds = categoryIds.map(id => `categoryIds=${id}`).join('&');
        const response = await fetch(`http://localhost:8080/api/stays/search?${categoryIds}`);
        const stays = await response.json();
        return stays;
    },
    getStay: async (id) => {
        const response = await fetch(`http://localhost:8080/api/stays/${id}`);
        const stay = await response.json();
        return stay;
    },
    deleteStay: async (id) => {
        const response = await fetch(`http://localhost:8080/api/stays/${id}`, {
            method: 'DELETE'
        });
        return response.status === 204;
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
        try {
            const response = await fetch('http://localhost:8080/api/stays', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                },
            });
            if (response.status !== 201) {
                throw new Error('Error creating stay');
            }
            const stay = await response.json();
            return stay;
        } catch (e) {
            console.error('Error creating stay', e);
        }
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
        alert(JSON.stringify(data.imagesToDelete));
        try {
            const response = await fetch('http://localhost:8080/api/stays', {
                method: 'PUT',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                },
            });
            if (response.status !== 200) {
                throw new Error('Error editing stay');
            }
            const stay = await response.json();
            return stay;
        } catch (e) {
            console.error('Error editing stay', e);
        }
    }
};
export default stayService;