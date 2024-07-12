import React from 'react';
import {  Link } from 'react-router-dom';
import {
  MDBContainer,
  // MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink
} from 'mdb-react-ui-kit';



const SideNavPage = () => {
  return (
     <div>
    {/* <MDBNavbar expand="lg" light bgColor="light" className="w-100" >
    </MDBNavbar> */}
     <MDBContainer className="d-flex flex-column p-1 float-start " style={{ width: '15vw' }}>
    <MDBNavbarNav
      className="flex-column p-1  "

    >

      <MDBNavbarItem>
        <MDBNavbarLink tag={Link} to="/BookingsPage">
         Bookings
        </MDBNavbarLink>
      </MDBNavbarItem>


      <MDBNavbarItem>
        <MDBNavbarLink tag={Link} to="/ProfilePage">
          Profile
        </MDBNavbarLink>
      </MDBNavbarItem>

      

    </MDBNavbarNav>
    </MDBContainer>
       </div>
  
  );
};

export default SideNavPage;
