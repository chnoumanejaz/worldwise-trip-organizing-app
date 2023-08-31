import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CitiesProvider } from './contexts/CitiesContext';

import HomePage from './pages/HomePage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path="Product" element={<Product />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;
