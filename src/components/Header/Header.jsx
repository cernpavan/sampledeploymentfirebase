import React, { useState, useEffect } from 'react';
import './Header.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'; // To fetch data from API

const Header = () => {
  const [papers, setPapers] = useState([]); // Store all papers fetched from API
  const [searchTerm, setSearchTerm] = useState(''); // Current search input
  const [filteredPapers, setFilteredPapers] = useState([]); // Store filtered papers

  // Fetch the list of papers from the API when the component mounts
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/paper/list');
        setPapers(response.data); // Assuming response.data contains the array of papers
        console.log('Fetched papers:', response.data); // Debugging: Log fetched data
      } catch (error) {
        console.error('Error fetching papers:', error);
      }
    };

    fetchPapers();
  }, []);

  // Handle input change for the search bar and filter papers
  const handleInputChange = (event, value) => {
    setSearchTerm(value);

    // Filter papers based on search input
    const filtered = papers.filter((paper) =>
      paper.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPapers(filtered);
    console.log('Filtered papers:', filtered); // Debugging: Log filtered results
  };

  return (
    <div className="pd-50 pt-0 pt-md-5">
      <div className="container p-0">
        <div className="banner">
          <div className="banner-contents text-center">
            <div className="navbar-right mb-3 d-lg-none">
              <Autocomplete
                freeSolo
                options={filteredPapers.map((paper) => paper.title)} // Show filtered paper titles in the dropdown
                inputValue={searchTerm}
                onInputChange={handleInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Search papers..."
                    size="small"
                  />
                )}
              />
            </div>
            <h2>See the Previous Papers</h2>
            <p>Prepare Well for the Exam</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
