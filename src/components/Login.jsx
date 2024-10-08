import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Loader } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  // both register and handleSubmit are events
  // handleSubmit is not the exact function which is executed on the time of submission instead it requires
  // function which is to be executed
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        // user data always await because we are using a function
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
        toast.success("Login Successful")
        // link se click karna padta h and tab jaake woh khi jaega but navigate se programmatically khi bhej skte h
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg rounded-xl p-10 border bg-gradient-to-r from-slate-900 to-neutral-900 border-white/50`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            {/* <Logo width="100%" /> */}
          </span>
        </div>
        <h2 className="text-center text-2xl text-slate-200 font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-white/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-white/80 text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center"> {error} </p>}

        {/* form jab bhi submit hoga handleSubmit se hoga */}
        {isLoading ? (
          <div className="flex justify-center mt-8">
            <Loader />
          </div>
        ) : (
        <form onSubmit={handleSubmit(login)} className="mt-8 text-slate-300">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              // agli line syntax ki yaad karle
              {...register("email", {
                required: true,
                validate: {
                  // test(value) check karega valid h yaa nhi
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
              // register spread nhi karenge toh overwrite ho jaega
            />

            <Input
              label="Password: "
              placeholder="Enter your Password "
              type="password"
              {...register("password", {
                required: true,
              })}
              // register spread nhi karenge toh overwrite ho jaega
            />

            <Button type="submit" className="w-full text-slate-200 hover:bg-blue-700">
              Sign in
            </Button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}

export default Login;