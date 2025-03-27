import React, { useState, useEffect } from "react";
import "../Styles/Form.css";
import ShinyText from "../Reactbits/Shinytext";
import GradientText from "../Reactbits/Gradienttext";
export default function Form() {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [formData, setFormData] = useState({
    rollno: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    fetch("https://springboot-training-2.onrender.com/api/getAll")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://springboot-training-2.onrender.com/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
        setFormData({ rollno: "", name: "", email: "" });
      } else {
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const toggleUserDetails = (index) => {
    setExpandedUser(expandedUser === index ? null : index);
  };

  return (
    <div>
      <div className="title"><GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class">CRUD</GradientText>
  </div>
      
    <div className="form-user-container">
      <div className="form-container">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Roll No:
            <input
              type="text"
              placeholder="Enter Your Roll Number"
              name="rollno"
              value={formData.rollno}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="submit-btn">
            <ShinyText text="Submit" disabled={false} speed={5} className="butclass" />
          </button>
        </form>
      </div>
      <div className="user-container">
        <h2>Available Users - {users.length}</h2>
        <div className="user-list">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={index} className="user-item">
                <div className="user-info" onClick={() => toggleUserDetails(index)}>
                  <h3>{user.name}</h3>
                </div>
                {expandedUser === index && (
                  <div className="user-details">
                    <p><strong>Roll No:</strong> {user.rollno}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="empty-message">No users available</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
