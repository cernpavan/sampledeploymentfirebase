import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import PaperItem from '../PaperItem/PaperItem';
import axios from 'axios';
import './paperDisplay.css';

const PapersDisplay = ({ category, searchTerm }) => {
  const { papers_list } = useContext(StoreContext);
  const [latestPapers, setLatestPapers] = useState([]);

  const url = "http://localhost:5000"; // Adjust if needed

  // Fetch latest papers
  const fetchLatestPapers = async () => {
    try {
      const response = await axios.get(`${url}/api/paper/latest`);
      if (response.data.success) {
        // Sort papers by date in descending order
        const sortedPapers = response.data.data.sort((a, b) => new Date(b.paperDate) - new Date(a.paperDate));
        setLatestPapers(sortedPapers);
      } else {
        console.error("Error retrieving latest papers");
      }
    } catch (error) {
      console.error('Error fetching latest papers:', error);
    }
  };

  useEffect(() => {
    fetchLatestPapers();
  }, []);

  // Filter latest papers based on category and search term
  const filteredPapers = latestPapers.filter((paper) => {
    const matchesCategory = category === "All" || paper.paperType === category;
    const matchesSearch = (paper.subjectName || "").toLowerCase().includes((searchTerm || "").toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="paper-display">
      <div className="header-container">
        <h1 className="header-title"></h1>
      </div>
      <div className="year-paper-container ffff">
        {filteredPapers.length > 0 ? (
          <div className="papers-columns">
            {filteredPapers.map((item, index) => (
              <PaperItem
                key={index}
                id={item._id}
                examName={item.subjectName}
                examDate={new Date(item.paperDate).toLocaleDateString()} // Convert date to local date string
                examType={item.paperType}
                slot={item.paperSlot}
                paperLink={item.paperLink}
                url={url} // Pass the base URL here
                showImage={false} // Do not show the image
              />
            ))}
          </div>
        ) : (
          <p>No papers found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default PapersDisplay;
