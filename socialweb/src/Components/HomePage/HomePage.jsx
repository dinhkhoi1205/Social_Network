import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPath from "../RightPart/RightPart";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import PostDetails from "../PostDetails/PostDetails";
import { useSelector } from "react-redux";

const HomePage = () => {

    const { auth } = useSelector(store => store);
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Social Network</h1>
                </div>
            </header>

            {/* Main content area */}
            <div className="flex flex-1 container mx-auto mt-4">
                {/* Sidebar */}
                <aside className="w-1/4 p-4 hidden md:block">
                    <Navigation userId={auth.user?.id}/>
                </aside>

                {/* Main feed */}
                <main className="w-full md:w-3/4 p-4">
                    <Routes>
                        <Route path="/" element={<HomeSection />}> </Route>
                        <Route path="/home" element={<HomeSection />}> </Route>
                        <Route path="/profile/:id" element={<Profile />}> </Route>
                        <Route path="/post/:id" element={<PostDetails/>}></Route>
                    </Routes>
                </main>

                 {/* Right Sidebar */}
                 <aside className="w-1/4 p-4 hidden xl:block">
                    <RightPath />
                </aside>
            </div>
        </div>
    );
};

export default HomePage