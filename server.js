const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage (simulated database)
let dataStore = [
    { id: 1, name: 'Item 1', value: 'Value 1' },
    { id: 2, name: 'Item 2', value: 'Value 2' },
    { id: 3, name: 'Item 3', value: 'Value 3' }
];

// Create (POST) - Add a new item
app.post('/data', (req, res) => {
    const newItem = req.body;
    
    if (!newItem.name || !newItem.value) {
        return res.status(400).json({ message: 'Name and value are required!' });
    }

    newItem.id = dataStore.length + 1;  // Auto-increment ID
    dataStore.push(newItem);
    res.status(201).json(newItem);
});

// Read (GET) - Get all items
app.get('/data', (req, res) => {
    res.status(200).json(dataStore);
});

// Read (GET by ID) - Get a specific item by ID
app.get('/data/:id', (req, res) => {
    const item = dataStore.find(d => d.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
});

// Update (PUT) - Update an existing item
app.put('/data/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = dataStore.findIndex(d => d.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    const updatedItem = { ...dataStore[itemIndex], ...req.body };
    dataStore[itemIndex] = updatedItem;
    res.status(200).json(updatedItem);
});

// Delete (DELETE) - Delete an item by ID
app.delete('/data/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = dataStore.findIndex(d => d.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    dataStore.splice(itemIndex, 1);
    res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
