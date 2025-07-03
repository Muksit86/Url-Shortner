import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Table() {
    const [links, setLinks] = useState([])

    const linkDelete = () => toast.error('✅ Link deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    useEffect(() => {
        getAllShorts()
    }, [])

    const getAllShorts = async (req, res) => {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/shortLinks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setLinks(response.data.urls)
    }

    const deleteLink = async (shortid) => {
        const token = localStorage.getItem('token')
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/${shortid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        if (response) {
            setLinks(prevLinks => prevLinks.filter(link => link.shortId !== shortid));
            linkDelete()
        }
    }

    return (
        <>
            <div className="max-h-[28rem] overflow-y-auto mt-10 mx-10">
                <table className="w-full table-auto text-sm text-center shadow-xl rounded-xl overflow-hidden bg-white">
                    <thead className="sticky top-0 bg-gradient-to-r from-orange-400 to-orange-600 text-white z-10">
                        <tr className="font-bold">
                            <th className="border-b-2 border-orange-300 py-3 w-1/12">ID</th>
                            <th className="border-b-2 border-orange-300 py-3 w-6/12">LINKS</th>
                            <th className="border-b-2 border-orange-300 py-3 w-3/12">CREATED AT</th>
                            <th className="border-b-2 border-orange-300 py-3 w-2/12">CLICK COUNT</th>
                            <th className="border-b-2 border-orange-300 py-3 w-2/12">⛓️‍💥</th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map((link, idx) => (
                            <tr
                                key={link._id}
                                className={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-orange-100 transition-colors`}
                            >
                                <td className="px-2 py-2">{idx + 1}</td>
                                <td className="px-2 py-2 text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors">
                                    <a target='_blank' href={`${BASE_URL}/${link.shortId}`}>{`${BASE_URL}/${link.shortId}`}</a>
                                </td>
                                <td className="px-2 py-2">{link.createdAt.toLocaleString()}</td>
                                <td className="px-2 py-2 font-semibold">{link.visitHistory.length}</td>
                                <td className="cursor-pointer px-2 py-2 font-semibold"><button onClick={() => deleteLink(link.shortId)} >DELETE</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </>
    )
}

export default Table