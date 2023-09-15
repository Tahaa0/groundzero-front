import React, { useEffect, useState } from 'react';
import '../style/global.css';
import api from '../services/api';
import { directus } from '../services/directus';
import { readItems } from '@directus/sdk/rest';

// Initialize the SDK.
const languageCode = 'fr';

async function fetchMissing() {
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
  
    // return pages[0];
    return pages;
  }

const MissingPerson = ({ name, villageName, location, age, sex, phone, whatsapp="", info="", createdAt }) => {
    const formatDateToFrench = (dateStr) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        }).format(date);
    };

    return(
        <div className="missing-person">
            <div className='person-name'>
                Nom : <span>{name}</span>
            </div>
            <div className='person-village'>
                Village : <span>{villageName}</span>
            </div>
            <div className='person-location'>
                Localisation : <a className='btn btn-success' href={location} target='_blank'>Voir</a>
            </div>
            <div className='person-age'>
                Age : <span>{age}</span>
            </div>
            <div className='person-sex'>
                Sexe : <span>{sex}</span>
            </div>
            <div className='person-phone'>
                Téléphone : <a href={`tel:${phone}`}>{phone}</a>
            </div>
            <div className='person-whatsapp'>
                Whatsapp : <a href={`https://wa.me/${whatsapp}?text=Salam`}>{whatsapp}</a>
            </div>
            <div className='person-info'>
                Infos : <span>{info}</span>
            </div>
            <div className='person-createdat'>
                Annoncé le : <span>{formatDateToFrench(createdAt)}</span>
            </div>
        </div>
    )
}

const MissingPersons = () => {
    
        const [missingPersons, setMissingPersons] = useState([]);
    
        useEffect(() => {
            fetchMissing().then(missing => {
                setMissingPersons(missing);
            }).catch(err => {
                window.notifyRed('Erreur lors de la récupération des personnes disparues.');
            })
        }, [])
    
        return (
            <>
                <div className="missing-persons">
                    {missingPersons.map(person => (
                        <MissingPerson 
                            name={person.name} 
                            villageName={person.villageName} 
                            location={person.googlemaplink} 
                            age={person.age}
                            sex={person.gender}
                            phone={person.phone}
                            whatsapp={person.whatsapp}
                            info={person.info}
                            createdAt={person.date_created} 
                        />
                    ))}
                </div>
            </>
        )
}

export { MissingPerson, MissingPersons };
