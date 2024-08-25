import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Loader} from './index'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import { toast } from "react-toastify";

function Signup() {

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [isLoading, setIsLoading] = useState(false);
    
    const create = async(data) => {
        setError("")
        setIsLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if(userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                navigate("/")
                toast.success("User Created Successful")
            }
        } catch (error) {
            setError(error.message)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg  rounded-xl p-10 border bg-gradient-to-r from-slate-900 to-neutral-900 border-white/50`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        {/* <Logo width="100%" /> */}
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-slate-200">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-white/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary text-white/80 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                
                {isLoading ? (
                    <div className="flex justify-center mt-8">
                        <Loader />
                    </div>
                    ) : (
                <form onSubmit={handleSubmit(create)} className='text-slate-300 mt-10'>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
                )}
            </div>

    </div>
  )
}

export default Signup