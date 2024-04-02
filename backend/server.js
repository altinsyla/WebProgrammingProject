// It is used to import Express, Mongo, Cors
// nodemon server.js to run server.jscc
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5001;
const app = express();

//connect to db
const mongoose = require('mongoose');
const uri = "mongodb+srv://altinsyla997:N9xUmldDKypVWnW1@webprogramming.wluex0n.mongodb.net/?retryWrites=true&w=majority&appName=WebProgramming"
mongoose.connect(uri)
.then(() => 
        console.log('Connected to MongoDB'))
.catch((error) => 
    console.log("Couldn't connect to MongoDB", error))

const UserSchema = new mongoose.Schema({
    name: String,
    gender: String
});

const User = mongoose.model('User', UserSchema);
app.get('/api/test', async(req, res) => {
    //Krijimi i userit te ri
    const newUser = new User({
        name: 'new',
        gender: 'm'
    })
    const savedUser = await newUser.save();
    res.json(savedUser);
});

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
    res.json(savedUser);
});

// Listen for requests
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
