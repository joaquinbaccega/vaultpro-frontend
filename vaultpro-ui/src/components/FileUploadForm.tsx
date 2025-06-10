import React, { useState } from 'react';
import { Box, Button, Input } from '@mui/material';
import { subirArchivo } from '../services/fileService';

interface Props {
  onUpload: () => void;
}

const FileUploadForm: React.FC<Props> = ({ onUpload }) => {
  const [archivo, setArchivo] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!archivo) return;
    await subirArchivo(archivo);
    setArchivo(null);
    onUpload();
  };

  return (
    <Box display="flex" gap={2} alignItems="center">
      <Input
        type="file"
        onChange={(e) => setArchivo((e.target as HTMLInputElement).files?.[0] || null)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Subir
      </Button>
    </Box>
  );
};

export default FileUploadForm;
