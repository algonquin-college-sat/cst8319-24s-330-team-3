import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      if (rememberedPassword) {
        setPassword(rememberedPassword);
        setRememberMe(true);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

      setPassword('');
      navigate('/BookingsPage');
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError("Your email and password don't match. Please enter the correct email and password.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Please check your email inbox.');
    } catch (error) {
      setError('Failed to send password reset email. Please check your email address and try again.');
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
          <button type="button" onClick={handleForgotPassword} className="btn btn-link">Forgot password?</button>
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
