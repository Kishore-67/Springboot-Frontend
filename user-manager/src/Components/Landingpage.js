
import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import '../Styles/LandingPage.css';
import ShinyText from '../Reactbits/Shinytext';
import DecryptedText from '../Reactbits/Decryptedtext';
function LandingPage() {
    const navigate = useNavigate();
    const createUser = () => {
    navigate("/add")  
  };
  


  return (
    <div className="landing-page">
      <DecryptedText
  text="Welcome!"
  animateOn="view"
  revealDirection="center"
/>
      <DecryptedText
  text="Manage your users here 😁"
  animateOn="view"
  revealDirection="center"
  
/>
      <button className="btn" onClick={createUser} style={{ marginTop: '20px' }}>
      <ShinyText text ="Get Started" disabled={false} speed={5} className='butclass' />
      </button>
    </div>
  );
}

export default LandingPage;