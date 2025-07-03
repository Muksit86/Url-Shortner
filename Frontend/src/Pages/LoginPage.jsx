import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';


function LoginPage() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({ name: "", password: "" });

    const userNotFoundToast = () => toast.error('❌ User not found', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const wrongPasswordToast = () => toast.error('❌ Wrong Password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => (
            {
                ...prev, [name]: value,
            }
        ))
    }

    const validate = () => {
        const newErrors = {};
        if (!values.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!values.password) {
            newErrors.password = 'Password is required';
        } else if (values.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(values.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[0-9]/.test(values.password)) {
            newErrors.password = 'Password must contain at least one number';
        }

        return newErrors;
    }

    const verifyLogin = async () => {
        try {
            const respone = await axios.post(`${import.meta.env.BASE_URL}/auth/user/login`, values)

            if (respone.data.wrongPassword) {
                wrongPasswordToast()
                return false
            }

            if (respone.data) {
                localStorage.setItem('token', respone.data.token);
                localStorage.setItem('name', respone.data.name);

                return true
            }
        } catch (error) {
            if (error.response.data.wrongPassword) {
                wrongPasswordToast()
            } else {
                userNotFoundToast()
            }

            return false
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const validateErrors = validate()
        setErrors(validateErrors);
        if (Object.keys(validateErrors).length === 0) {
            const successs = await verifyLogin();

            // Submit form
            if (successs) {
                navigate("/home");
                setValues({ email: "", name: "", password: "" });
            }
        }
    }

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center gap-10 items-center">
                <div className="flex flex-col justify-center gap-10 py-10 bg-white shadow-2xs w-11/12        lg:w-4/12 lg:gap-25 md:w-6/12 md:gap-20">
                    <div>
                        <h1 className="text-4xl text-center font-semibold">Login</h1>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col items-center justify-center gap-7">
                            <div className="w-9/12 h-14 relative">
                                <input value={values.name} onChange={handleOnChange} className="w-full h-full pl-5 rounded-3xl bg-white shadow-lg outline-orange-500 !border-3" placeholder="Your username" name="name" />
                                {errors.name && <span className="text-red-500 text-sm ml-3">{errors.name}</span>}
                            </div>

                            <div className="w-9/12 h-14 relative">
                                <input value={values.password} onChange={handleOnChange} className="w-full h-full pl-5 rounded-3xl bg-white shadow-lg outline-orange-500 !border-3" placeholder="password" name="password" />
                                {errors.password && <span className="text-red-500 text-sm ml-3">{errors.password}</span>}
                            </div>


                            <div className="w-4/12 h-14 flex justify-center items-center shadow-sm">
                                <button type="submit" className="w-full h-14 bg-orange-500 text-white font-bold rounded-2xl cursor-pointer outline-0 hover:bg-orange-400 !border-3">
                                    LOGIN
                                </button>
                            </div>
                        </div>
                    </form>


                    <div className='flex flex-col justify-center items-center gap-2'>
                        <p className="text-center italic        lg:text-2xl md:text-xl">forgot your <Link to="/home" className="text-orange-500 cursor-pointer">password</Link></p>

                        <p className="text-center itali        lg:text-xl md:text-xl">or <Link className='text-orange-500 cursor-pointer' to="/registration">register</Link></p>
                    </div>


                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default LoginPage