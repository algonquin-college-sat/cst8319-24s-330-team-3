import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [initialRestaurant, setInitialRestaurant] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        const docRef = doc(db, 'Restaurants', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRestaurant(docSnap.data());
          setInitialRestaurant(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    const timeRegex = /^\d{2}:\d{2}$/;

    if (!emailRegex.test(restaurant.Email)) {
      newErrors.Email = 'Please enter a valid email address';
    }

    if (!phoneRegex.test(restaurant.PhoneNumber)) {
      newErrors.PhoneNumber = 'Phone number must be in the format 123-456-7890';
    }

    if (!timeRegex.test(restaurant.OpenTime)) {
      newErrors.OpenTime = 'Open time must be in the format HH:MM';
    }

    if (!timeRegex.test(restaurant.ClosedTime)) {
      newErrors.ClosedTime = 'Closed time must be in the format HH:MM';
    }

    if (restaurant.Location.length < 5 || restaurant.Location.length > 100) {
      newErrors.Location = 'Location must be between 5 and 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) {
      return;
    }

    const docRef = doc(db, 'Restaurants', user.uid);
    await updateDoc(docRef, restaurant);
    setEditMode(false);
    setInitialRestaurant(restaurant);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurant((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCancel = () => {
    setRestaurant(initialRestaurant);
    setEditMode(false);
    setErrors({});
  };

  if (!isLoggedIn) {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12 text-center">
            <p className="text-danger">Please log in to your account!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img
                src="https://th.bing.com/th/id/OIP.rO_erAHn811Sm0TR4TohQgHaHa?rs=1&pid=ImgDetMain"
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: '150px' }}
              />
              <h5 className="my-3">{restaurant.RestaurantName}</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              {Object.entries({
                'Restaurant Name': 'RestaurantName',
                Email: 'Email',
                Phone: 'PhoneNumber',
                'Open Time': 'OpenTime',
                'Closed Time': 'ClosedTime',
                Location: 'Location',
                'Average Spending': 'AverageSpending',
              }).map(([label, key]) => (
                <React.Fragment key={key}>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">{label}</p>
                    </div>
                    <div className="col-sm-9">
                      {editMode ? (
                        <MDBInput
                          name={key}
                          value={restaurant[key] || ''}
                          onChange={handleChange}
                          className={errors[key] ? 'is-invalid' : ''}
                        />
                      ) : (
                        <p className="text-muted mb-0">{restaurant[key]}</p>
                      )}
                      {errors[key] && <div className="text-danger">{errors[key]}</div>}
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Food Type</p>
                </div>
                <div className="col-sm-9">
                  {editMode ? (
                    <MDBDropdown>
                      <MDBDropdownToggle tag="a" className="nav-link">
                        {restaurant.FoodType || 'Select Food Type'}
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        {['Pizza', 'Japanese', 'Middle Eastern', 'Mixed', 'Burger', 'Chinese', 'Korean', 'Indian', 'Vegetarian'].map((type) => (
                          <MDBDropdownItem key={type} link onClick={() => setRestaurant((prev) => ({ ...prev, FoodType: type }))}>
                            {type}
                          </MDBDropdownItem>
                        ))}
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  ) : (
                    <p className="text-muted mb-0">{restaurant.FoodType}</p>
                  )}
                </div>
              </div>
              <hr />
              {Object.entries({
                'Kid Friendly': 'KidFriendly',
                'Pet Friendly': 'PetFriendly',
                Patio: 'HasPatio',
              }).map(([label, key]) => (
                <React.Fragment key={key}>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">{label}</p>
                    </div>
                    <div className="col-sm-9">
                      {editMode ? (
                        <MDBDropdown>
                          <MDBDropdownToggle tag="a" className="nav-link">
                            {restaurant[key] ? 'Yes' : 'No'}
                          </MDBDropdownToggle>
                          <MDBDropdownMenu>
                            <MDBDropdownItem link onClick={() => setRestaurant((prev) => ({ ...prev, [key]: true }))}>Yes</MDBDropdownItem>
                            <MDBDropdownItem link onClick={() => setRestaurant((prev) => ({ ...prev, [key]: false }))}>No</MDBDropdownItem>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                      ) : (
                        <p className="text-muted mb-0">{restaurant[key] ? 'Yes' : 'No'}</p>
                      )}
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
              <div className="text-center">
                {editMode ? (
                  <>
                    <MDBBtn onClick={handleUpdate}>Save Changes</MDBBtn>
                    <MDBBtn color="secondary" onClick={handleCancel} className="ms-2">Cancel</MDBBtn>
                  </>
                ) : (
                  <MDBBtn onClick={() => setEditMode(true)}>Edit Profile</MDBBtn>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

