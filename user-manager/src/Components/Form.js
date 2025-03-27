import axios from "axios";
import "../Styles/Form.css";
import React, { useState, useEffect } from "react";
export default function Form() {

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    rollno: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post(
        "https://springboot-training-2.onrender.com/api/create",
        formData
      );
      console.log("Success:", response.data);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create user.");
    }
  };
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

);
}