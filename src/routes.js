import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';

import HomePage from './pages/homePage';
import AllPharmacies from './pages/listPharmaciesPage'
import PharmacyProducts from './pages/productInpharmacyPage'


const AppRoutes = ()=> {
  return (

    <Routes>
      {/* Route publique pour la page de login */}
      <Route path="/" element={<HomePage />} />
      <Route path="/all-pharmacies" element={<AllPharmacies />} />
      <Route path="/:id/list-product" element={<PharmacyProducts />} />

   
      







     




    </Routes>

  );
}

export default AppRoutes;