import React, { useState } from 'react';
import ProfileInfo from '../../components/Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import '../Navbar/Navbar.css';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const token = localStorage.getItem("token");

  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for menu toggle

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      {token && (
        <>
          {/* Search Bar - Always Visible */}
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />

          {/* Hamburger Menu for Profile Info */}
          <div className="mobile-nav">
            <button onClick={toggleMenu} className="hamburger-icon">
              ☰
            </button>
            {isMenuOpen && (
              <div className="menu">
                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
              </div>
            )}
          </div>

          {/* Desktop View for Profile Info */}
          <div className="desktop-nav">
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
