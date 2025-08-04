import React, { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { useSelector } from "react-redux";


const RightPath = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [noUserFound, setNoUserFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim()) {
                searchUser(searchTerm);
            } else {
                setResults([]);
                setNoUserFound(false);
            }
        }, 500); 

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const searchUser = async (query) => {
        try {
            const jwt = localStorage.getItem("jwt");
            const { data } = await axios.get(`${API_BASE_URL}/api/users/search?query=${query}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            if (data.length > 0) {
                setResults(data);
                setNoUserFound(false);
            } else {
                setResults([]);
                setNoUserFound(true);
            }
        } catch (error) {
            console.error("Search error:", error);
            setNoUserFound(true);
        }
    };

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
        setSearchTerm("");
        setResults([]);
        setNoUserFound(false);
    };

    const trendingTopics = [
        "#Summer2025",
        "#WebDevelopment",
        "#HàNội",
        "#ReactJS",
        "#AlumniNetwork"
    ];

    return (
        <div className='py-5 sticky top-0 w-full'>
            {/* Search box */}
            <div className='relative flex items-center mb-6'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='py-3 rounded-full text-gray-700 w-full pl-12 bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400'
                />
                <div className='absolute top-0 left-0 pl-3 pt-3'>
                    <SearchIcon className='text-gray-500' />
                </div>
            </div>

            {/* Search Results */}
            {searchTerm && (
                <div className="bg-white shadow p-3 rounded-xl mb-4">
                    {results.length > 0 ? (
                        results.map(user => (
                            <div
                                key={user.id}
                                onClick={() => handleUserClick(user.id)}
                                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded text-sm"
                            >
                                {user.fullName}
                            </div>
                        ))
                    ) : noUserFound ? (
                        <div className="text-gray-500 text-sm">No user found</div>
                    ) : (
                        <div className="text-gray-400 text-sm">Searching...</div>
                    )}
                </div>
            )}

            {/* Trending topics */}
            <div className="bg-gray-100 p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-3 text-black-200">What's happening</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    {trendingTopics.map((topic, index) => (
                        <li key={index} className="hover:text-blue-600 cursor-pointer"> {topic} </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RightPath;
