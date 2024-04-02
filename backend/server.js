// It is used to import Express, Mongo, Cors
// nodemon server.js to run server.jscc
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5001;
const app = express();

//connect to db
const mongoose = require('mongoose');
const uri = "mongodb+srv://altinsyla997:SFEYGLL8OPDh2Ht7@webprogramming.wluex0n.mongodb.net/?retryWrites=true&w=majority&appName=WebProgramming"
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
    //krijimi i userave te ri
    
    await User.findByIdAndDelete('660be69057c7d9adcaddf960');
    res.json('User deleted successfully!');
});



// Routes
// Me marr ni user t'ri
app.get('/api/users', async(req, res) => {
    const users = await User.find({});
    res.json(users);
});

//Me shtu ni user t'ri
app.post('/api/user',async(req,res)=>{
    const newUser=new User  ({name: 'Altin', gender: 'm'});
    const savedUser=await newUser.save();
    res.json(savedUser);
})

//Me bo update ni user
app.put('api/user/:id', async (req, res) => {
    const {id} = req.params;
    const updateUser = await User
    .findByIdAndUpdate(id, req.body, {new: true})     //ose const  id = req.params.id
})

//Me fshi ni user
app.delete('api/users/:id', async (req, res) => {
    const {id} = req.params;
    await User.findByIdAndDelete(id);
    res.json({message: 'User deleted succesfully!'});
})

// Listen for requests
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
