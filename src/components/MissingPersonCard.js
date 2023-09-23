import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import Btn from './Btn';
import { useTranslation } from 'react-i18next';

// TODO: not finished yet.
const MissingPersonCard = ({ missingPerson }) => {
  const {
    name,
    villageName,
    location,
    age,
    sex,
    phone,
    whatsapp,
    info,
    createdAt,
  } = missingPerson;
  const { t } = useTranslation();

  const formatDateToFrench = (dateStr) => {
    if (!dateStr) {
      return '';
    }
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  return (
    <article className="m-2 p-3 card">
      <div className="d-flex align-items-center justify-content-between">
        <p className="card-label">
          {name?.length <= 25 ? name : `${name.slice(0, 25)}...`}
        </p>
        <p className="card-tag-filter">{t('Status')}</p>
      </div>
      <p className="card-location d-flex align-items-center justify-content-start gap-1">
        <IoLocationOutline />
        <span>Cassablancka, Marocco</span>
      </p>
      <p className="text-center card-needs">
        {info?.length <= 80 ? info : `${info.slice(0, 80)}...`}
      </p>
      <div className="card-timing d-flex align-items-center justify-content-between px-2">
        <p>1 {t('Person')}</p>
        <p className="card-timing-info">
          {t('Published')} {formatDateToFrench(createdAt)}
        </p>
      </div>
      <hr />
      {location ? (
        <div className="d-flex align-items-center justify-content-center">
          <Btn classes="card-location-btn">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <IoLocationOutline />
              <a
                className="card-location-link"
                href={location}
                target="_blank"
                rel="noreferrer"
              >
                <span>{t('View Location')}</span>
              </a>
            </div>
          </Btn>
        </div>
      ) : (
        <p className="text-center">{t('No Location')}</p>
      )}
      <hr />
      <div className="d-flex align-items-center justify-content-center gap-2">
        {phone && (
          <Btn classes="card-contact-btn">
            <div className="d-flex align-items-center justify-content-around gap-3">
              <BsTelephone />
              <a
                className="card-contact"
                href={`tel:${phone}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>{t('Telephone')}</span>
              </a>
            </div>
          </Btn>
        )}
        {whatsapp && (
          <Btn classes="card-contact-btn">
            <div className="d-flex align-items-center justify-content-around gap-3">
              <AiOutlineWhatsApp />
              <a
                className="card-contact"
                href={`https://wa.me/${whatsapp}?text=Salam`}
                target="_blank"
                rel="noreferrer"
              >
                <span>{t('WhatsApp')}</span>
              </a>
            </div>
          </Btn>
        )}
      </div>
    </article>
  );
};

export default MissingPersonCard;
