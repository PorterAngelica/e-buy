import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Home from "./pages/home/Home"
import Seller from './pages/seller/Seller'
import Item from './pages/item/Item'
import AddCategory from './pages/addCategory/AddCategory'
import { useContext } from 'react'
// import { AuthContext } from './context/AuthContext'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from './pages/profile/Profile'
import Update from './pages/update/Update'
import ViewItem from './pages/viewItem/ViewItem'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'

function App() {
  const queryClient = new QueryClient();


  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={  <Login /> } />
        <Route path='/register' element={  <Register /> } />
        <Route path='/home' element={ <Home /> } />
        <Route path='/admin' element={<Seller/> } />
        <Route path='/addProduct' element={ <Item /> } />
        <Route path='/addCategory' element={ <AddCategory /> } />
        <Route path='/update' element={< Update />} />
        <Route path='/profile/:id' element={ < Profile/> } />
        <Route path='/viewItem/:id' element={  <ViewItem/> } />
        <Route path='/shoppingCart' element={ <ShoppingCart/> } />
      </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
