const categoryService = {
    getCategories: async () => {
        const response = await fetch('http://localhost:8080/api/categories');
        const categories = await response.json();
        return categories;
    },
    getAllCategories: async () => {
        const response = await fetch('http://localhost:8080/api/categories/all');
        const categories = await response.json();
        return categories;
    },
    getCategory: async (id) => {
        const response = await fetch(`http://localhost:8080/api/categories/${id}`);
        const category = await response.json();
        return category;
    },
    deleteCategory: async (id) => {
        const response = await fetch(`http://localhost:8080/api/categories/${id}`, {
            method: 'DELETE'
        });
        return response.status === 204;
    },
    createCategory: async (data) => {
        const formData = new FormData();
        const category = {
            name: data.name,
            description: data.description
        };
        formData.append('category', new Blob([JSON.stringify(category)], { type: 'application/json' }));
        data.image[0] && formData.append('image', data.image[0]);
        try {
            const response = await fetch('http://localhost:8080/api/categories', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.status !== 201) {
                throw new Error('Error creating category');
            }
            const category = await response.json();
            return category;
        } catch (e) {
            console.error('Error creating category', e);
        }
    },
    editCategory: async (data) => {
        const formData = new FormData();
        const category = {
            id: data.id,
            name: data.name,
            description: data.description
        };
        formData.append('category', new Blob([JSON.stringify(category)], { type: 'application/json' }));
        data.image && formData.append('image', data.image[0]);
        try {
            const response = await fetch('http://localhost:8080/api/categories', {
                method: 'PUT',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.status !== 200) {
                throw new Error('Error editing category');
            }
            const category = await response.json();
            return category;
        } catch (e) {
            console.error('Error editing category', e);
        }
    }
};

export default categoryService;