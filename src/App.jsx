import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth';
import {login, logout} from "./store/authSlice"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import {Outlet} from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState("true");
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          console.log("userData ye lo", userData)
          dispatch(login({userData}));
        } else {
          dispatch(logout({userData}))
        }
      })
      .finally(() => setLoading(false)) // it will surely run
  }, []);
  
  return !loading ? (
    <div className="flex min-h-screen flex-col justify-between"> 
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
    </div>
  ) : (null)
}

export default App
