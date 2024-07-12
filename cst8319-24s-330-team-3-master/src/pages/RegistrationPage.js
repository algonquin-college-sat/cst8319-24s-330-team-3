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

function RegistrationPage() {
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
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords do not match");
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
          required 
        />
        <MDBInput 
          wrapperClass='mb-4' 
          label='Phone Number' 
          id='phoneNumber' 
          type='text'
          placeholder='xxx-xxx-xxxx'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required 
        />
        <MDBInput 
          wrapperClass='mb-4' 
          label='Open Time' 
          id='openTime' 
          type='text'
          placeholder='e.g. 11:00'
          value={openTime}
          onChange={(e) => setOpenTime(e.target.value)}
          required 
        />
        <MDBInput 
          wrapperClass='mb-4' 
          label='Closed Time' 
          id='closeTime' 
          type='text'
          placeholder='e.g. 22:00'
          value={closedTime}
          onChange={(e) => setClosedTime(e.target.value)}
          required 
        />
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
        
        <MDBBtn className="mb-4" type="submit">Register</MDBBtn>
      </form>
      
      <div className="text-center">
        <p>Already a member? <Link to ="/LoginPage">Login</Link></p>
      </div>

    </MDBContainer>
  );
}

export default RegistrationPage;
