import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './NavbarMenuPanel.css'; // Importing the styles

const NavbarMenuPanel = () => {
  const [isPanelVisible, setPanelVisible] = useState(false);
  const [activeBranch, setActiveBranch] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state

  const panelRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const branches = [
    'CSE', 'ECE', 'EEE', 'Mechanical', 'Civil',
    'IT', 'BioTech', 'MTech1', 'MTech2', 'MTech3'
  ];

  const firstYearCourses = [
    'Beee', 'Calculus', 'Engineering Chemistry', 'Differential Equations and Transforms',
    'Engineering Physics', 'Technical English Communication', 'Structured and Object-Oriented Programming'
  ];

  const branchCourses = {
    CSE: {
      '1st Year': firstYearCourses,
      '2nd Year': ['Digital Systems Design', 'Discrete Mathematics and Graph Theory', 'Data Structures and Algorithms', 'Microprocessors and Microcontrollers', 'Probability and Statistics', 'Computer Architecture and Organization', 'Theory of Computation'],
      '3rd Year': ['Artificial Intelligence', 'AWS Solutions Architect', 'Compiler Design', 'Computer Networks', 'Database Systems', 'Operating Systems', 'Cryptography and Network Security', 'Embedded Systems', 'Information Security Management'],
      '4th Year': ['Machine Learning', 'Cloud Computing', 'Advanced Database Management', 'Software Engineering', 'Network Security', 'Project Management']
    },
    ECE: {
      '1st Year': firstYearCourses,
      '2nd Year': ['Digital Electronics', 'Signals and Systems', 'Electromagnetic Fields', 'Analog Electronics', 'Control Systems'],
      '3rd Year': ['Communication Systems', 'Microprocessors', 'Digital Signal Processing', 'VLSI Design', 'Embedded Systems'],
      '4th Year': ['Wireless Communication', 'Optical Communication', 'Advanced Control Systems', 'Elective I', 'Elective II']
    },
    EEE: {
      '1st Year': firstYearCourses,
      '2nd Year': ['Circuit Theory', 'Electromagnetic Fields', 'Control Systems', 'Digital Electronics', 'Power Systems'],
      '3rd Year': ['Electrical Machines', 'Instrumentation', 'Electrical Drives', 'Power Electronics', 'Renewable Energy Systems'],
      '4th Year': ['High Voltage Engineering', 'Electrical Transients', 'Power System Protection', 'Elective I', 'Elective II']
    },
    Mechanical: {
      '1st Year': firstYearCourses,
      '2nd Year': ['Thermodynamics', 'Fluid Mechanics', 'Strength of Materials', 'Manufacturing Processes', 'Machine Design'],
      '3rd Year': ['Heat Transfer', 'Dynamics of Machinery', 'Internal Combustion Engines', 'Control Systems', 'Robotics'],
      '4th Year': ['Mechatronics', 'Finite Element Analysis', 'Industrial Engineering', 'Elective I', 'Elective II']
    },
    Civil: {
      '1st Year': firstYearCourses,
      '2nd Year': ['Structural Analysis', 'Concrete Technology', 'Geotechnical Engineering', 'Surveying', 'Environmental Engineering'],
      '3rd Year': ['Hydraulics', 'Design of Reinforced Concrete Structures', 'Transportation Engineering', 'Construction Management', 'Structural Dynamics'],
      '4th Year': ['Advanced Structural Analysis', 'Project Planning and Management', 'Urban Planning', 'Elective I', 'Elective II']
    },
    IT: {
      '1st Year': firstYearCourses,
      '2nd Year': ['Introduction to IT', 'Data Communication', 'Information Systems', 'Software Engineering', 'Network Management'],
      '3rd Year': ['Web Technologies', 'Database Management Systems', 'Cloud Computing', 'Cyber Security', 'Mobile Computing'],
      '4th Year': ['Advanced Networking', 'Big Data Analytics', 'IT Project Management', 'Elective I', 'Elective II']
    },
    BioTech: {
      '1st Year': firstYearCourses,
      '2nd Year': ['Biochemistry', 'Genetics', 'Microbiology', 'Molecular Biology', 'Bioinformatics'],
      '3rd Year': ['Cell Biology', 'Biotechnology Processes', 'Genetic Engineering', 'Bioprocessing', 'Pharmacology'],
      '4th Year': ['Industrial Biotechnology', 'Clinical Research', 'Environmental Biotechnology', 'Elective I', 'Elective II']
    },
    MTech1: {
      '1st Year': firstYearCourses,
      '2nd Year': ['Advanced Algorithms', 'Machine Learning', 'Advanced Database Management', 'Cloud Computing', 'Big Data'],
      '3rd Year': ['Research Methodology', 'Project Work', 'Dissertation', 'Elective I', 'Elective II'],
      '4th Year': ['Dissertation Completion', 'Advanced Topics', 'Elective III', 'Elective IV', 'Industry Collaboration']
    },
    MTech2: {
      '1st Year': firstYearCourses,
      '2nd Year': ['Advanced Networking', 'Network Security', 'Cloud Infrastructure', 'Data Privacy', 'Advanced Protocols'],
      '3rd Year': ['Project Work', 'Dissertation', 'Elective I', 'Elective II', 'Industry Internship'],
      '4th Year': ['Dissertation Completion', 'Advanced Topics', 'Elective III', 'Elective IV', 'Industry Collaboration']
    },
    MTech3: {
      '1st Year': firstYearCourses,
      '2nd Year': ['Advanced Software Engineering', 'Software Design Patterns', 'Cloud Technologies', 'DevOps', 'Agile Methodologies'],
      '3rd Year': ['Project Work', 'Dissertation', 'Elective I', 'Elective II', 'Industry Internship'],
      '4th Year': ['Dissertation Completion', 'Advanced Topics', 'Elective III', 'Elective IV', 'Industry Collaboration']
    }
  };

  const togglePanel = () => {
    setPanelVisible(!isPanelVisible);
  };

  const showBranch = (branch) => {
    setActiveBranch(branch);
    setActiveYear(null); // Reset the year selection
  };

  const showYearCourses = (year) => {
    setActiveYear(year);
  };

  const handleSubjectClick = (subject) => {
    // Redirect to /subject/{subject} where {subject} is the clicked course
    navigate(`/subject/${encodeURIComponent(subject)}`);
    setPanelVisible(false); // Close the panel after navigating
  };

  // Handle click outside to close the panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setPanelVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Course Categories</h1>
      </header>

      <ul className="row-container">
        {branches.map((branch, index) => (
          <li key={index} onClick={() => { togglePanel(); showBranch(branch); }}>
            {branch}
          </li>
        ))}
      </ul>

      {isPanelVisible && (
        <div className="menu-panel" ref={panelRef}>
          <div className="menu-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <ul className="left-menu">
              {activeBranch && Object.keys(branchCourses[activeBranch]).map((year, index) => (
                <li key={index} onClick={() => showYearCourses(year)}>
                  {year}
                </li>
              ))}
            </ul>

            <div className="right-menu">
              {activeYear && activeBranch && (
                <ul className="submenu">
                  {branchCourses[activeBranch][activeYear]
                    .filter(course => course.toLowerCase().includes(searchTerm.toLowerCase())) // Filter based on search term
                    .map((course, idx) => (
                      <li key={idx} onClick={() => handleSubjectClick(course)}>
                        {course}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMenuPanel;
