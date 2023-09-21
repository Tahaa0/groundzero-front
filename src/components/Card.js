import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import Btn from './Btn';

const Card = ({
  name,
  location,
  phone,
  whatsapp = '',
  needs = '',
  createdAt,
}) => {
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
        <p className="card-tag-filter">Status</p>
      </div>
      <p className="card-location d-flex align-items-center justify-content-start gap-1">
        <IoLocationOutline />
        <span>Cassablancka, Marocco</span>
      </p>
      <p className="text-center card-needs">
        {needs?.length <= 80 ? needs : `${needs.slice(0, 80)}...`}
      </p>
      <div className="card-timing d-flex align-items-center justify-content-between px-2">
        <p>1 Person</p>
        <p className="card-timing-info">
          Published {formatDateToFrench(createdAt)}
        </p>
      </div>
      <hr />
      {location ? (
        <div className="d-flex align-items-center justify-content-center">
          <Btn classes="card-location-btn">
            <div className="d-flex align-items-center justify-content-around gap-3">
              <IoLocationOutline />
              <a
                className="card-location-link"
                href={location}
                target="_blank"
                rel="noreferrer"
              >
                <span>Voir Localisation</span>
              </a>
            </div>
          </Btn>
        </div>
      ) : (
        <p className="text-center">Pas de localisation</p>
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
                <span>Telephone</span>
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
                <span>WhatsApp</span>
              </a>
            </div>
          </Btn>
        )}
      </div>
    </article>
  );
};

export default Card;
