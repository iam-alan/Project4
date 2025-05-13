const express = require('express');
const app = express();

app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
    res.send('Product Service is running!');
});

let products = [
  { id: 1, name: "Laptop", price: 12000 },
  { id: 2, name: "Phone", price: 4000 },
];

// Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Get product by ID
app.get('/product/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// Add a new product
app.post('/product', (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update a product
app.put('/product/:id', (req, res) => {
    const { name, price } = req.body;
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');

    product.name = name;
    product.price = price;

    res.json(product);
});

// Delete a product
app.delete('/product/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');

    products.splice(productIndex, 1);
    res.status(204).send();
});

app.listen(3002, () => {
    console.log('Product service running on port 3002');
});
