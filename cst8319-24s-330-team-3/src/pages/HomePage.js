import {Link} from 'react-router-dom';
import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption, MDBBtn} from 'mdb-react-ui-kit';

const HomePage = () => {
  return (


<header>
    <MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem itemId={1}>
        <img src='https://cdnimg.webstaurantstore.com/images/articles/123/reserved-header.jpg' className='d-block w-100' alt='...' />
        <MDBCarouselCaption>
          <h5>Seamless integration to reservation systems for table bookings</h5>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={2}>
        <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(8).jpg' className='d-block w-100' alt='...' />
        <MDBCarouselCaption>
          <h5>Smart promotions through matched criteria for social gatherings</h5>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={3}>
        <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(17).jpg' className='d-block w-100' alt='...' />
        <MDBCarouselCaption>
          <h5>Real-time 2-way patron messaging</h5>
        </MDBCarouselCaption>
      </MDBCarouselItem>
    </MDBCarousel>

    <div
        className='p-5 text-center '
      >
        
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-Black'>
              <h1 className='mb-3 font-times-new-roman'>Welcome to the Restaurant Management System</h1>
              <p className='mb-3 fst-italic fw-light'>It doesn’t matter if you are a small coffee shop or a five-star restaurant, LiveConnect will enable you to reach out to your customers when and where needed</p>
              <Link to="/RegistrationPage">
              <MDBBtn tag="a" outline size="lg">
              Get Started
              </MDBBtn>
              </Link>
            </div>
          </div>
        </div>
      

</header>
  );
}
  

export default HomePage;
