const axios = require("axios");

const API_URL = "https://localhost:2000";

export const getArticles = () => axios.get(`${API_URL}/articles`);
export const triggerOptimization = (id) =>
    axios.post(`${API_URL}/articles/${id}`);
