import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../../context/StoreContext';
import TextField from '@mui/material/TextField'; // Import Material UI TextField
import Button from '@mui/material/Button'; // Import Material UI Button
import './Navbar.css';
const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const navigate = useNavigate(); // To navigate to different routes
  const { papers_list } = useContext(StoreContext); // Access papers list from context

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim(); // Normalize input

    if (lowerCaseSearchTerm) {
      const papersExist = checkIfPapersExist(lowerCaseSearchTerm);

      if (papersExist) {
        navigate(`/subject/${lowerCaseSearchTerm}`); // Navigate to the subject page
      } else {
        toast.error('No papers uploaded, please upload after the exam'); // Show toast notification
      }
    } else {
      console.log('Search term is empty.');
    }
  };

  const checkIfPapersExist = (term) => {
    // Check if there are any papers for the given term
    return papers_list.some(paper => paper.subjectName.toLowerCase() === term);
  };

  return (
    <div className='header'>
      <div className="container">
      <nav className='navbar navbar-expand-lg navbar-light py-md-3'>
        <Link to="/" className='navbar-brand' onClick={() => setMenu("home")}>
          <img src={assets.logo} alt="logo" className='navbar-logo' />
        </Link>
        {/* Navbar Toggler for Mobile View */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" onClick={() => setMenu("home")} className={`nav-link ${menu === "home" ? "active" : ""}`}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/notes" onClick={() => setMenu("notes")} className={`nav-link ${menu === "notes" ? "active" : ""}`}>Notes</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/youtube-links" onClick={() => setMenu("youtube-links")} className={`nav-link ${menu === "youtube-links" ? "active" : ""}`}>YouTube Links</Link>
            </li> */}
            <li className="nav-item">
              <Link to="/contact-us" onClick={() => setMenu("contact-us")} className={`nav-link ${menu === "contact-us" ? "active" : ""}`}>Contact Us</Link>
            </li>
            <li className="nav-item mr-3">
              <Link to="/paper-upload" onClick={() => setMenu("paper-upload")} className={`nav-link ${menu === "paper-upload" ? "active" : ""}`}>Paper Upload</Link>
            </li>
          </ul>

          {/* Right Side Search */}
          <div className="navbar-right mt-3 mt-lg-0 d-none d-lg-block">
          <TextField
  variant="outlined"
  label="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  size="small"
  InputProps={{
    sx: {
      color: "white", // Text color inside the input
      "& input::placeholder": {
        color: "chocolate", // Placeholder color
      },
    },
  }}
  InputLabelProps={{
    sx: {
      color: "white", // Label color
      "&.Mui-focused": {
        color: "white", // Label color remains white on focus
      },
    },
  }}
  className="navbar-search-input"
/>
<Button variant="contained" onClick={handleSearch} className="btn btn-search">
  Search
</Button>

          </div>
        </div>

        <ToastContainer />
      </nav>
      </div>
    </div>
  );
}

export default Navbar;
