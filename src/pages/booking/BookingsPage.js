import React, { useState, useEffect } from "react";
import SideNavPage from "../SideNavPage";
import TransferList from "../TransferList";
import Calendar from "react-calendar";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import "./BookingsPage.css";
import 'react-calendar/dist/Calendar.css'; 

const BookingsPage = () => {
  const [status, setStatus] = useState("Closed");
  const [date, setDate] = useState(new Date());

  const openTime = 0; // Restaurant opens at 0 AM
  const closeTime = 24; // Restaurant closes at 12 PM

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
      case "Close":
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
          <MDBDropdownItem link onClick={() => setStatus("Close")}>
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

          {/* calendar */}
          <div className="calendar-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', marginBottom: '0px' }}>
            <Calendar
              onChange={setDate}
              value={date}
              style={{ maxWidth: '100%', width: '100%' }}
            />
          </div>
          
          {/* Pass the date as a prop */}
          <TransferList selectedDate={date} />
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
