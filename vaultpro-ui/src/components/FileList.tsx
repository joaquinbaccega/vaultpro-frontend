import React from 'react';
import {
  List,
  ListItem,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Archivo } from '../services/fileService';

interface Props {
  archivos: Archivo[];
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}

const FileList: React.FC<Props> = ({ archivos, onDownload, onDelete }) => (
  <List>
    {archivos.map((archivo) => (
      <ListItem key={archivo.id}>
        <Box flexGrow={1}>
          <Typography fontWeight="bold">{archivo.nombreOriginal}</Typography>
          <Typography variant="body2">Subido: {new Date(archivo.subidoEn).toLocaleString()}</Typography>
        </Box>
        <IconButton onClick={() => onDownload(archivo.id)}>
          <DownloadIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(archivo.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    ))}
  </List>
);

export default FileList;
