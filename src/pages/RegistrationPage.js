import {Link} from 'react-router-dom';
import React from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  // MDBIcon
}
from 'mdb-react-ui-kit';

function App() {
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>
      <MDBInput wrapperClass='mb-4' label='Repeat Password' id='form3' type='password'/>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        
      </div>

      <Link to='/LoginPage'><MDBBtn className="mb-4">Register</MDBBtn></Link>

      <div className="text-center">
        <p>Already a member? <Link to ="/LoginPage">Login</Link></p>
       
      </div>

    </MDBContainer>
  );
}

export default App;