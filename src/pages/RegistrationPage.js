/**import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [foodType, setFoodType] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closedTime, setClosedTime] = useState('');
  const [averageSpending, setAverageSpending] = useState('');
  const [isKidFriendly, setIsKidFriendly] = useState(false);
  const [isPetFriendly, setIsPetFriendly] = useState(false);
  const [hasPatio, setHasPatio] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,20}$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    const timeRegex = /^\d{2}:\d{2}$/;

    if (!emailRegex.test(email)) {
      newErrors.Email = 'Please enter a valid email address';
    }

    if (!passwordRegex.test(password)) {
      newErrors.Password = 'Password must be between 6 and 20 characters';
    }

    if (password !== repeatPassword) {
      newErrors.RepeatPassword = 'Passwords do not match';
    }

    if (!phoneRegex.test(phoneNumber)) {
      newErrors.PhoneNumber = 'Phone number must be in the format 123-456-7890';
    }

    if (!timeRegex.test(openTime)) {
      newErrors.OpenTime = 'Open time must be in the format HH:MM';
    }

    if (!timeRegex.test(closedTime)) {
      newErrors.ClosedTime = 'Close time must be in the format HH:MM';
    }

    if (location.length < 5 || location.length > 100) {
      newErrors.Location = 'Location must be between 5 and 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = {
        RestaurantID: user.uid,
        Email: email,
        RestaurantName: restaurantName,
        Location: location,
        PhoneNumber: phoneNumber,
        FoodType: foodType,
        OpenTime: openTime,
        ClosedTime: closedTime,
        AverageSpending: averageSpending,
        KidFriendly: isKidFriendly,
        PetFriendly: isPetFriendly,
        HasPatio: hasPatio,
        createdAt: new Date()
      };

      await setDoc(doc(db, "Restaurants", user.uid), userDoc);

      alert('User registered and profile saved successfully');
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
          placeholder='Enter a valid email address'
          className={errors.Email ? 'is-invalid' : ''}
          required 
        />
        {errors.Email && <div className="text-danger">{errors.Email}</div>}
        
        <MDBInput 
          wrapperClass='mb-4' 
          label='Password' 
          id='form2' 
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.Password ? 'is-invalid' : ''}
          placeholder='Min 6 characters, max 20 characters'
          required 
        />
        {errors.Password && <div className="text-danger">{errors.Password}</div>}

        <MDBInput 
          wrapperClass='mb-4' 
          label='Repeat Password' 
          id='form3' 
          type='password'
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className={errors.RepeatPassword ? 'is-invalid' : ''}
          required 
        />
        {errors.RepeatPassword && <div className="text-danger">{errors.RepeatPassword}</div>}
        
        <MDBInput 
          wrapperClass='mb-4' 
          label='Restaurant Name' 
          id='restaurantName' 
          type='text'
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          required 
        />
        
        <MDBInput 
          wrapperClass='mb-4' 
          label='Location' 
          id='location' 
          type='text'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={errors.Location ? 'is-invalid' : ''}
          required 
        />
        {errors.Location && <div className="text-danger">{errors.Location}</div>}

        <MDBInput 
          wrapperClass='mb-4' 
          label='Phone Number' 
          id='phoneNumber' 
          type='text'
          placeholder='xxx-xxx-xxxx'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={errors.PhoneNumber ? 'is-invalid' : ''}
          required 
        />
        {errors.PhoneNumber && <div className="text-danger">{errors.PhoneNumber}</div>}
        
        <MDBInput 
          wrapperClass='mb-4' 
          label='Open Time' 
          id='openTime' 
          type='text'
          placeholder='e.g. 11:00'
          value={openTime}
          onChange={(e) => setOpenTime(e.target.value)}
          className={errors.OpenTime ? 'is-invalid' : ''}
          required 
        />
        {errors.OpenTime && <div className="text-danger">{errors.OpenTime}</div>}
        
        <MDBInput 
          wrapperClass='mb-4' 
          label='Closed Time' 
          id='closeTime' 
          type='text'
          placeholder='e.g. 22:00'
          value={closedTime}
          onChange={(e) => setClosedTime(e.target.value)}
          className={errors.ClosedTime ? 'is-invalid' : ''}
          required 
        />
        {errors.ClosedTime && <div className="text-danger">{errors.ClosedTime}</div>}
        
        <MDBInput 
          wrapperClass='mb-4' 
          label='Average Spending' 
          id='averageSpending' 
          type='text'
          placeholder='e.g. $30'
          value={averageSpending}
          onChange={(e) => setAverageSpending(e.target.value)}
          required 
        />
        
        <div className="mb-4">
          <select 
            id="foodType" 
            className="form-select" 
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            required
          >
            <option value="" disabled>Food Type</option>
            <option value="Pizza">Pizza</option>
            <option value="Japanese">Japanese</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Mixed">Mixed</option>
            <option value="Burger">Burger</option>
            <option value="Chinese">Chinese</option>
            <option value="Korean">Korean</option>
            <option value="Indian">Indian</option>
            <option value="Vegetarian">Vegetarian</option>
          </select>
        </div>
        
        <div className="mb-4">
          <MDBCheckbox 
            name='isKidFriendly' 
            value="KidFriendly" 
            id='isKidFriendly' 
            label='Kid Friendly' 
            checked={isKidFriendly}
            onChange={() => setIsKidFriendly(!isKidFriendly)} 
          />
        </div>
        
        <div className="mb-4">
          <MDBCheckbox 
            name='isPetFriendly' 
            value="PetFriendly" 
            id='isPetFriendly' 
            label='Pet Friendly' 
            checked={isPetFriendly}
            onChange={() => setIsPetFriendly(!isPetFriendly)} 
          />
        </div>
        
        <div className="mb-4">
          <MDBCheckbox 
            name='hasPatio' 
            value="HasPatio" 
            id='hasPatio' 
            label='Patio' 
            checked={hasPatio}
            onChange={() => setHasPatio(!hasPatio)} 
          />
        </div>
        
        <MDBBtn type='submit'>Register</MDBBtn>
      </form>
      
      <div className='text-center mt-3'>
        <Link to='/LoginPage'>Already have an account? Log in here</Link>
      </div>
    </MDBContainer>
  );
};

export default RegistrationPage;**/

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [foodType, setFoodType] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closedTime, setClosedTime] = useState('');
  const [averageSpending, setAverageSpending] = useState('');
  const [isKidFriendly, setIsKidFriendly] = useState(false);
  const [isPetFriendly, setIsPetFriendly] = useState(false);
  const [hasPatio, setHasPatio] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,20}$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    const timeRegex = /^\d{2}:\d{2}$/;

    if (!emailRegex.test(email)) {
      newErrors.Email = 'Please enter a valid email address';
    }

    if (!passwordRegex.test(password)) {
      newErrors.Password = 'Password must be between 6 and 20 characters';
    }

    if (password !== repeatPassword) {
      newErrors.RepeatPassword = 'Passwords do not match';
    }

    if (!phoneRegex.test(phoneNumber)) {
      newErrors.PhoneNumber = 'Phone number must be in the format 123-456-7890';
    }

    if (!timeRegex.test(openTime)) {
      newErrors.OpenTime = 'Open time must be in the format HH:MM';
    }

    if (!timeRegex.test(closedTime)) {
      newErrors.ClosedTime = 'Close time must be in the format HH:MM';
    }

    if (location.length < 5 || location.length > 100) {
      newErrors.Location = 'Location must be between 5 and 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = {
        RestaurantID: user.uid,
        Email: email,
        RestaurantName: restaurantName,
        Location: location,
        PhoneNumber: phoneNumber,
        FoodType: foodType,
        OpenTime: openTime,
        ClosedTime: closedTime,
        AverageSpending: averageSpending,
        KidFriendly: isKidFriendly,
        PetFriendly: isPetFriendly,
        HasPatio: hasPatio,
        createdAt: new Date()
      };

      await setDoc(doc(db, "Restaurants", user.uid), userDoc);

      alert('User registered and profile saved successfully');
      navigate('/LoginPage');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          {errors.Email && <div className="text-danger">{errors.Email}</div>}
          <MDBInput 
            wrapperClass='mb-2' 
            label='Email address' 
            id='form1' 
            type='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Please enter a valid email address'
            className={errors.Email ? 'is-invalid' : ''}
            required 
          />
        </div>

        <div className="mb-4">
          {errors.Password && <div className="text-danger">{errors.Password}</div>}
          <MDBInput 
            wrapperClass='mb-2' 
            label='Password' 
            id='form2' 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.Password ? 'is-invalid' : ''}
            placeholder='Password must be between 6 and 20 characters'
            required 
          />
        </div>

        <div className="mb-4">
          {errors.RepeatPassword && <div className="text-danger">{errors.RepeatPassword}</div>}
          <MDBInput 
            wrapperClass='mb-2' 
            label='Repeat Password' 
            id='form3' 
            type='password'
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className={errors.RepeatPassword ? 'is-invalid' : ''}
            required 
          />
        </div>

        <MDBInput 
          wrapperClass='mb-4' 
          label='Restaurant Name' 
          id='restaurantName' 
          type='text'
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          required 
        />

        <div className="mb-4">
          {errors.Location && <div className="text-danger">{errors.Location}</div>}
          <MDBInput 
            wrapperClass='mb-2' 
            label='Location' 
            id='location' 
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={errors.Location ? 'is-invalid' : ''}
            required 
          />
        </div>

        <div className="mb-4">
          {errors.PhoneNumber && <div className="text-danger">{errors.PhoneNumber}</div>}
          <MDBInput 
            wrapperClass='mb-2' 
            label='Phone Number' 
            id='phoneNumber' 
            type='text'
            placeholder='e.g. 123-456-7890'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={errors.PhoneNumber ? 'is-invalid' : ''}
            required 
          />
        </div>

        <div className="mb-4">
          {errors.OpenTime && <div className="text-danger">{errors.OpenTime}</div>}
          <MDBInput 
            wrapperClass='mb-2' 
            label='Open Time' 
            id='openTime' 
            type='text'
            placeholder='e.g. 11:00'
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
            className={errors.OpenTime ? 'is-invalid' : ''}
            required 
          />
        </div>

        <div className="mb-4">
          {errors.ClosedTime && <div className="text-danger">{errors.ClosedTime}</div>}
          <MDBInput 
            wrapperClass='mb-2' 
            label='Closed Time' 
            id='closeTime' 
            type='text'
            placeholder='e.g. 22:00'
            value={closedTime}
            onChange={(e) => setClosedTime(e.target.value)}
            className={errors.ClosedTime ? 'is-invalid' : ''}
            required 
          />
        </div>

        <MDBInput 
          wrapperClass='mb-4' 
          label='Average Spending' 
          id='averageSpending' 
          type='text'
          placeholder='e.g. $30'
          value={averageSpending}
          onChange={(e) => setAverageSpending(e.target.value)}
          required 
        />

        <div className="mb-4">
          <select 
            id="foodType" 
            className="form-select" 
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            required
          >
            <option value="" disabled>Food Type</option>
            <option value="Pizza">Pizza</option>
            <option value="Japanese">Japanese</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Mixed">Mixed</option>
            <option value="Burger">Burger</option>
            <option value="Chinese">Chinese</option>
            <option value="Korean">Korean</option>
            <option value="Indian">Indian</option>
            <option value="Vegetarian">Vegetarian</option>
          </select>
        </div>

        <div className="mb-4">
          <MDBCheckbox 
            name='isKidFriendly' 
            value="KidFriendly" 
            id='isKidFriendly' 
            label='Kid Friendly' 
            checked={isKidFriendly}
            onChange={() => setIsKidFriendly(!isKidFriendly)} 
          />
        </div>

        <div className="mb-4">
          <MDBCheckbox 
            name='isPetFriendly' 
            value="PetFriendly" 
            id='isPetFriendly' 
            label='Pet Friendly' 
            checked={isPetFriendly}
            onChange={() => setIsPetFriendly(!isPetFriendly)} 
          />
        </div>

        <div className="mb-4">
          <MDBCheckbox 
            name='hasPatio' 
            value="HasPatio" 
            id='hasPatio' 
            label='Patio' 
            checked={hasPatio}
            onChange={() => setHasPatio(!hasPatio)} 
          />
        </div>

        <MDBBtn type='submit'>Register</MDBBtn>
      </form>

      <div className='text-center mt-3'>
        <Link to='/LoginPage'>Already have an account? Log in here</Link>
      </div>
    </MDBContainer>
  );
};

export default RegistrationPage;




