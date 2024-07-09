import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  // MDBIcon
} from 'mdb-react-ui-kit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Effect to initialize email state from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    if (storedEmail) {
      setEmail(storedEmail);
      if (storedPassword) {
        setPassword(storedPassword);
        setRememberMe(true); // Assume both email and password are stored
      }
    }
  }, []);

  // Function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      // Attempt to sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Extract the user object from the userCredential
      const user = userCredential.user;

      // Handle remember me functionality if needed
      if (rememberMe) {
        // Store the email and password in localStorage if rememberMe is checked
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        // Clear the stored email and password if rememberMe is not checked
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

      // Clear the password state for security reasons
      setPassword('');

      // Navigate to the bookings page after successful login
      navigate('/BookingsPage');
    } catch (error) {
      // Handle specific Firebase errors
      if (error.code === 'auth/invalid-credential') {
        setError("Your email and password don't match. Please enter the correct email and password.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleLogin}>
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

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox
            name='flexCheck'
            value=''
            id='flexCheckDefault'
            label='Remember me'
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <a href="!#">Forgot password?</a>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <MDBBtn className="mb-4" type="submit">Login</MDBBtn>
      </form>

      <div className="text-center">
        <p>Not a member? <Link to="/RegistrationPage">Register</Link></p>
      </div>
    </MDBContainer>
  );
}

export default LoginPage;
