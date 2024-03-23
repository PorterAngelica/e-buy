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

function App() {

  // const { currentUser } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={  <Login /> } />
        <Route path='/register' element={  <Register /> } />
        <Route path='/home' element={ <Home /> } />
        <Route path='/admin' element={ <Seller/> } />
        <Route path='/addProduct' element={ <Item /> } />
        <Route path='/addCategory' element={ <AddCategory /> } />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
