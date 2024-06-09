import React from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
const ProfilePage = () => {
  return (
    <div className="container py-5">

      
  
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">

            <div className="card-body text-center">
              <img src="https://th.bing.com/th/id/OIP.rO_erAHn811Sm0TR4TohQgHaHa?rs=1&pid=ImgDetMain" alt="avatar"
                className="rounded-circle img-fluid" 
                style={{ width: '50vw', height: '50vh' }}/>
              <h5 className="my-3">LiveConnect</h5>
            </div>

          </div>
        </div>


        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Restaurant Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">LiveConnect</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">LiveConnect@email.com</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">(613) 123-4567</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Open Hours</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">11:00AM - 9:00PM</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Address</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">123 Random Street,Vancouver, British Columbia, CA</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Food Type</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">Pizza</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Booking</span> Booking Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Booking finished Rate Today</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Booking finished Rate In Total</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Customer Rating</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                   
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
              <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://liveconnect.ca/</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="x fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>@liveconnect</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <MDBCardText>liveconnect</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText>liveconnect</MDBCardText>
                  </MDBListGroupItem>
                  
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
            </MDBCol>
          </MDBRow>
      </div>
    </div>

  );
};

export default ProfilePage;
