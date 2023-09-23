import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import Btn from './Btn';
import languages from '../utils/languages';

const Header = ({ handleLangChange, t }) => {
  return (
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

      <div className="text-center d-flex flex-column justify-content-center align-items-center mt-5">
        <h1 className="hero-center-heading">
          {t('Supporting Local efforts on the ground')}
        </h1>
        <p className="hero-center-text">
          {t(
            'Report missing persons, inform villages in need. Posts are manually confirmed by moderators before appearing on the site. Please share widely.'
          )}
        </p>
        <div className="d-flex align-items-center gap-4 mt-5 flex-column flex-md-row">
          <Btn classes="hero-center-btn" type="button">
            {t('Launch a search alert')}
          </Btn>
          <Btn classes="hero-center-btn" type="button">
            {t('Declare a village in need of rescue')}
          </Btn>
        </div>
      </div>
    </header>
  );
};

export default Header;
