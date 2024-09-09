import React from 'react';
import { Route, Routes} from 'react-router-dom';
import PrivateRoute from './components/privateRoute'
import HomePage from './pages/homePage';
import AllPharmacies from './pages/listPharmaciesPage'
import PharmacyProducts from './pages/productInpharmacyPage'
import LoginPage from './pages/loginPage'
import SignupPage from './pages/registerPage'
import UserDetailPage from './pages/userDetails'
import PharmacyDetailPage from './pages/detaiPharmacyPage'
import OrdersList from './pages/orders'
import UpdateUser from './pages/updateUser'


const AppRoutes = ()=> {
  return (

    <Routes>
      {/* Route publique pour la page de login */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/all-pharmacies" element={<AllPharmacies />} />
      <Route path="/list-product/:id" element={<PharmacyProducts />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/users/:id" element={<UserDetailPage />} />
      <Route path="/pharmacy/:id" element={<PharmacyDetailPage />} />
      <Route path="/user-orders" element= {<PrivateRoute element={<OrdersList/>}/>} />
      <Route path="/update-user/:id" element={<UpdateUser />} />


   
      







     




    </Routes>

  );
}

export default AppRoutes;