import React from "react";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const ImagePreview = ({ image, onRemove }) => {
  return (
    <div style={{ position: 'relative', width: 100, height: 100 }}>
      <img
        src={image}
        alt="Preview"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <IconButton
        onClick={onRemove}
        style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
      >
        <Delete />
      </IconButton>
    </div>
  );
};

export default ImagePreview;
