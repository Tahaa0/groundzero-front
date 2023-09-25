import React, { useEffect, useState } from 'react';
import '../style/global.css';
import { directus } from '../services/directus';
import { readItems } from '@directus/sdk/rest';
import { Village } from './Village';
import { MissingPerson } from './MissingPerson';

const languageCode = 'fr';

const PanelLeft = ( { Id, type } ) => {
    const [info, setInfos] = useState([]);

    let request_table = type === 'village' ? 'villages' : 'missing_persons'

    useEffect(() => {
        const getInfo = async () => {
            try {
                const data = await directus.request(
                    readItems(request_table, {
                        deep: {
                            translations: {
                                _filter: {
                                    languages_code: { _eq: languageCode },
                                },
                            },
                        },
                        filter: {
                            id: { _eq: Id }
                        },
                        fields: ['*'],
                    })
                );
                setInfos(data);
            } catch (error) {
                console.error('An error occurred while fetching info:', error);
                window.notifyRed('An error occurred while fetching info.');
            }
        };

        getInfo();
    }, [info])

    return (
        <div className='panel'>
            {info && info[0] &&
                <div>
                    {
                        type === 'village' ? 
                        (<div>
                            <div className='village-heading'>
                                <h1>{info[0].name}</h1>
                            </div>
                            <Village name={info[0].name} location={info[0].googlemaplink} phone={info[0].phone} whatsapp={info[0].whatsapp} needs={info[0].needs} createdAt={info[0].date_created} />
                        </div>)
                        :
                        (<div>
                            <div className='person-heading'>
                                <h1>{info[0].name}</h1>
                            </div>
                            <MissingPerson name={info[0].name} villageName={info[0].villageName} location={info[0].googlemaplink} age={info[0].age} sex={info[0].gender} phone={info[0].phone} whatsapp={info[0].whatsapp} needs={info[0].needs} info={info[0].info} createdAt={info[0].date_created} />
                        </div>)
                    }
                </div>
            }      
        </div>
    )
}

export default PanelLeft;