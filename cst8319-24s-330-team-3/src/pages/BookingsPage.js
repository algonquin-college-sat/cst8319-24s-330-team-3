import React from 'react';
import SideNavPage from './SideNavPage';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
const BookingsPage = () => {
  return (
    <div>
    <SideNavPage/>


<MDBDropdown className="float-end">
<MDBDropdownToggle color='dark'>Set Status</MDBDropdownToggle>
<MDBDropdownMenu>
  <MDBDropdownItem link>Open</MDBDropdownItem>
  <MDBDropdownItem link>Close</MDBDropdownItem>
  <MDBDropdownItem link>Pause</MDBDropdownItem>
</MDBDropdownMenu>
</MDBDropdown>

<p>All the booking information will show up here</p>
</div>
  );
};

export default BookingsPage;
