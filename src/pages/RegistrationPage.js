import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  // MDBIcon
}
from 'mdb-react-ui-kit';

import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("handleRegister function called");

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("user created: ", user);

    const userDoc = {
        WebUserID: user.uid,
        Email: email,
        createdAt: new Date()
      };

      await setDoc(doc(db, "WebUsers", user.uid), userDoc);

      alert('User registered and data saved successfully');
      navigate('/LoginPage');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleRegister}>
        <MDBInput 
            wrapperClass='mb-4' 
            label='Email address' 
            id='form1' 
            type='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
        />
        <MDBInput 
            wrapperClass='mb-4' 
            label='Password' 
            id='form2' 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
        />
        <MDBInput 
            wrapperClass='mb-4' 
            label='Repeat Password' 
            id='form3' 
            type='password'
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required 
        />

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        </div>
        <MDBBtn className="mb-4" type="submit">Register</MDBBtn>
      </form>
      
      <div className="text-center">
        <p>Already a member? <Link to ="/LoginPage">Login</Link></p>
      </div>

    </MDBContainer>
  );
}

export default RegistrationPage;

