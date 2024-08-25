import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const logoutHandler = () => {
        setLoading(true)
        authService.logout()
        .then(() => {
            dispatch(logout())
            navigate('/login');
        })
        .finally(() => {
            setLoading(false)
        })
    }

    if(loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-slate-900 to-neutral-900 z-50">
                <Loader />
            </div>
        )
    }

  return (
      <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
      >Logout</button>
  )
}

export default LogoutBtn