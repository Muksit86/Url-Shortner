import axios from 'axios';
import { useState } from "react";

function Form() {
    const [copyurl, setCopyUrl] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("")
    const BASEURL = 'http://localhost:5000'

    const validate = () => {

        if (!url) {
            setError("URL is required");
            return false;
        }
        const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
        if (!urlPattern.test(url)) {
            setError("Please enter a valid URL");
            return false;
        }
        setError("");
        return true;
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(copyurl)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                return;
            }

            if (validate()) {
                const response = await axios.post('http://localhost:5000/api/short', { url: url }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                setCopyUrl(`${BASEURL}/${response.data.shortid}`)
            }
        } catch (error) {
            console.error("This is an handleSubmit Error", error)
        }
        // Handle form submission logic here
    }
    return (
        <>
            <div className="flex flex-col items-center gap-5 mt-10">
                <form onSubmit={handleSubmit} className="w-10/12       sm:w-8/12">
                    <div className="h-14 relative">
                        <input className="w-full h-full pl-5 rounded-3xl bg-white shadow-lg outline-0" placeholder="www.google.com/..." name="org-url" value={url} onChange={(e) => setUrl(e.target.value)} />
                        {error && (
                            <span className="text-red-500 text-sm ml-3">{error}</span>
                        )}
                        <button className="absolute top-0 right-0 h-full px-4 text-md bg-orange-500 text-white font-bold rounded-r-3xl cursor-pointer outline-0 hover:bg-orange-400 !border-3">
                            CUT
                        </button>
                    </div>
                </form>
                <div className="w-8/12 h-14 relative        sm:w-6/12">
                    <input value={copyurl} onChange={(e) => setCopyUrl(e.target.value)} className="w-full h-full pl-5 rounded-3xl bg-white shadow-lg outline-0" placeholder="www.google.com/..." name="short-url" />
                    <button onClick={handleCopy} className="absolute top-0 right-0 h-full px-3 bg-orange-500 text-white font-bold rounded-r-3xl cursor-pointer outline-0 hover:bg-orange-400 text-sm !border-3">
                        COPY
                    </button>
                </div>

            </div>
        </>
    )
}

export default Form