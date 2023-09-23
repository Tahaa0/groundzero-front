import React, { useState, useEffect } from 'react';
import '../style/global.css';
import Btn from './Btn';
import languages from '../utils/languages';
import Card from './Card';
import { directus } from '../services/directus';
import { readItems } from '@directus/sdk/rest';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import Header from './Header';

async function fetchVillages(currentLang) {
  // Call the Directus API using the SDK using the locale of the frontend.
  const pages = await directus.request(
    readItems('villages', {
      deep: {
        translations: {
          _filter: {
            languages_code: { _eq: currentLang },
          },
        },
      },
      filter: {
        status: { _eq: 'approved' },
      },
      fields: ['*', { translations: ['*'] }],
      limit: 10,
    })
  );

  return pages;
}

const Lander = () => {
  const [isRtl, setIsRtl] = useState(false);
  const [activeFilter, setActiveFilter] = useState('villageBtn');
  const [villages, setVillages] = useState([]);
  const [currentLang, setCurrentLang] = useState({
    id: 'fr',
    label: 'Français',
  });
  const { t, i18n } = useTranslation();

  const handleFilterChange = (activeBtn) => {
    if (activeBtn) {
      setActiveFilter(activeBtn);
    }
  };

  const handleLangChange = (selectedLang) => {
    const lang = languages.find((l) => l.label === selectedLang);
    if (lang) {
      setCurrentLang(lang);
      localStorage.setItem('currentLang', lang.id);
      i18n.changeLanguage(lang.id);
    }
    if (selectedLang === 'العربية') {
      setIsRtl(true);
    } else {
      setIsRtl(false);
    }
  };

  useEffect(() => {
    fetchVillages(currentLang?.id ?? 'fr') //fallback language is fr.
      .then((villages) => {
        setVillages(villages);
      })
      .catch((error) => {
        window.notifyRed(t('An error occurred while fetching the villages.'));
        console.error(error);
      });
  }, [currentLang]);

  useEffect(() => {
    const setDefaultCurrentLang = () => {
      localStorage.setItem(
        'currentLang',
        localStorage.getItem('currentLang') ?? currentLang.id
      );
    };

    setDefaultCurrentLang();
  }, []);

  return (
    <div className={`${isRtl ? 'rtl-dir' : ''}`}>
      <div className="hero">
        <Header handleLangChange={handleLangChange} t={t} />
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
            {t('Village in need of rescue')}
          </Btn>
          <Btn
            type="button"
            onClick={() => handleFilterChange('missingPersonBtn')}
            classes={`main-filter-btn ${
              activeFilter === 'missingPersonBtn' ? 'active-filter-btn' : ''
            }`}
          >
            {t('Missing Persons')}
          </Btn>
        </div>
      </div>

      <div className="container">
        <div className="row gx-1">
          {villages.map((village) => (
            <div className="col-4 col-md-4 col-12 h-100" key={village.id}>
              <Card
                name={village.name}
                location={village.googlemaplink}
                phone={village.phone}
                whatsapp={village.whatsapp}
                needs={village.needs}
                createdAt={village.date_created}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lander;
