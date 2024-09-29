import React from 'react';
import './PaperItem.css';

const PaperItem = ({ id, examName, examDate, examType, slot, paperLink }) => {
  return (
    <div className="paper-item">
      <div className="paper-item-info">
        <div className="paper-item-name">
          <p>{examName}</p>
          <p>{examType}</p>
        </div>
        <div className='d-flex justify-content-between'>
          <p className="paper-item-desc">{examDate}</p>
          <p className="paper-item-slot">{slot}</p>
        </div>
        <div className="paper-item-action text-center">
          <button onClick={() => window.open(paperLink, '_blank')} className="view-button btn btn-view mt-2">
            View Paper
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaperItem;
