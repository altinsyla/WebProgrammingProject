import React from 'react';
import './App.css';
import Login from './views/Login.js';
import Register from './views/Register.js';
// import Form from './views/Form.js';


function App() {
  return (
    <div className="App">
      <Login />
      <Register />
      <div className='formplaceholder'>
      {/* <Form /> */}
      </div>
    </div>
  );
}

export default App;
