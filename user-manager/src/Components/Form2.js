import React from 'react'
import axios from "axios";
import "../Styles/Form.css";
import React, { useState, useEffect } from "react";
export default function Form2() {
     const [users, setUsers] = useState([]);
      const [formData, setFormData] = useState({
        rollno: "",
        name: "",
        email: "",
      });
  return (
    <div className="form-user-container">
    <div className="form-container">
          <text style={{ fontSize: "30px",marginBottom:"20px",fontFamily:"poppins",fontWeight:"bold"}}>ADD USER</text>
          <form onSubmit={handleSubmit}>
          <label>Roll NO:
            <input
              type="text" 
              placeholder="Enter Your Roll Number" 
              name="rollno"
              value={formData.rollno} 
              onChange={handleChange} 
              required
            />
          </label>
          <label>Name:
            <input 
              type="text" 
              name="name" 
              placeholder="Enter Your Name"
              value={formData.name}  
              onChange={handleChange} 
              required
            />
          </label>
          <label>Email:
            <input 
              type="email" 
              name="email"
              placeholder="Enter Your Email Address"  
              value={formData.email} 
              onChange={handleChange} 
              required
            />
          </label>
          <button type="submit" className="submit-btn">Submit</button>
       
      </form>
    </div>
    <div className="user-container">
      <text style={{ fontSize: "30px",marginBottom:"20px",fontFamily:"poppins",fontWeight:"bold"}}>Available Users</text>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.rollno} className="user-item">
            <h2>{user.name}</h2>
            <p className="email">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}
