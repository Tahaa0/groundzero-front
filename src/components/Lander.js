import React, { useState } from 'react';
import '../style/global.css';
// import MapComponent from './Map';
// import SidebarLeft from './SidebarLeft';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Btn from './Btn';
import languages from '../utils/languages';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import searchIc from '../assets/images/search-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  // faCoffee,
  // faTea,
  // faBeer,
} from '@fortawesome/free-solid-svg-icons';
import { faCoffee, faBeer } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Lander = () => {
  const [activeTab, setActiveTab] = useState('villages'); // Default to 'villages' tab
  const [isRtl, setIsRtl] = useState(false);
  const [activeFilter, setActiveFilter] = useState('villageBtn');

  const handleShare = () => {
    console.log('TODO handleShare');
  };

  const handleFilterChange = (activeBtn) => {
    if (activeBtn) {
      setActiveFilter(activeBtn);
    }
  };

  const handleLangChange = (selectedLang) => {
    if (selectedLang === 'العربية') {
      setIsRtl(true);
    } else {
      setIsRtl(false);
    }
  };

  return (
    <div className={`${isRtl ? 'rtl-dir' : ''}`}>
      <div className="hero">
        <header className="container">
          <div className="row">
            <div className="col-6">
              <div className="logo">
                <Link to="/">
                  <img className="logo-img" src={logo} alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center mt-4rem justify-content-end gap-5">
                <div className="lang-container">
                  <select onChange={(e) => handleLangChange(e.target.value)}>
                    {languages.map((lang) => (
                      <option key={lang.id}>{lang.label}</option>
                    ))}
                  </select>
                </div>
                <div className="faq d-flex aling-items-center gap-3">
                  <Btn classes="share-btn d-none d-sm-block">Share</Btn>
                  <Btn classes="faq-btn">?</Btn>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center d-flex flex-column justify-content-center align-items-center">
            <h1 className="hero-center-heading">
              Supporting Local efforts on the grouns
            </h1>
            <p className="hero-center-text">
              Signaler personnes disparitu, informer des villages dans le
              besoins. Les posts sont manuellement confirmé par les modérateurs
              avant d'apparaitre sur le site. Merci de partager en masse.
            </p>
            <div className="d-flex align-items-center gap-4 mt-3 flex-column flex-md-row">
              <Btn classes="hero-center-btn" type="button">
                Lancer un avis de recherche
              </Btn>
              <Btn classes="hero-center-btn" type="button">
                Déclarer un village à secourir
              </Btn>
            </div>
          </div>
        </header>
      </div>
      <div className="text-center d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex align-items-center gap-2 mt-3 justify-content-between main-filter-bg">
          <Btn
            type="button"
            onClick={() => handleFilterChange('villageBtn')}
            classes={`main-filter-btn ${
              activeFilter === 'villageBtn' ? 'active-filter-btn' : ''
            }`}
          >
            Village a secourir
          </Btn>
          <Btn
            type="button"
            onClick={() => handleFilterChange('missingPersonBtn')}
            classes={`main-filter-btn ${
              activeFilter === 'missingPersonBtn' ? 'active-filter-btn' : ''
            }`}
          >
            Personnes Disparus
          </Btn>
        </div>
      </div>

      <div className="container">
        <div className="container">
          <div className="container">
            <div className="mt-4 d-flex justify-content-end flex-column flex-md-row">
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="recherche"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex justify-content-end align-items-center">
                  <select className="filter-">
                    <option value="consectetur">
                      <span className="my-span">name</span>
                    </option>
                    <option value="beatae">beatae</option>
                    <option value="ipsum">ipsum</option>
                  </select>
                  <select>
                    <option value="quisquam">quisquam</option>
                    <option value="adipisicing">adipisicing</option>
                    <option value="libero">libero</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lander;
