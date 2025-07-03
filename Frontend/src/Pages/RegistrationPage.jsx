import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';

function RegistrationPage() {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({ email: "", name: "", password: "" })
    const navigate = useNavigate();

    const notify = () => toast.error('❌ Username already used', {
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
                ...prev, [name]: value
            }
        ))
    }

    const validate = () => {
        const newErrors = {};
        if (!values.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!checkInputFields(values.email, values.name)) {
            newErrors.name = 'Username is already taken';
        } else if (values.name.trim().length < 5) {
            newErrors.name = 'Username Must 5 letters long';
        } else if (!/^[a-zA-Z]/.test(values.name.trim())) {
            newErrors.name = 'Username Must Start with a Letter';
        }

        if (!values.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = 'Email is invalid';
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

    const checkInputFields = async (email, name) => {
        const res = await axios.post(`${import.meta.env.BASE_URL}/auth/user/inputfeilds`, { email, name })

        if (res.data.available == true) {
            return true
        } else {
            notify()
            return true
        }

    }

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            // Handle login logic here
            const validateErrors = validate()
            setErrors(validateErrors);

            if (Object.keys(validateErrors).length === 0) {
                // Submit form
                await axios.post(`${import.meta.env.BASE_URL}/auth/user/registration`, values)
                navigate("/login");

                // Optionally reset form
                setValues({ email: "", name: "", password: "" });
            }
        } catch (error) {
            console.error("Error", error)
        }
        // Navigate to home page after login 
    }



    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col justify-center gap-10 py-10 bg-white shadow-2xs w-10/12       lg:w-4/12 lg:gap-25 md:w-6/12 md:gap-20">
                    <div>
                        <h1 className="text-4xl text-center font-semibold">Registration</h1>
                    </div>

                    <form onSubmit={handleRegistration} autoComplete="off">
                        <div className="flex flex-col items-center justify-center gap-10">
                            <div className="w-10/12 h-14 relative">
                                <input value={values.email} onChange={handleOnChange} className="w-full h-full pl-5 rounded-3xl bg-white shadow-lg outline-orange-500 !border-3" placeholder="Email" name="email" />
                                {errors.email && <span className="text-red-500 text-sm ml-3">{errors.email}</span>}
                            </div>

                            <div className="w-10/12 h-14 relative">
                                <input value={values.name} onChange={handleOnChange} className="w-full h-full pl-5 rounded-3xl bg-white shadow-lg outline-orange-500 !border-3" placeholder="Username" name="name" />
                                {errors.name && <span className="text-red-500 text-sm ml-3">{errors.name}</span>}
                            </div>

                            <div className="w-10/12 h-14 relative">
                                <input value={values.password} onChange={handleOnChange} className="w-full h-full pl-5 rounded-3xl bg-white shadow-lgoutline-orange-500 !border-3" placeholder="Password" name="password" />
                                {errors.password && (
                                    <span className="text-red-500 text-sm ml-3">{errors.password}</span>
                                )}
                            </div>


                            <div className="w-6/12 h-14 flex justify-center items-center">
                                <button className="w-full h-14 bg-orange-500 text-white font-bold rounded-2xl cursor-pointer outline-0 hover:bg-orange-400 !border-3">
                                    SIGN IN
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className='flex flex-col justify-center items-center'>
                        <p className="text-center italic        lg:text-2xl md:text-xl">Already login <Link to="/login" className="text-orange-500 cursor-pointer">Here</Link> </p>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default RegistrationPage