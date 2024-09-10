"use client"
import React, { useState } from 'react';

function Contactus() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Message:', message);

    setName('');
    setMessage('');
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '600px',
    height:'500px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd', 
  };

  const inputStyle = {
    marginBottom: '15px',
    padding: '10px',
    width:'500px',
    marginTop:'30px',
    borderRadius: '4px',
    border: '1px solid #ccc', 
    fontSize: '16px',
  };

  const textareaStyle = {
    ...inputStyle,
    height: '300px',
    width:'500px',
    resize: 'none',
  };

  const buttonStyle = {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#000',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius:'25px',
  };

  const labelStyle = {
    marginBottom: '8px',
    fontSize: '30px',
    fontWeight:'700',
    color: '#E85C0D',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label className='head' htmlFor="name" style={labelStyle}> 🧑🏻‍🏫 CONTACT US</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
            placeholder="Enter your name" // Placeholder matching the image
          />
        </div>
        <div>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={textareaStyle}
            placeholder="Enter your message"
          ></textarea>
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
}

export default Contactus;
