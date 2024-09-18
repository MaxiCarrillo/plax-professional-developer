const stayService = {
    getStays: async (page, size) => {
        const response = await fetch(`http://localhost:8080/api/stays?page=${page}&size=${size}`);
        const stays = await response.json();
        return stays;
    }
};

export default stayService