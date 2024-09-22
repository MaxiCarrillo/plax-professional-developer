const stayService = {
    getStays: async (page, size) => {
        const response = await fetch(`http://localhost:8080/api/stays?page=${page}&size=${size}`);
        const stays = await response.json();
        return stays;
    },
    deleteStay: async (id) => {
        const response = await fetch(`http://localhost:8080/api/stays/${id}`, {
            method: 'DELETE'
        });
        return response.status === 204;
    },
};

export default stayService