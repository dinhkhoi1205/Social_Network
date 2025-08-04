import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ProfileModel.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../Store/Auth/Actiom';
import { uploadToCloudinary } from '../../Utils/uploadToCloudinary';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: 4
};

export default function ProfileModal({open, handleClose}) {
    // const [open, setOpen] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);
    const [selectedImage,setSelectedImage] = React.useState("");
    const [previewAvatar, setPreviewAvatar] = React.useState("");
    const [previewBackground, setPreviewBackground] = React.useState("")
    const {auth} = useSelector(store=>store)
    const dispatch=useDispatch();

    const handleSubmit = (values) => {
        dispatch(updateUserProfile(values));
        console.log("handle submit", values);
        handleClose();
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: auth.user?.fullName || "",
            email: auth.user?.email || "",
            mobile: auth.user?.mobile || "",
            birtDate: auth.user?.birthDate || "",
            bio: auth.user?.bio || "",
            backgroundImage: auth.user?.backgroundImage || "",
            image: auth.user?.image || ""
        }, onSubmit: handleSubmit
    })

    const handleImageChange = async (event) => {
        setUploading(true);
        const { name, files } = event.target;
    
        if (!files || !files[0]) return;
    
        const uploadedUrl = await uploadToCloudinary(files[0]);
        formik.setFieldValue(name, uploadedUrl);
    
        // Update preview state
        if (name === "image") {
            setPreviewAvatar(uploadedUrl);
        } else if (name === "backgroundImage") {
            setPreviewBackground(uploadedUrl);
        }
    
        setUploading(false);
    };

    console.log("auth", auth)

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-3'>

                                <IconButton onClick={handleClose} aria-label="delete">
                                    <CloseIcon />

                                </IconButton>
                                <p className='text-sm'>Edit Profile</p>
                            </div>
                            <Button type='submit'>Save</Button>
                        </div>
                        <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
                            <React.Fragment>
                                {/* Change Profile Model */}
                                <div>
                                    <div className="w-full">
                                        <div className="relative">
                                            <img
                                                className="w-full h-[12rem] object-cover object-center"
                                                src= {previewBackground||formik.values.backgroundImage||"https://picsum.photos/seed/picsum/200/300"} 
                                                alt="cover"
                                            />

                                            <input
                                                type="file"
                                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={handleImageChange}
                                                name="backgroundImage"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full transform -translate-y-20 ml-4 h-6rem">
                                    <div className="relative">
                                        <Avatar
                                            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
                                            src={previewAvatar || formik.values.image || auth.user?.image} 
                                        />

                                        <input
                                            className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                            name="image"
                                            type="file" />
                                    </div>
                                </div>
                            </React.Fragment>
                            {/* Change Profile Information Model */}
                            <div className="space-y-3">

                                {/* Info Fields */}
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="fullName"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                />

                                <TextField
                                    fullWidth
                                    label="Bio"
                                    name="bio"
                                    multiline
                                    rows={3}
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                />

                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />

                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="mobile"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange}
                                />

                                <TextField
                                    fullWidth
                                    label="Date of Birth"
                                    name="birtDate"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.birtDate}
                                    onChange={formik.handleChange}
                                />
                            </div>


                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
