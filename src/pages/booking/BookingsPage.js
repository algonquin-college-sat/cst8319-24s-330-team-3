import React from 'react';
import SideNavPage from '../SideNavPage';
import TransferList from '../TransferList';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import './BookingsPage.css';

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
<TransferList />

</div>
  );
};

export default BookingsPage;
