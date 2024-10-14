const stayService = {
    getStays: async (page, size) => {
        const response = await fetch(`http://localhost:8080/api/stays?page=${page}&size=${size}`);
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
};

export default stayService