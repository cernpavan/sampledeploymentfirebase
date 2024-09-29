import React, { useState } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Header from '../../components/Header/Header';
import PapersDisplay from '../../components/PaperDisplay/PaperDisplay';
import './Home.css';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Determine if images should be shown based on the presence of a search term
  const showImage = searchTerm === "";

  return (
    <div >
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <div className="latest-bg  pd-50">
      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-lg-8">
        
            <div className="latest-paper text-center mb-4">
                <h2 className='text-white'>Latest Papers</h2>
            </div>

            <div className="search-bar">
              <input
              className='form-control'
                type="text"
                placeholder="Search for papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            </div>
            </div>
            <PapersDisplay category={category} searchTerm={searchTerm} showImage={showImage} />
            
          </div>
          </div>
    </div>
  );
};

export default Home;
