const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

let orders = [];

// Root route
app.get('/', (req, res) => {
    res.send('Order Service is running!');
});

// Get all orders
app.get('/orders', (req, res) => {
    res.json(orders);
});

// Create a new order (with product validation)
app.post('/order', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Check if product exists by calling Product Service
        const response = await axios.get(`http://product:3002/product/${productId}`);
        const product = response.data;

        const order = { 
            id: orders.length + 1, 
            userId, 
            productId, 
            quantity, 
            status: 'pending',
            productName: product.name
        };
        orders.push(order);
        res.status(201).json(order);
    } catch (err) {
        console.error('Error calling Product service:', err.message);
        res.status(400).json({ error: 'Invalid product ID or product service not available.' });
    }
});

// Get an order by ID
app.get('/order/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
});

// Update an order (for status change)
app.put('/order/:id', (req, res) => {
    const { status } = req.body;
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');

    order.status = status;
    res.json(order);
});

// Delete an order
app.delete('/order/:id', (req, res) => {
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) return res.status(404).send('Order not found');

    orders.splice(orderIndex, 1);
    res.status(204).send();
});

app.listen(3003, () => {
    console.log('Order service running on port 3003');
});
