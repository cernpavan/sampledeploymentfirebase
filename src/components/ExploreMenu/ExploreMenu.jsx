import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setVisibleItems(1);
      } else {
        setVisibleItems(5);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll("right");
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = direction === "left" ? -200 : 200;
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (menuName) => {
    setCategory(menuName);
    navigate(`/subject/${menuName}`);
  };

  const cloneItems = [...menu_list, ...menu_list];

  return (
    <div className='container py-lg-5 py-0'>
        <div className='explore-menu' id='explore-menu'>
          <h2>Explore the Papers</h2>
          <div className="explore-menu-header">
            <p className='explore-menu-text'>Choose the paper you want to read</p>
            <div className='arrows'>
              <div className="arrow" onClick={() => handleScroll("left")}>&larr;</div>
              <div className="arrow" onClick={() => handleScroll("right")}>&rarr;</div>
            </div>
          </div>

          <div className={`explore-menu-list mt-4 ${visibleItems === 1 ? 'single-item' : 'multiple-items'}`} id='explore-menu-list' ref={sliderRef}>
            {cloneItems.map((item, index) => (
              <div key={index} onClick={() => handleCategoryClick(item.menu_name)} className="explore-menu-list-item">
                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
                <p>{item.menu_name}</p>
              </div>
            ))}
          </div>
          <hr />
        </div>
        </div>
  );
};

export default ExploreMenu;
