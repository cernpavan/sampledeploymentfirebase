import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Contact_us from './pages/Contact_us/Contact_us';
import Footer from './components/Footer/Footer';
import StoreContextProvider from './context/StoreContext'; 
import SubjectPage from './components/Subjects/SubjectPage'; // New subject page component
import Paper_Upload from './pages/Paper_Upload/PaperUpload';
import NavbarMenuPanel from './components/NavbarMenuPanel/NavbarMenuPanel';

const App = () => {
  return (
    <StoreContextProvider>
        <Navbar />
        <NavbarMenuPanel/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact-us' element={<Contact_us />} />
          <Route path='/paper-upload' element={<Paper_Upload />}></Route>
          <Route path="/subject/:subjectName" element={<SubjectPage />} /> {/* Dynamic subject route */}
        </Routes>
      <Footer />
    </StoreContextProvider>
  );
};

export default App;
