import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Form from "../Components/LinkInput";
import Table from "../Components/LinkTable";


function HomePage() {
    const [username, setUsername] = useState("")
    const [logout, setLogout] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('name')
        if (username) {  // 👈 Convert from string to object
            setUsername(username) // 👈 Access the name
        } else {
            navigate('/login')
        }
    }, [navigate])


    const handleLogout = () => {
        localStorage.removeItem('token');  // 🗝️ JWT token
        localStorage.removeItem('name');
        setLogout(true)
        navigate('/login')
    }
    return (
        <>
            <nav className="flex justify-between px-4 max-h-20">
                <div className="flex justify-end mt-5 text-2xl font-semibold">
                    <h2>{username}</h2>
                </div>

                <div className="flex justify-end mt-5">
                    <button onClick={handleLogout} className="px-3 py-3 bg-orange-500 text-md text-white rounded-2xl cursor-pointer outline-0 hover:bg-orange-400 !border-3">Logout</button>
                </div>
            </nav>

            <div className="mt-10">
                <h1 className="text-3xl text-center font-semibold">URL CUTTER</h1>
            </div>

            <Form />
            <Table />
        </>
    )
}

export default HomePage