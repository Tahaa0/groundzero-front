import React, { useState } from 'react';
import '../style/global.css';
import Btn from './Btn';
import languages from '../utils/languages';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import Card from './Card';
import SocialLink from './SocialLink';

const Lander = () => {
  const [isRtl, setIsRtl] = useState(false);
  const [activeFilter, setActiveFilter] = useState('villageBtn');

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
        <div className="d-flex align-items-center gap-2 my-3 justify-content-between main-filter-bg">
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
        <div className="row gx-1">
          <div className="col-md-4 col-sm-6 col-12">
            <Card />
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <Card />
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <Card />
          </div>
        </div>
        <div className="row gx-1">
          <div className="col-md-4 col-sm-6 col-12">
            <Card />
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <Card />
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <Card />
          </div>
        </div>
        <div className="row gx-1">
          <div className="col-md-4 col-sm-6 col-12">
            <Card />
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <Card />
          </div>
          <div className="col-md-4 col-sm-6 col-12">
            <Card />
          </div>
        </div>
      </div>

      <footer>
        <div className="footer">
          <div className="container text-center d-flex justify-content-center align-items-center h-50">
            <div className="w-50">
              <div>
                Merci aux contributeurs Ahmed, Adib, Mouad....
                <br />
                Contactl:{' '}
                <a
                  className="text-white contact-email"
                  href="mailto:sami.mersel@gmail.com"
                >
                  sami.mersel@gmail.com
                </a>
                <br />
                <br />
                <p>Proudly Open Source</p>
                <div className="d-flex justify-content-center align-items-center">
                  <ul className="social-list d-flex gap-4">
                    <SocialLink
                      iconClass="fa-brands fa-instagram"
                      url="https://instagram.com/groundzeromaroc?igshid=NGVhN2U2NjQ0Yg=="
                    />
                    <SocialLink
                      iconClass="fa-brands fa-github"
                      url="https://github.com/Tahaa0/groundzero-front"
                    />
                    <SocialLink
                      iconClass="fa-brands fa-twitter"
                      url="https://twitter.com/groundzeroma?t=d_LX8KXOKWwFZ2JPdqRvbg&s=09"
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Lander;
