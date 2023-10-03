import React, { useState } from 'react';
import '../style/global.css';
import MapComponent from './Map';
import SidebarLeft from './SidebarLeft';
import AssociationPopUp from './Association';
import AddVillage from './AddVillage';
import { Villages } from './Village';
import { MissingPersons } from './MissingPerson';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from './Footer';

const Lander = () => {
    const [activeTab, setActiveTab] = useState('villages');  // Default to 'villages' tab

    return (
        <>
            <SidebarLeft />
            <Container>
            <div className='mt-40'>
                
                    <Row>
                        <Col md={6} xs={6}>
                        <a href='/add-missing'><div className='button big mt'>Lancer un avis de recherche</div></a>

                        </Col>

                        <Col md={6} xs={6}>
                        <a href='/add-village'><div className='button big mt'>Déclarer un village à secourir</div></a>
                            </Col>
                    </Row>
            
                    <Row>
                    <Col md={12} xs={12}>
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
                {activeTab === 'villages' && <Villages />}
                {activeTab === 'missingPersons' && <MissingPersons />}
                </Col>
                </Row>
                <Footer/>
            </div>
            </Container>
        </>
    );
}

export default Lander;
