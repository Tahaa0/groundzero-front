import React, { useState } from 'react';
import '../style/global.css';
import api from '../services/api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const AddMissingPerson = () => {

    const [name, setName] = useState('');
    const [villageName, setVillageName] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [info, setInfo] = useState('');

    const cleanForm = () => {
        setName('');
        setVillageName('');
        setLocation('');
        setAge('');
        setSex('');
        setPhone('');
        setWhatsapp('');
        setInfo('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        api.post('/missingperson', {
            name: name,
            village_name: villageName,
            
            /*location: {
                type: 'Point',
                coordinates: location.split(',').map(Number).reverse()
            },*/
            googlemaplink: location,
            age: Number(age),
            gender: sex,
            phone: phone,
            whatsapp: whatsapp,
            info: info
        }).then(res => {
            window.notify('Personne disparue ajoutée avec succès.');
            cleanForm();
        }).catch(err => {
            window.notifyRed('Erreur lors de l\'ajout de la personne disparue.');
        })
    }

    return (
        <>
        <Container>
            <form className="add-missing-person mt-40">
            <Row>
            <h1 className='form-tab-header'>Lancer un avis de recherche</h1>
                <Col md={6}>
                <div className='form-tab'>
                    {/* <div className='form-tab-title'>Nom de la personne (obligatoire) :</div> */}
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' value={name} onChange={e => setName(e.target.value)} placeholder='Nom de la personne  (obligatoire)' />
                    </div>
                </div>
                </Col>

                <Col md={6}>
                <div className='form-tab'>
                    {/* <div className='form-tab-title'>Nom du village :</div> */}
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' value={villageName} onChange={e => setVillageName(e.target.value)} placeholder='Nom du village' />
                    </div>
                </div>
                </Col>

                <Col md={12}>
                <div className='form-tab'>
                    {/* <div className='form-tab-title'>Localisation :</div> */}
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' placeholder='Lien Google Maps ' value={location} onChange={e => setLocation(e.target.value)} />
                    </div>
                </div>
                </Col>

                <Col md={6}>
                <div className='form-tab'>
                    {/* <div className='form-tab-title'>Age :</div> */}
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' placeholder='Age' value={age} onChange={e => setAge(e.target.value)} />
                    </div>
                </div>
                </Col>
                <Col md={6}>

                <div className='form-tab'>
                    {/* <div className='form-tab-title'>Sexe :</div> */}
                    <div className='form-tab-content'>
                        <select>
                            <option value="M">Homme/Garçon</option>
                            <option value="F">Femme/fille</option>
                        </select>
                    </div>
                </div>
                </Col>
                <Col md={6}>
                <div className='form-tab'>
                    {/* <div className='form-tab-title'>Téléphone (obligatoire) :</div> */}
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' placeholder='Téléphone (obligatoire)' value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                </div>
                </Col>
                <Col md={6}>
                <div className='form-tab'>
                    {/* <div className='form-tab-title'>Whatsapp :</div> */}
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' placeholder='Whatsapp' value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                    </div>
                </div>
                </Col>
                <Col md={6} xs={6}>
                <div className='form-tab'>
                    <a href='/'><div className='btn btn-success retour'> {'< Retour'}</div></a>
                </div>
                </Col>
                <Col md={6} xs={6}>
                <div className='form-tab'>
                    <button type='submit' className='btn btn-default form-tab-submit' onClick={handleSubmit}>Soumettre</button>
                </div>
                </Col>

            </Row>
              
                
               
              
              
             

               
                
            </form>
            </Container>
        </>
    )
}

export default AddMissingPerson;
