import React from 'react';
import {
  List,
  ListItem,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Contraseña } from '../services/passwordService';

interface Props {
  contraseñas: Contraseña[];
  onDelete: (id: string) => void;
}

const VaultList: React.FC<Props> = ({ contraseñas, onDelete }) => (
  <List>
    {contraseñas.map((c) => (
      <ListItem
        key={c.id}
        secondaryAction={
          <IconButton edge="end" onClick={() => onDelete(c.id)}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <Box>
          <Typography fontWeight="bold">{c.nombre}</Typography>
          <Typography variant="body2">
            Usuario: {c.nombreUsuario} | Contraseña: {c.contraseña}
          </Typography>
        </Box>
      </ListItem>
    ))}
  </List>
);

export default VaultList;
