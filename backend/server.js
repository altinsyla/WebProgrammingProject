// It is used to import Express, Mongo, Cors
// nodemon server.js to run server.jscc
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5001;
const app = express();
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.json());

//connect to db
const mongoose = require('mongoose');
const uri = "mongodb+srv://altinsyla997:altinsyla123@webprogramming.wluex0n.mongodb.net/?retryWrites=true&w=majority&appName=WebProgramming"
mongoose.connect(uri)
.then(() => 
        console.log('Connected to MongoDB'))
.catch((error) => 
    console.log("Couldn't connect to MongoDB", error))

//Route per register
app.post('/api/register', async(req, res) => {
    try{
        // res.json('ook!')
        const {name, email, password} = req.body;
        const user = new User({name, email, password});
        // res.json(user);
        //opsion tjeter const name = req.body.name / const email = req.body.email / const password = req.body.passowrd
        await user.save();
        res.status(201).send('User registered!');
    } catch(error) {
        res.status(500).json({error: 'Error on registration!'});
    }
});

app.post('/api/login', async(req, res) => {

    res.json('ok')
        const {email, password} = req.body;
        const user = await User.findOne({email}); //Gjeje nje user nepermes Emailit
        const isvalid = await user.isValidPassword({password});
        res.json(isvalid);
    } 
);

// Listen for requests
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// const UserSchema = new mongoose.Schema({
//     name: String,
//     gender: String
// });

// const User = mongoose.model('User', UserSchema);
// app.get('/api/test', async(req, res) => {
//     //krijimi i userave te ri
    
//     await User.findByIdAndDelete('660be69057c7d9adcaddf960');
//     res.json('User deleted successfully!');
// });

// const TaskSchema = new mongoose.Schema({
//     name: String,
//     description: String
// });

// const Task = mongoose.model('Task', TaskSchema);
// app.get('/api/test', async(req, res) => {
//     await Task.findByIdAndDelete('');
//     res.json('Task deleted succesfully!')
// });


// // Routes
// // Me marr ni user t'ri
// app.get('/api/users', async(req, res) => {
//     const users = await User.find({});
//     res.json(users);
// });

// //Me shtu ni user t'ri
// app.post('/api/user',async(req,res)=>{
//     const newUser=new User  ({name: 'Altin', gender: 'm'});
//     const savedUser=await newUser.save();
//     res.json(savedUser);
// })

// //Me bo update ni user
// app.put('api/user/:id', async (req, res) => {
//     const {id} = req.params;
//     const updateUser = await User
//     .findByIdAndUpdate(id, req.body, {new: true})     //ose const  id = req.params.id
// })

// //Me fshi ni user
// app.delete('api/users/:id', async (req, res) => {
//     const {id} = req.params;
//     await User.findByIdAndDelete(id);
//     res.json({message: 'User deleted succesfully!'});
// })

// //Tasks
// app.get('/api/test', async(req, res) => {
//     await Task.findByIdAndDelete('');
//     res.json('Task deleted succesfully!')
// });

// app.get('/api/tasks', async(req, res) => {
//     const tasks = await Task.find({});
//     res.json(tasks);
// });

// //Me shtu ni user t'ri
// app.get('/api/task',async(req,res)=>{
//     const newTask=new Task  ({name: 'Food', description: 'Go eat some food!'});
//     const savedTask=await newTask.save();
//     res.json(savedTask);
// })

// //Me bo update ni user
// app.put('api/task/:id', async (req, res) => {
//     const {id} = req.params;
//     const updateTask = await Task
//     .findByIdAndUpdate(id, req.body, {new: true})     //ose const  id = req.params.id
// })

// //Me fshi ni user
// app.delete('api/tasks/:id', async (req, res) => {
//     const {id} = req.params;
//     await Task.findByIdAndDelete(id);
//     res.json({message: 'Task deleted succesfully!'});
// })


//Login Server
// app.get('/api/users/login', async(req, res) => {
//     const users = await User.find({});
//     res.json(users);
// });

// app.post('/api/users/login',async(req,res)=>{
//     const newUser=new User  ({name: 'Altin', gender: 'm'});
//     const savedUser=await newUser.save();
//     res.json(savedUser);
// })

