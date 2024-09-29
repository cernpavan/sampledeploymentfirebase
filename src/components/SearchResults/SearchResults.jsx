import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import './SearchResults.css';
import { StoreContext } from '../../context/StoreContext';
import PaperItem from '../PaperItem/PaperItem';

const SearchResults = () => {
  const { papers_list } = useContext(StoreContext);
  const { searchTerm } = useParams(); // Get search term from URL params

  // Filter papers based on the search term
  const filteredPapers = papers_list.filter((paper) =>
    paper.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-results">
      <h1>Search Results for "{searchTerm}"</h1>
      <div className="paper-display-list">
        {filteredPapers.length > 0 ? (
          filteredPapers.map((item, index) => (
            <PaperItem
              key={index}
              id={item._id}
              examName={item.examName}
              examDate={item.examDate}
              examType={item.examType}
              slot={item.slot}
              image={item.image}
              paperLink={item.paperLink}
            />
          ))
        ) : (
          <p>No papers found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
