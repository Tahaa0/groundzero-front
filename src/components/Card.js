import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import Btn from './Btn';

const Card = () => {
  return (
    <article className="m-2 p-3 card">
      <div className="d-flex align-items-center justify-content-between">
        <p className="card-label">Douar Nom</p>
        <p className="card-tag-filter">Status</p>
      </div>
      <p className="card-location d-flex align-items-center justify-content-start gap-1">
        <IoLocationOutline />
        <span>Cassablancka, Marocco</span>
      </p>
      <p className="text-center">
        The expecting mother, is currently in labor and requires immediate
        transportation to hospital, which is located approximately 12 km from
        our current location.
      </p>
      <div className="card-timing d-flex align-items-center justify-content-between px-2">
        <p>1 Person</p>
        <p className="card-timing-info">Published 23 mins ago</p>
      </div>
      <hr />
      <div className="d-flex align-items-center justify-content-center">
        <Btn classes="card-location-btn">
          <div className="d-flex align-items-center justify-content-around gap-3">
            <IoLocationOutline />
            <span>Voir Localsion</span>
          </div>
        </Btn>
      </div>
      <hr />
      <div className="d-flex align-items-center justify-content-center gap-2">
        <Btn classes="card-contact-btn">
          <div className="d-flex align-items-center justify-content-around gap-3">
            <BsTelephone />
            <span>Telephone</span>
          </div>
        </Btn>
        <Btn classes="card-contact-btn">
          <div className="d-flex align-items-center justify-content-around gap-3">
            <AiOutlineWhatsApp />
            <span>WhatsApp</span>
          </div>
        </Btn>
      </div>
    </article>
  );
};

export default Card;
