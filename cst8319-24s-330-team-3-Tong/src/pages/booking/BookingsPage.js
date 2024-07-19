import React, { useState, useEffect } from "react";
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
  const [status, setStatus] = useState("Closed");

  const openTime = 9; // Restaurant opens at 9 AM
  const closeTime = 22; // Restaurant closes at 10 PM

  useEffect(() => {
    const checkStatus = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= openTime && currentHour < closeTime) {
        setStatus("Open");
      } else {
        setStatus("Closed");
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check status every minute

    return () => clearInterval(interval); 
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case "Open":
        return "lightgreen";
      case "Closed":
        return "grey";
      case "Pause":
        return "red";
      default:
        return "white";
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <MDBDropdown className="float-end">
        <MDBDropdownToggle color="dark" style={{ backgroundColor: getStatusColor() }}>
          Set Status
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link onClick={() => setStatus("Open")}>
            Open
          </MDBDropdownItem>
          <MDBDropdownItem link onClick={() => setStatus("Closed")}>
            Close
          </MDBDropdownItem>
          <MDBDropdownItem link onClick={() => setStatus("Pause")}>
            Pause
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
      
      <div className="status-display" style={{ textAlign: "center", margin: "20px 0" }}>
        <h4 style={{ fontWeight: "bold", fontStyle: "italic" }}>Current Status: {status}</h4>
      </div>
      
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
