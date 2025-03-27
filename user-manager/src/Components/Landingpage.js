// import React, { useState, useEffect } from "react";
// import "../Styles/LandingPage.css";
// import {useNavigate} from 'react-router-dom'

// export default function Landingpage() {

//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("https://springboot-training-2.onrender.com/api/getAll")
//       .then((response) => response.json())
//       .then((data) => setUsers(data.slice(0, 5))) // Limiting users to 5
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);0

//   // Create a new user
//   const createUser = () => {
//     // Implement the logic to create a new user
//     navigate("/add")  
//   };

//   return (
//     <div className="container">
//       <h1>Available Users</h1>
//       <div className="user-list">
//         {users.map((user) => (
//           <div key={user.rollno} className="user-item">
//             <h2>{user.name}</h2>
//             <p className="email">{user.email}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from 'react';
import {useNavigate} from 'react-router-dom'
import '../Styles/LandingPage.css';


function LandingPage() {
    const navigate = useNavigate();
    const createUser = () => {
    navigate("/add")  
  };
  return (
    <div className="landing-page">
      <h1>Welcome to User Manager</h1>
      <p>This is a simple user management application.</p>
      <button className="btn" onClick={createUser}>Get Started</button>
    </div>
  );
}

export default LandingPage;