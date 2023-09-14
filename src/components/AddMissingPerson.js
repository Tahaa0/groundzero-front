import React, { useState } from 'react';
import '../style/global.css';
import { directus } from '../services/directus';
import { createItem } from '@directus/sdk';

const AddMissingPerson = () => {

    const [name, setName] = useState('');
    const [villageName, setVillageName] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('male');
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
        try {
            const missing = await directus.request(createItem('missing_persons', {
                name: name,
                village_name: villageName,
                location: {
                    type: 'Point',
                    coordinates: location.split(',').map(Number).reverse()
                },
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
            }));
            window.notify('Personne disparue ajoutée avec succès.');
            cleanForm();
        } catch (error) {
            window.notifyRed('Erreur lors de l\'ajout de la personne disparue.');
        }
    }

    return (
        <>
            <form className="add-missing-person">
                <div className='form-tab-header'>
                    Lancer un avis de recherche
                </div>
                <div className='form-tab'>
                    <div className='form-tab-title'>Nom de la personne (obligatoire) :</div>
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' value={name} onChange={e => setName(e.target.value)} placeholder='Nom de la personne' />
                    </div>
                </div>
                <div className='form-tab'>
                    <div className='form-tab-title'>Nom du village :</div>
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' value={villageName} onChange={e => setVillageName(e.target.value)} placeholder='Nom du village' />
                    </div>
                </div>
                <div className='form-tab'>
                    <div className='form-tab-title'>Localisation (obligatoire) :</div>
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' placeholder='Lien Google Maps ' value={location} onChange={e => setLocation(e.target.value)} />
                    </div>
                </div>
                <div className='form-tab'>
                    <div className='form-tab-title'>Age :</div>
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' placeholder='Age' value={age} onChange={e => setAge(e.target.value)} />
                    </div>
                </div>
                <div className='form-tab'>
                    <div className='form-tab-title'>Sexe :</div>
                    <div className='form-tab-content'>
                        <select value={sex} onChange={e => setSex(e.target.value)}>
                            <option value="male">Homme/Garçon</option>
                            <option value="female">Femme/fille</option>
                            <option value="unknown">Non identifié(e)</option>
                        </select>
                    </div>
                </div>
                <div className='form-tab'>
                    <div className='form-tab-title'>Téléphone (obligatoire) :</div>
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' placeholder='Téléphone' value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                </div>
                <div className='form-tab'>
                    <div className='form-tab-title'>Whatsapp :</div>
                    <div className='form-tab-content'>
                        <input type='text' className='form-tab-input' placeholder='Whatsapp' value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                    </div>
                </div>
                <div className='form-tab-buttons'>
                    <button type='submit' className='form-tab-button' onClick={handleSubmit}>Soumettre</button>
                    <a href='/' className='form-tab-button'><div className='button'>Retour</div></a>
                </div>
            </form>
        </>
    )
}

export default AddMissingPerson;
