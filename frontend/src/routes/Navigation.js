import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(getActivePage(location.pathname));

  function getActivePage(pathname) {
    const parts = pathname.split('/');
    return parts[1]; 
  }

  React.useEffect(() => {
    setActivePage(getActivePage(location.pathname));
  }, [location.pathname]);

  return (
    <div className='navigation-main'>
      <div className='navigation-container'>
        <div className='navigation-links'>
          <Link className={activePage === "set1" ? 'nav-link active' : 'nav-link'} to="/set1">Set 1</Link>
          <hr></hr>
          <Link className={activePage === "set2" ? 'nav-link active' : 'nav-link'} to="/set2">Set 2</Link>
          <hr></hr>
          <Link className={activePage === "set3" ? 'nav-link active' : 'nav-link'} to="/set3">Set 3</Link>
          <hr></hr>
          {/* <Link className={activePage === "set4" ? 'nav-link active' : 'nav-link'} to="/set4">Set 4</Link>
          <hr></hr>
          <Link className={activePage === "set5" ? 'nav-link active' : 'nav-link'} to="/set5">Set 5</Link>
          <hr></hr> */}
          <Link className={activePage === "accumulative" ? 'nav-link active' : 'nav-link'} to="/accumulative">Accumulative</Link>
          <hr></hr>
          <Link className={activePage === "positivepoints" ? 'nav-link active' : 'nav-link'} to="/positivepoints">Positive Points</Link>
          <hr></hr>
          <Link className={activePage === "statistics" ? 'nav-link active' : 'nav-link'} to="/statistics">Statistics</Link>
          <hr></hr>
          <Link className={activePage === "exportpdf" ? 'nav-link active' : 'nav-link'} to="/exportpdf">PDF to Export</Link>
          
        </div>
      </div>
    </div>
  );
}

export default Navigation;
