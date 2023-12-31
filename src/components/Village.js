import React, { useEffect, useState } from 'react';
import '../style/global.css';
import api from '../services/api';
import { directus } from '../services/directus';
import { rest, readItems } from '@directus/sdk/rest';

// Initialize the SDK.
const languageCode = 'fr';

async function fetchVillages() {
  // Call the Directus API using the SDK using the locale of the frontend.
  const pages = await directus.request(
    readItems('villages', {
      deep: {
        translations: {
          _filter: {
            languages_code: { _eq: languageCode },
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

  // return pages[0];
  return pages;
}
const Village = ({ name, location, phone, whatsapp="", needs="", createdAt }) => {
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
        <div className="village">
            <div className='village-name'>
                Village : <span>{name}</span>
            </div>
            <div className='person-location'>
                Localisation : {(location === "")? (<small color='red'>Non spécifiée</small>) : (<a className='btn btn-success' href={location} target='_blank'>Voir</a>)}
            </div>
            <div className='village-needs'>
                Besoins et infos : <span>{needs}</span>
            </div>
            <div className='person-phone'>
                Téléphone : <a href={`tel:${phone}`}>{phone}</a>
            </div>
            <div className='person-whatsapp'>
                Whatsapp : <a href={`https://wa.me/${whatsapp}?text=Salam`}>{whatsapp}</a>
            </div>
            <div className='village-createdat'>
                Annoncé le : <span>{formatDateToFrench(createdAt)}</span>
            </div>
        </div>
    )
}


const Villages = () => {
    
    const [villages, setVillages] = useState([]);

    useEffect(() => {
        fetchVillages().then((villages) => {
            setVillages(villages);
        }).catch((error) => {
            window
                .notifyRed('An error occurred while fetching the villages.')
            console.error(error);
        });
    }, []);

    return(<>
            
            <div className="villages">
                {villages.map(village => (
                    <Village name={village.name} location={village.googlemaplink} phone={village.phone} whatsapp={village.whatsapp} needs={village.needs} createdAt={village.date_created} />
                ))}
            </div>
            </>
    )
}

export { Village, Villages} ;