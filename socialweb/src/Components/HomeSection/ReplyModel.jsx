import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createPostReply } from '../../Store/Post/Action';
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
  borderRadius: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

export default function ReplyModel({ open, handleClose, post}) {
  const [previewImage, setPreviewImage] = React.useState(null);
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
  const dispatch=useDispatch();
  const {auth} = useSelector(store=>store)

  const handleSubmit = (values) => {
    dispatch(createPostReply(values))
    console.log("Reply submitted:", values);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      content: '',
      image: '',
      postId:post?.id,
    },
    onSubmit: handleSubmit
  });

  const handleImageChange = async(event) => {
    setUploadingImage(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0]);
    formik.setFieldValue("image", imageUrl);
    setSelectedImage(imageUrl);
    setPreviewImage(imageUrl);
    setUploadingImage(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="reply-modal-title"
      aria-describedby="reply-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <span className="text-lg font-semibold">Reply to Post</span>
            </div>
            <Button type="submit" variant="contained" size="small">
              Reply
            </Button>
          </div>

          {/* User Info & Text Area */}
          <div className="flex gap-3">
            <Avatar src={auth.user?.image} />
            <TextField
              id="content"
              name="content"
              placeholder="Write your reply..."
              multiline
              rows={4}
              fullWidth
              value={formik.values.content}
              onChange={formik.handleChange}
            />
          </div>

          {/* Image Preview */}
          {previewImage && (
            <div className="mt-2">
              <img
                src={previewImage}
                alt="preview"
                className="max-h-64 rounded border object-cover"
              />
            </div>
          )}

          {/* Upload Image */}
          <div className="flex justify-between items-center">
            <label className="cursor-pointer text-blue-500 hover:underline">
              Upload Image
              <input
                type="file"
                name="image"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
