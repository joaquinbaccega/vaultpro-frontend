// src/components/FileUploadForm.tsx
import React, { useRef, useState } from 'react';
import {
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { subirArchivo } from '../services/fileService';

interface Props {
  onUpload: () => void;
}

const FileUploadForm: React.FC<Props> = ({ onUpload }) => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArchivo(e.target.files?.[0] || null);
  };

  const handleSubmit = async () => {
    if (!archivo) return;
    await subirArchivo(archivo);
    setArchivo(null);
    onUpload();
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 2, maxWidth: 600 }}>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <input
          type="file"
          hidden
          ref={inputRef}
          onChange={handleChange}
        />

        <Button
          variant="outlined"
          startIcon={<UploadFileIcon />}
          onClick={handleClick}
        >
          Seleccionar archivo
        </Button>

        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {archivo ? archivo.name : 'Ningún archivo seleccionado'}
        </Typography>

        <Button
          variant="contained"
          disabled={!archivo}
          onClick={handleSubmit}
        >
          Subir
        </Button>
      </Stack>
    </Paper>
  );
};

export default FileUploadForm;
