// It is used to import Express, Mongo, Cors
// nodemon server.js to run server.jsc
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;


//this send Users data's to the local host 5001
app.use(cors());
app.use(express.json());
app.get('/api/users', async(req, res) => {
    const users = [
        {
        name: 'Altin',
        gender: 'm'
        },
        {
        name: 'Blerona',
        gender: 'f'
        }
];
    res.json(users);
});

// Listen for requests
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
