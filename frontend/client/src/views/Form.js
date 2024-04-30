import React from "react";
import {useState} from 'react';
import "./Form.scss";

function Form() {

  // const [name, setName]= useState('');
  // const [surname, setSurname]= useState('');
  // const [email, setEmail]= useState('');
  // const [phone, setPhone]= useState('');

  // const handleNameChange = (event) => setName(event.target.value);
  // const handleSurnameChange = (event) => setSurname(event.target.value);
  // const handleEmailChange = (event) => setEmail(event.target.value);
  // const handlePhoneChange = (event) => setPhone(event.target.value);

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('register button clicked');
    return (
    <div className="body">
      <div className="form">
        <form>
          <div>
            <label>Name:</label>
          </div>
          <input type="text" value={name} name="name" onChange={handleNameChange} />
          <div>
            <label>Surname:</label>
          </div>
          <input type="text" value={surname} name="Surname" onChange={handleSurnameChange} />
          <div>
            <label>Email:</label>
          </div>
          <input type="text" value={email} name="Email" onChange={handleEmailChange} />
          <div>
            <label>Phone Number:</label>
          </div>
          <div>
            <input type="text" value={phone} name="PhoneNumber" onChange={handlePhoneChange} />
          </div>
          <input type="submit" value="Submit" style={{ marginTop: "1rem" }} className="submit_button" onChange={handleSubmit}/>
        </form>
      </div>
    </div>
  );
}
}
export default Form;
