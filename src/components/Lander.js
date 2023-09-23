import React, { useState, useEffect } from 'react';
import '../style/global.css';
import Btn from './Btn';
import languages from '../utils/languages';
import VillageCard from './VillageCard';
import MissingPersonCard from './MissingPersonCard';
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

async function fetchMissing(languageCode) {
  // Call the Directus API using the SDK using the locale of the frontend.
  const pages = await directus.request(
    readItems('missing_persons', {
      deep: {
        translations: {
          _filter: {
            languages_code: { _eq: languageCode },
          },
        },
      },
      filter: {
        status: { _eq: 'published' },
      },
      fields: ['*', { translations: ['*'] }],
      limit: 10,
    })
  );
  return pages;
}

const Lander = () => {
  const [isRtl, setIsRtl] = useState(false);
  const [activeTab, setActiveTab] = useState('villageBtn');
  const [villages, setVillages] = useState([]);
  const [missingPersonList, setMissingPersonList] = useState([]);
  const [currentLang, setCurrentLang] = useState({
    id: 'fr',
    label: 'Français',
  });
  const { t, i18n } = useTranslation();

  const handleTabChange = (activeBtn) => {
    if (activeBtn) {
      setActiveTab(activeBtn);
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
    if (activeTab === 'villageBtn') {
      fetchVillages(currentLang?.id ?? 'fr') //fallback language is fr.
        .then((villages) => {
          setVillages(villages);
        })
        .catch((error) => {
          window.notifyRed(t('An error occurred while fetching the villages.'));
          console.error(error);
        });
    } else {
      fetchMissing(currentLang?.id ?? 'fr') //fallback language is fr.
        .then((missingPersonList) => {
          // setMissingPersonList(missingPersonList);
          // setMissingPersonList([
          //   {
          //     name: 'Name Name Name ',
          //     villageName: 'villageName villageName',
          //     location: 'location location',
          //     age: 10,
          //     sex: 'Female',
          //     phone: '1234456677654',
          //     whatsapp: 'whatsapp whatsapp',
          //     info: ' info info info info info info info info info',
          //     createdAt: new Date(),
          //   },
          // ]);
        })
        .catch((error) => {
          window.notifyRed(
            t('Error occurred during the retrieval of missing persons.')
          );
          console.error(error);
        });
    }
  }, [currentLang, activeTab]);

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
            onClick={() => handleTabChange('villageBtn')}
            classes={`main-filter-btn ${
              activeTab === 'villageBtn' ? 'active-filter-btn' : ''
            }`}
          >
            {t('Village in need of rescue')}
          </Btn>
          <Btn
            type="button"
            onClick={() => handleTabChange('missingPersonBtn')}
            classes={`main-filter-btn ${
              activeTab === 'missingPersonBtn' ? 'active-filter-btn' : ''
            }`}
          >
            {t('Missing Persons')}
          </Btn>
        </div>
      </div>

      <div className="container">
        <div className="row gx-1">
          {activeTab === 'villageBtn'
            ? villages.map((village) => (
                <div className="col-4 col-md-4 col-12 h-100" key={village.id}>
                  <VillageCard
                    name={village.name}
                    location={village.googlemaplink}
                    phone={village.phone}
                    whatsapp={village.whatsapp}
                    needs={village.needs}
                    createdAt={village.date_created}
                  />
                </div>
              ))
            : missingPersonList.map((missingPerson) => (
                <div
                  className="col-4 col-md-4 col-12 h-100"
                  key={missingPerson.id}
                >
                  <MissingPersonCard missingPerson={missingPerson} />
                </div>
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lander;
