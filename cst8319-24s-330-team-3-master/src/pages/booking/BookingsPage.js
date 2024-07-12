import React from "react";
import SideNavPage from "../SideNavPage";
import TransferList from "../TransferList";
import ChatWidget from "../../components/ChatWidget";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import "./BookingsPage.css";

const BookingsPage = () => {
  return (
    <div>
      <MDBDropdown className="float-end">
        <MDBDropdownToggle color="dark">Set Status</MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link>Open</MDBDropdownItem>
          <MDBDropdownItem link>Close</MDBDropdownItem>
          <MDBDropdownItem link>Pause</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
      
      <div className="d-flex">
      <div className="col-md-1">
      <SideNavPage />
      </div>
    
      
      <div className="col-md-11">
      <TransferList />
      </div>
      <ChatWidget />
      </div>
    </div>
  );
};


export default BookingsPage;
