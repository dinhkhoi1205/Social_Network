import React, { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RepeatIcon from '@mui/icons-material/Repeat';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReplyModel from "./ReplyModel";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDispatch, useSelector } from "react-redux";
import { createRePost, deletePost, likePost } from "../../Store/Post/Action";

const PostCard = ({ post }) => {
    dayjs.extend(relativeTime);
    const navigate = useNavigate();
    const [openReplyModel, setOpenReplyModel] = useState(false);
    const handleOpenReplyModel = () => setOpenReplyModel(true);
    const handleCloseReplyModel = () => setOpenReplyModel(false);
    const {auth} = useSelector(store=>store)
    const dispatch = useDispatch();

    // Menu state
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        dispatch(deletePost(post?.id))
        console.log("Deleting post", post?.id);
        handleMenuClose();
    };

    const handleCreateRePost = () => {
        dispatch(createRePost(post?.id))
        console.log("Handle create repost")
    }

    const handleLikePost = () => {
        dispatch(likePost(post?.id))
        console.log("handle like post")
    }

    return (
        <React.Fragment>
            <div className="p-4 border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                {/* Retweet note if needed */}
                {post?.isRetweeted && (
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                        <RepeatIcon fontSize="small" />
                        <span className="ml-2">You Post</span>
                    </div>
                )}

                <div className="flex space-x-4">
                    {/* Avatar */}
                    <Avatar
                        onClick={() => navigate(`/profile/${post?.user.id || 1}`)}
                        className="cursor-pointer"
                        // alt={post?.fullName}
                        src={post.user?.image || "https://i.pravatar.cc/100"}
                    />

                    {/* Post content */}
                    <div className="flex-1" >
                        <div className="flex items-start justify-between">
                            {/* User info */}
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => navigate(`/profile/${post?.user.id}`)}
                            >
                                <span className="text-gray-800 font-semibold">{post?.user?.fullName}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                    {dayjs(post?.createdAt).fromNow()}
                                </span>
                            </div>

                            {/* More menu */}
                            <IconButton onClick={handleMenuOpen} size="small">
                                <MoreHorizIcon fontSize="small" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                                {auth.user?.id === post?.user?.id && (
                                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                            )}
                            </Menu>
                        </div>

                        {/* ⬇️ NỘI DUNG bài viết - CHO PHÉP CLICK để mở PostDetails */}
                        <div
                            onClick={() => navigate(`/post/${post?.id}`)}
                            className="cursor-pointer"
                        >
                            {/* Text content */}
                            {post?.content && (
                                <p className="text-gray-800 text-base my-2">
                                    {post?.content}
                                </p>
                            )}

                            {/* Image if exists */}
                            {post?.image && (
                                <div className="mt-2">
                                    <img
                                        src={typeof post?.image === "string" ? post?.image : URL.createObjectURL(post?.image)}
                                        alt="post"
                                        className="rounded-xl border max-h-80 object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between text-gray-500 mt-3 text-sm">
                            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
                                <ChatBubbleOutlineIcon fontSize="small" onClick={handleOpenReplyModel} />
                                <span>{post?.totalReplies}</span>
                            </div>
                            <div
                                className={`flex items-center gap-2 cursor-pointer hover:text-green-500 ${post?.retwit ? 'text-green-500' : ''
                                    }`}
                                onClick={handleCreateRePost}
                            >
                                <RepeatIcon fontSize="small" />
                                <span>{post?.totalRetweets}</span>
                            </div>

                            <div
                                className={`flex items-center gap-2 cursor-pointer hover:text-pink-500 ${post?.liked ? 'text-pink-500' : ''}`}
                                onClick={handleLikePost}
                            >
                                {post?.liked ? (
                                    <FavoriteIcon fontSize="small" />
                                ) : (
                                    <FavoriteBorderIcon fontSize="small" />
                                )}
                                <span>{post?.totalLikes}</span>
                            </div>

                            <div className="flex items-center gap-2 cursor-pointer hover:text-pink-500">
                                <BarChartIcon fontSize="small" />
                                <span>25017</span>
                            </div>
                            <div className="cursor-pointer hover:text-blue-400">
                                <IosShareIcon fontSize="small" />
                            </div>
                        </div>
                    </div>
                </div>

                <section>
                    <ReplyModel post={post} open={openReplyModel} handleClose={handleCloseReplyModel} />
                </section>
            </div>
        </React.Fragment>
    );
};

export default PostCard;
