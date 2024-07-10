//Please read the Readme File carefully before running this code.
import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingsPage from './pages/booking/BookingsPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import SideNavPage from './pages/SideNavPage';
import SettingsPage from './pages/SettingsPage';
import TransferList from './pages/TransferList';
import BookingDetails from './pages/BookingDetails';

function App() {
return(
  <Router>
  <div className="App">
  <Navbar/>
    <div className="component">
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/BookingsPage" element={<BookingsPage />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/RegistrationPage" element={<RegistrationPage />} />
      <Route path="/ProfilePage" element={<ProfilePage />} />
      <Route path="/SideNavPage" element={<SideNavPage />} />
      <Route path="/SettingsPage" element={<SettingsPage />} />
      <Route path="/TransferList" element={<TransferList/>} />
      <Route path="/BookingDetails" element={<BookingDetails/>} />
      <Route path="/bookingdetails/:bookingId" element={<BookingDetails />} />

      </Routes>
    </div>
  </div>
  </Router>
);
}

export default App;
