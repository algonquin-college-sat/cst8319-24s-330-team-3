import { Link, useNavigate } from 'react-router-dom';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { auth } from '../firebase'; // Import your Firebase authentication

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/LoginPage'); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <nav className="navbar">
      <img
        src="https://liveconnect.ca/wp-content/uploads/2021/09/liveconnect_logo_horizontal.png"
        className="logo-img"
        alt='logo'
      />

      <div className="links">
        <div className="d-flex align-items-center">
          <Link to="/" className="text-reset me-3" data-mdb-tooltip-init title="Home Page">
            <i className="fas fa-home fa-lg"></i>
          </Link>

          <Link to="/BookingsPage"
            className="text-reset me-3"
            data-mdb-tooltip-init title="Booking Information"
          >
            <i className="fas fa-bell fa-lg"></i>
            <span className="badge rounded-pill badge-notification bg-danger">1</span>
          </Link>
        </div>

        <MDBDropdown>
          <MDBDropdownToggle tag="div" className="d-flex align-items-center hidden-arrow" aria-expanded="false" data-mdb-tooltip-init title="Profile">
            <img
              src="https://th.bing.com/th/id/OIP.rO_erAHn811Sm0TR4TohQgHaHa?rs=1&pid=ImgDetMain"
              className="rounded-circle"
              alt="avatar pic"
              height="35"
            />
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem>
              <Link to="/ProfilePage" className="dropdown-item">My Profile</Link>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <Link to="/LoginPage" className="dropdown-item">Login</Link>
            </MDBDropdownItem>
            <MDBDropdownItem onClick={handleLogout} className="dropdown-item">
              Logout
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
    </nav>
  );
};

export default Navbar;
