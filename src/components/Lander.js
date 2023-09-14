import React, { useState } from 'react';
import '../style/global.css';
import MapComponent from './Map';
import SidebarLeft from './SidebarLeft';
import AssociationPopUp from './Association';
import AddVillage from './AddVillage';
import { Villages } from './Village';
import { MissingPersons } from './MissingPerson';

const Lander = () => {
    const [activeTab, setActiveTab] = useState('villages');  // Default to 'villages' tab

    return (
        <>
            <SidebarLeft />
            <div className='lander'>
                <a href='/add-missing'><div className='button big mt'>Lancer un avis de recherche</div></a>
                <a href='/add-village'><div className='button big'>Déclarer un village à secourir</div></a>
                <div className='tabs'>    
                    <div 
                        className={`tab ${activeTab === 'villages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('villages')}
                    >
                        Villages à secourir
                    </div>
                    <div 
                        className={`tab ${activeTab === 'missingPersons' ? 'active' : ''}`}
                        onClick={() => setActiveTab('missingPersons')}
                    >
                        Personnes disparues
                    </div>
                </div>
                <div className='villages'>
                    Nous traitons actuellement vos demandes, nous les afficherons ici bientôt.
                    <br></br>
                    <br></br>
                    Equipe GroundZero
                    <br></br>
                    Contact : sami.mersel@gmail.com
                </div>
                
                {/*activeTab === 'villages' && <Villages />}
                {activeTab === 'missingPersons' && <MissingPersons />*/}
            </div>
        </>
    );
}

export default Lander;
