import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import Home from './pages/home/Home';
import MyState from './context/data/MyState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import AllProducts from './pages/allproducts/AllProducts';
// testing
// another test without -u origin main
const App = () => {
  return (
    <>
    <MyState>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productinfo/:id" element={<ProductInfo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addproduct" element={<ProtectedRouteForAdmin><AddProduct /></ProtectedRouteForAdmin>} />
        <Route path="/updateproduct" element={<ProtectedRouteForAdmin><UpdateProduct /></ProtectedRouteForAdmin>} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
      <ToastContainer />
    </Router>
    </MyState>
    </>
  )
}

export default App

export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem('currentUser')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}

export const ProtectedRouteForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  console.log(admin.user.email)
  if (admin.user.email === 'knupadhyay784@gmail.com') {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}