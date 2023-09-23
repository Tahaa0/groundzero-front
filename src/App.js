// import React from 'react';
// import AddMissingPersonLander from './components/AddMissingPersonLander';
// import AddVillageLander from './components/AddVillageLander';
// import Lander from './components/Lander';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useTranslation, I18nextProvider } from 'react-i18next';

// function App() {
//   const { i18n } = useTranslation();

//   return (
//     <I18nextProvider i18n={i18n}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Lander />} />
//           <Route path="/add-village" element={<AddVillageLander />} />
//           <Route path="/add-missing" element={<AddMissingPersonLander />} />
//         </Routes>
//       </Router>
//     </I18nextProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from './translations/i18n'; // Import your i18n configuration

import AddMissingPersonLander from './components/AddMissingPersonLander';
import AddVillageLander from './components/AddVillageLander';
import Lander from './components/Lander';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      {' '}
      {/* Wrap your entire app with I18nextProvider */}
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
