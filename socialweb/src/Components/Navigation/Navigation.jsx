import React, { useState, useRef, useEffect } from "react";
import { getNavigationMenu } from "./NavigationMenu";
import { NavLink } from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from "react-redux";
import { store } from "../../Store/store";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/Auth/Actiom";

const Navigation = () => {
    const {auth} = useSelector(store=>store)
    const navigationMenu = getNavigationMenu(auth.user?.id)
    const dispatch=useDispatch()
    const isLoggedIn = true;

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout())
    };

    return (
        <nav className="w-full md:w-64 h-full flex flex-col justify-between p-4 bg-white rounded-xl shadow-lg">
            <div className="space-y-2 overflow-y-auto max-h-[75vh]">
                {navigationMenu.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
                            hover:bg-blue-100 hover:text-blue-700 ${
                                isActive ? "bg-blue-500 text-white" : "text-gray-700"
                            }`
                        }
                    >
                        <div className="text-2xl">{item.icon}</div>
                        <span className="text-lg font-medium">{item.title}</span>
                    </NavLink>
                ))}
            </div>

            {/* User profile area + menu */}
            {isLoggedIn && (
                <div className="mt-6 pt-4 border-t border-gray-200 px-4 relative" ref={menuRef}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src={auth.user?.image}
                                alt="avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{auth.user?.fullName}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-500 hover:text-gray-800"
                        >
                            <MoreHorizIcon />
                        </button>
                    </div>

                    {/* Dropdown menu */}
                    {menuOpen && (
                        <div className="absolute right-4 bottom-16 bg-white border rounded shadow-md z-10 w-32">
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                            >
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
