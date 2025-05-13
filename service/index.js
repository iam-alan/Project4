const express = require('express');
const app = express();

app.use(express.json());

// Add a route for root (/) to avoid the "Cannot GET /" error
app.get('/', (req, res) => {
    res.send('Auth Service is running!');
});

app.post('/login', (req, res) => {
    res.json({ message: 'Login successful!' });
});

app.post('/register', (req, res) => {
    res.json({ message: 'User registered successfully!' });
});

app.listen(3001, () => {
    console.log('Auth service running on port 3001');
});
