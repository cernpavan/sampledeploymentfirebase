import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import PaperItem from '../PaperItem/PaperItem';
import './SubjectPage.css';

const SubjectPage = () => {
  const { subjectName } = useParams();
  const { papers_list } = useContext(StoreContext);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [examType, setExamType] = useState('CAT-1'); // Default to CAT-1

  const baseUrl = "http://localhost:5000"; // Define your base URL here

  useEffect(() => {
    console.log('Papers List:', papers_list); // Debugging line
    console.log('Subject Name:', subjectName); // Debugging line

    if (!papers_list) {
      return;
    }

    // Filter papers based on subject and exam type
    const filtered = papers_list
      .filter(paper => 
        paper.subjectName.toLowerCase() === subjectName.toLowerCase() &&
        paper.paperType === examType
      )
      .map(paper => ({
        ...paper,
        year: new Date(paper.paperDate).getFullYear(),
        slot: paper.paperSlot,
      }))
      .sort((a, b) => {
        // Sort by year (ascending), then by slot (ascending)
        return a.year - b.year || a.slot.localeCompare(b.slot);
      });

    console.log('Filtered Papers:', filtered); // Debugging line

    setFilteredPapers(filtered);
  }, [subjectName, papers_list, examType]);

  const handleExamTypeChange = (type) => {
    setExamType(type);
  };

  // Get unique years and sort in decreasing order
  const years = [...new Set(filteredPapers.map(paper => paper.year))].sort((a, b) => b - a);

  return (
    <div className='container'>
      <div className="paper-display pd-50">
        <div className="header-container">
          <h1 className="subject-name">{subjectName.charAt(0).toUpperCase() + subjectName.slice(1)} Papers</h1>
          <div className="exam-type-selector mb-0">
            <button onClick={() => handleExamTypeChange('CAT-1')} className={`exam-type-button ${examType === 'CAT-1' ? 'active' : ''}`}>CAT-1</button>
            <button onClick={() => handleExamTypeChange('CAT-2')} className={`exam-type-button ${examType === 'CAT-2' ? 'active' : ''}`}>CAT-2</button>
            <button onClick={() => handleExamTypeChange('FATS')} className={`exam-type-button ${examType === 'FATS' ? 'active' : ''}`}>FATS</button>
          </div>
        </div>
        
        <div className="year-paper-container">
          {years.length > 0 ? (
            years.map(year => (
              <div key={year} className="year-row">
                <h2 className="year-heading">{year}</h2>
                <div className="papers-columns mt-2">
                  {filteredPapers
                    .filter(paper => paper.year === year)
                    .map((item, index) => (
                      <PaperItem
                        key={index}
                        id={item._id}
                        examName={item.subjectName}
                        examDate={new Date(item.paperDate).toLocaleDateString()}
                        examType={item.paperType}
                        slot={item.slot}
                        paperLink={item.paperLink}
                        url={baseUrl} // Pass the base URL here
                        showImage={false} // Do not show the image
                      />
                    ))}
                </div>
              </div>
            ))
          ) : (
            <p>No papers found for {subjectName}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
