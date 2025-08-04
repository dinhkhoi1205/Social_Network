import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../HomeSection/PostCard";
import { Avatar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import ProfileModal from "./ProfileModel";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import { findUserById } from "../../Store/Auth/Actiom";
import { findPostByLikeContaineUser, getUserPost } from "../../Store/Post/Action";

const Profile = () => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState("1");
    const [openProfileModel, setOpenProfileModel] = useState(false);
    const handleOpenProfileModel = () => setOpenProfileModel(true);
    const handleClose = () => setOpenProfileModel(false);
    const { auth, post } = useSelector(store => store);
    const dispatch = useDispatch();
    const { id } = useParams()

    const handleFollowUser = () => {
        console.log("Follow user");
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        if (newValue === "4") {
            dispatch(findPostByLikeContaineUser(id))
            console.log("Tab Like clicked");
        } else if (newValue === "1") {
            console.log("User's posts");
        }
    };

    useEffect(() => {
        dispatch(findUserById(id))
        dispatch(getUserPost(id))
    }, [id])

    const handleBack = () => navigate(-1);

    return (
        <section className="max-w-4xl mx-auto mt-4 bg-white shadow rounded-lg overflow-hidden relative">
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="absolute top-4 left-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md"
                title="Back"
            >
                <ArrowBackIcon />
            </button>

            {/* Cover */}
            <div className="relative">
                <img
                    src={auth.findUser?.backgroundImage}
                    alt="cover"
                    className="w-full h-48 object-cover"
                />

                {/* Avatar */}
                <div className="absolute -bottom-12 left-6">
                    <Avatar
                        src={auth.findUser?.image}
                        alt="avatar"
                        sx={{
                            width: 120,
                            height: 120,
                            border: "4px solid white"
                        }}
                    />
                </div>

                {/* Edit Profile Button – At the right corner */}
                {auth.user?.id === auth.findUser?.id && (
                    <button
                        onClick={handleOpenProfileModel}
                        className="absolute bottom-4 right-6 bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded-full font-medium shadow"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Info */}
            <div className="pt-20 px-6 pb-4">
                <h2 className="text-2xl font-bold text-gray-800">{auth.findUser?.fullName}</h2>
                <p className="text-gray-600 mt-2">{auth.findUser?.bio}</p>

                {/* Email */}
                <div className="flex items-center gap-1">
                    <EmailIcon fontSize="small" className="text-gray-500" />
                    <span>{auth.findUser?.email}</span>
                </div>

                {/* Mobile */}
                <div className="flex items-center gap-1">
                    <PhoneIcon fontSize="small" className="text-gray-500" />
                    <span>{auth.findUser?.mobile}</span>
                </div>

                {/* Birthdate */}
                <div className="flex items-center gap-1">
                    <CakeIcon fontSize="small" className="text-gray-500" />
                    <span>{auth.findUser?.birthDate}</span>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mt-4 text-sm text-gray-700">
                    {/* <p><strong>{user.postsCount}</strong> Post</p> */}
                    <p><strong>{auth.findUser?.followers?.length || 0}</strong> Follower</p>
                    <p><strong>{auth.findUser?.following?.length || 0}</strong> Following</p>
                </div>
            </div>

            {/* Tabs */}
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 6 }}>
                    <TabList onChange={handleTabChange} aria-label="profile tabs">
                        <Tab label="Post" value="1" />
                        <Tab label="Reply" value="2" />
                        <Tab label="Media" value="3" />
                        <Tab label="Like" value="4" />
                    </TabList>
                </Box>

                <TabPanel value="1">
                    <div className="px-6 pb-6 space-y-4">
                        {post.userPosts && post.userPosts.length > 0 ? (
                            post.userPosts.map(postItem => (
                                <PostCard key={postItem.id} post={postItem} />
                            ))
                        ) : (
                            <div className="text-gray-500">This user has no posts.</div>
                        )}
                    </div>
                </TabPanel>

                <TabPanel value="2">
                    <div className="px-6 pb-6 text-gray-600">You haven't reply.</div>
                </TabPanel>

                <TabPanel value="3">
                    <div className="px-6 pb-6 text-gray-600">You haven't post image.</div>
                </TabPanel>

                <TabPanel value="4">
                    <div className="px-6 pb-6 space-y-4">
                        {post.likedPosts && post.likedPosts.length > 0 ? (
                            post.likedPosts.map(postItem => (
                                <PostCard key={postItem.id} post={postItem} />
                            ))
                        ) : (
                            <div className="text-gray-500">This user hasn't liked any posts.</div>
                        )}
                    </div>
                </TabPanel>
            </TabContext>

            {/* Open Profile Model */}
            <section>
                <ProfileModal handleClose={handleClose} open={openProfileModel} />
            </section>
        </section>
    );
};

export default Profile;
