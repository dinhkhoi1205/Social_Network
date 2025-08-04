import React, { useState, useEffect } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SendIcon from '@mui/icons-material/Send';
import PostCard from "./PostCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createPost, getAllPosts } from "../../Store/Post/Action";
import { uploadToCloudinary } from "../../Utils/uploadToCloudinary";

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Post content is required")
});


const HomeSection = () => {
    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { posts, loading, like, repost } = useSelector(state => state.post);
    const {auth} = useSelector(store=>store)
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        dispatch(createPost(values))
        resetForm();
        console.log("values", values);
        setSelectedImage(null)
    };

    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            isPost: true
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        dispatch(getAllPosts())
    }, [like, repost])

    const handleSelectImage = async(event) => {
        setUploadingImage(true);
        const imageUrl = await uploadToCloudinary(event.target.files[0]);
        formik.setFieldValue("image", imageUrl);
        setSelectedImage(imageUrl);

        setUploadingImage(false);
    };

    return (
        <section className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Home</h2>

            <form onSubmit={formik.handleSubmit} className="flex space-x-4">
                {/* Avatar */}
                <Avatar src={auth.user?.image} alt="User" />

                {/* Input area */}
                <div className="flex-1">
                    {/* Text input */}
                    <textarea
                        name="content"
                        rows={3}
                        placeholder="What is happening?!"
                        className="w-full resize-none outline-none text-lg placeholder-gray-500 bg-transparent mb-2"
                        {...formik.getFieldProps("content")}
                    />
                    {/* {formik.errors.content && formik.touched.content && (
                        <p className="text-red-500 text-sm mb-2">{formik.errors.content}</p>
                    )} */}

                    {/* Image preview */}
                    {selectedImage && (
                        <div className="mb-2">
                            <img
                                src={selectedImage}
                                alt="preview"
                                className="max-h-60 rounded-lg border"
                            />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-4 text-blue-500">
                            <label className="cursor-pointer">
                                <ImageIcon />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleSelectImage}
                                />
                            </label>
                            <TagFacesIcon />
                        </div>

                        <button
                            type="submit"
                            disabled={uploadingImage || formik.isSubmitting}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-full flex items-center gap-2 transition"
                        >
                            {formik.isSubmitting || uploadingImage ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                <>
                                    <SendIcon fontSize="small" />
                                    <span>Post</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>

            <div className="mt-6 space-y-4">
                {loading ? (
                    <p>Loading posts...</p>
                ) : (
                    posts?.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))
                )}
            </div>
        </section>

    );
};

export default HomeSection;
