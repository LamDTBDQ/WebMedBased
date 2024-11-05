import database from '../data/database.json';

export const api = {
    async getUser(username, password) {
        return database.Users.find(u => u.username === username && u.password === password);
    },

    async getMedications() {
        return database.Medications;
    },

    async createOrder(order) {
        return { ...order, order_id: database.Orders.length + 1 };
    },

    async processPayment(paymentDetails) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Payment processed successfully' });
            }, 1500);
        });
    }
};