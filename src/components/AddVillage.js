import React, { useEffect, useState } from 'react';
import '../style/global.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { directus } from '../services/directus';
import { createItem } from '@directus/sdk';

const AddVillage = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [info, setInfo] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const cleanForm = () => {
    setName('');
    setLocation('');
    setInfo('');
    setPhone('');
    setWhatsapp('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone + whatsapp === '') {
      window.notifyRed('Besoin de spécifier numéro tel ou whatsapp');
    } else {
      try {
        const village = await directus.request(
          createItem('villages', {
            name: name,
            googlemaplink: location,
            needs: info,
            phone: phone,
            whatsapp: whatsapp,
          })
        );
        window.notify('Village ajouté avec succès.');
        cleanForm();
      } catch (error) {
        window.notifyRed("Erreur lors de l'ajout du village.");
      }
    }
  };

  return (
    <>
      <Container>
        <form className="add-village mt-40">
          <Row>
            <h1 className="form-tab-header">Déclarer un village en besoin</h1>
            <div className="d-flex justify-content-center text-center mb-4">
              <article>
                <p className="d-inline">
                  Comment ça marche? Aller sur google map, poser un pin 📍,
                  cliquer sur partager et copié le lien. Coller le lien dans
                  "lien google map". Les posts sans numéro de contacts (numéro
                  de télephone ou what's app) ne seront pas
                </p>
                <br />
                <p className="d-inline font-cairo">
                  كيف تعمل؟ اذهب إلى خريطة جوجل، ضع دبوس📍، ثم اضغط على مشاركة
                  وانسخ الرابط. الصق الرابط في "رابط خريطة جوجل". لن يتم
                  الموافقة على المنشورات التي لا تحتوي على رقم اتصال (رقم الهاتف
                  او الواتساب)
                </p>
              </article>
            </div>
            <Col md={12}>
              <div className="form-tab">
                {/* <div className='form-tab-title'>Nom du village :</div> */}
                <div className="form-tab-content">
                  <input
                    type="text"
                    className="form-tab-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom du village اسم القرية"
                  />
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="form-tab">
                {/* <div className='form-tab-title'>Localisation :</div> */}
                <div className="form-tab-content">
                  <input
                    type="text"
                    className="form-tab-input"
                    placeholder="Lien Google Maps رابط خرائط جوجل"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="form-tab">
                <div className="form-tab-title">
                  Besoins et informations : (facultatif)
                </div>
                <div className="form-tab-content">
                  <textarea
                    className="form-tab-input"
                    placeholder="Informations complémentaires مزيد من المعلومات"
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="form-tab">
                {/* <div className='form-tab-title'>Téléphone :</div> */}
                <div className="form-tab-content">
                  <input
                    type="text"
                    className="form-tab-input"
                    placeholder="Numéro de téléphone رقم الهاتف"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="form-tab">
                {/* <div className='form-tab-title'>Whatsapp : (facultatif)</div> */}
                <div className="form-tab-content">
                  <input
                    type="text"
                    className="form-tab-input"
                    placeholder="Whatsapp : (facultatif) واتس اب: (اختياري)"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} xs={6}>
              <div className="form-tab">
                <a href="/">
                  <div className="btn btn-success retour"> {'< Retour'}</div>
                </a>
              </div>
            </Col>
            <Col md={6} xs={6}>
              <div className="form-tab">
                <button
                  type="submit"
                  className="btn btn-default form-tab-submit"
                  onClick={handleSubmit}
                >
                  Soumettre
                </button>
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

export default AddVillage;
