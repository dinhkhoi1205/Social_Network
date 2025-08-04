import React, { useEffect } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../HomeSection/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { findPostById } from "../../Store/Post/Action";

const PostDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const { singlePost, loading } = useSelector(store => store.post);

    useEffect(() => {
        if (id) {
            dispatch(findPostById(id));
        }
    }, [id, dispatch]);

    const handleBack = () => navigate(-1);

    return (
        <div className="max-w-2xl mx-auto mt-4 bg-white shadow rounded-lg">
            {/* Header */}
            <div className="sticky top-0 z-50 flex items-center bg-white bg-opacity-95 px-4 py-3 border-b">
                <KeyboardBackspaceIcon
                    className="cursor-pointer text-gray-700 hover:text-black"
                    onClick={handleBack}
                />
                <h1 className="text-lg font-semibold ml-4">Post</h1>
            </div>

            {/* Main Post */}
            <section className="px-4">
                {loading ? (
                    <p>Loading...</p>
                ) : singlePost ? (
                    <PostCard post={singlePost} />
                ) : (
                    <p className="text-gray-500">Post not found.</p>
                )}
            </section>

            {/* Divider */}
            <div className="border-t my-6" />

            {/* Reply Posts */}
            <section className="px-4 pb-6">
                <h2 className="text-md font-semibold mb-3">Replies</h2>

                {singlePost?.replyPosts?.map((reply) => (
                    <div key={reply.id} className="mb-4">
                        <PostCard key={reply.id} post={reply} />
                    </div>
                ))}

            </section>
        </div>
    );
};

export default PostDetails;