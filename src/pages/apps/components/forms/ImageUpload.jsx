import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Card,
  CardMedia
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PlaceholderImg from '../../../../assets/images/PlaceholderImg.svg';

const ImageUpload = ({ value, onChange, error, text = "Upload Image" }) => {
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (value) {
      if (value instanceof File) {
        setPreview(URL.createObjectURL(value));
      } else if (typeof value === 'string') {
        setPreview(value);
      }
    } else {
      setPreview(PlaceholderImg);
    }
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [value]);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      onChange(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
  };

  return (
    <Box sx={{ mt: 3 }}>
      {/* Upload Button and Preview Area */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'center', sm: 'center' }}
        justifyContent={{ xs: 'center', sm: 'flex-start' }}
        gap={3}
        sx={{ width: '100%' }}
      >
        {/* Upload Button */}
        <Card
          component="label"
          sx={{
            position: 'relative',
            width: { xs: 120, sm: 140 },
            height: { xs: 120, sm: 140 },
            minWidth: { xs: 120, sm: 140 },
            border: '2px dashed',
            borderColor: 'primary.light',
            borderRadius: 2,
            backgroundColor: 'rgba(25, 118, 210, 0.02)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)'
            }
          }}
        >
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <PhotoCamera
            sx={{
              fontSize: { xs: 28, sm: 32 },
              color: 'primary.main',
              mb: 1
            }}
          />
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              px: 1,
              userSelect: 'none',
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            }}
          >
            {text}
          </Typography>
        </Card>

        {/* Preview Section */}
        {preview && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Card
              sx={{
                position: 'relative',
                width: { xs: 120, sm: 140 },
                height: { xs: 120, sm: 140 },
                minWidth: { xs: 120, sm: 140 },
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  '& .preview-overlay': {
                    opacity: 1
                  }
                }
              }}
              onClick={handleClick}
            >
              <CardMedia
                component="img"
                src={preview}
                alt="Preview"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
              />
              {/* Hover Overlay */}
              <Box
                className="preview-overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <ZoomInIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: 'white' }} />
              </Box>
            </Card>

            {/* Remove Button */}
            <IconButton
              onClick={handleRemove}
              sx={{
                backgroundColor: 'error.light',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'error.main',
                  transform: 'scale(1.15)'
                },
                transition: 'all 0.2s ease',
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                cursor: 'pointer'
              }}
              aria-label="remove image"
            >
              <DeleteIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Error Message */}
      {error && (
        <Typography
          variant="caption"
          color="error"
          sx={{
            mt: 1,
            display: 'block',
            fontWeight: 500,
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          {error}
        </Typography>
      )}

      {/* Helper Text */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          mt: 1,
          display: 'block',
          fontSize: { xs: '0.7rem', sm: '0.75rem' },
          userSelect: 'none',
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        Supported formats: JPG, PNG, WebP • Max 5MB
      </Typography>

      {/* Preview Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          p: 2
        }}
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 1, sm: 2 },
            borderRadius: 2,
            outline: "none",
            maxWidth: '95vw',
            maxHeight: '95vh',
            width: { xs: '90%', sm: 'auto' },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)'
              },
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              cursor: 'pointer'
            }}
            aria-label="close preview"
          >
            <CloseIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
          </IconButton>

          {/* Image */}
          {preview && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 0.5, sm: 1 }
              }}
            >
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  borderRadius: 4,
                  display: 'block',
                  cursor: 'pointer'
                }}
                onClick={handleClose}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageUpload;