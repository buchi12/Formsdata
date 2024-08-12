require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Define a schema and model
const formSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
});

const Form = mongoose.model('Form', formSchema);

// Route to handle form submission
app.post('/api/form', async (req, res) => {
    const { firstName, lastName } = req.body;

    try {
        const newForm = new Form({ firstName, lastName });
        await newForm.save();
        res.status(201).send('Form saved successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
