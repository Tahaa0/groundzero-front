import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './translations/i18n';

import AddMissingPersonLander from './components/AddMissingPersonLander';
import AddVillageLander from './components/AddVillageLander';
import Lander from './components/Lander';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<Lander />} />
          <Route path="/add-village" element={<AddVillageLander />} />
          <Route path="/add-missing" element={<AddMissingPersonLander />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
