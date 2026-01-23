import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const productService = {
    getAll: async () => {
        const response = await api.get("/api/products");
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get(`/api/products/${id}`);
        return response.data;
    },
};

export const orderService = {
    create: async (items: { productId: string; quantity: number }[]) => {
        const response = await api.post("/api/orders", { items });
        return response.data;
    },
};

export const paymentService = {
    createIntent: async (orderId: string) => {
        const response = await api.post("/api/payments/create-intent", { orderId });
        return response.data;
    },
};

export default api;
