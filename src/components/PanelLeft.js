import React, { useEffect, useState } from 'react';
import '../style/global.css';
import { directus } from '../services/directus';
import { readItems } from '@directus/sdk/rest';
import { Village } from './Village';

const languageCode = 'fr';

const PanelLeft = ( { IdVillage } ) => {
    const [village, setVillage] = useState([]);

    useEffect(() => {
        const getVillage = async () => {
            try {
                const villageData = await directus.request(
                    readItems('villages', {
                        deep: {
                            translations: {
                                _filter: {
                                    languages_code: { _eq: languageCode },
                                },
                            },
                        },
                        filter: {
                            geolocation: { _nnull: true },
                            id: { _eq: IdVillage }
                        },
                        fields: ['*'],
                    })
                );
                setVillage(villageData);
            } catch (error) {
                console.error('An error occurred while fetching info:', error);
                window.notifyRed('An error occurred while fetching info.');
            }
        };

        getVillage();
    }, [village])

    return (
        <div className='panel'>
            {village && village[0] &&
            (<div>
                <div className='village-heading'>
                    <h1>{village[0].name}</h1>
                </div>
                <Village name={village[0].name} location={village[0].googlemaplink} phone={village[0].phone} whatsapp={village[0].whatsapp} needs={village[0].needs} createdAt={village[0].date_created} />
            </div>)}
        </div>
    )
}

export default PanelLeft;