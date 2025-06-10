// src/components/FileList.tsx
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Stack,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import type { Archivo } from '../services/fileService';

interface Props {
  archivos: Archivo[];
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}

const FileList: React.FC<Props> = ({ archivos, onDownload, onDelete }) => {
  if (!archivos.length) {
    return (
      <Typography variant="body1" color="text.secondary">
        No hay archivos subidos.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {archivos.map((archivo) => (
        <Paper
          key={archivo.id}
          elevation={2}
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: 600,
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <InsertDriveFileIcon fontSize="large" color="primary" />
            <Box>
              <Typography fontWeight="bold">{archivo.nombreOriginal}</Typography>
              <Typography variant="body2" color="text.secondary">
                Subido: {new Date(archivo.subidoEn).toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" gap={1}>
            <IconButton onClick={() => onDownload(archivo.id)} color="primary">
              <DownloadIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(archivo.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};

export default FileList;
