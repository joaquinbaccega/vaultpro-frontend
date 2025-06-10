import * as signalR from '@microsoft/signalr';

let connection: signalR.HubConnection;

export const iniciarConexion = (onArchivoSubido: () => void, onArchivoEliminado?: () => void) => {
  const token = localStorage.getItem('token');

  connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:44367/hubs/vault', {
      accessTokenFactory: () => token || ''
    })
    .withAutomaticReconnect()
    .build();

  connection.on('archivoSubido', () => {
    onArchivoSubido();
  });

  if (onArchivoEliminado) {
  connection.on('archivoEliminado', onArchivoEliminado);
}
    connection.onreconnecting((error) => {
        console.warn('Reconectando a SignalR:', error);
    });

  connection.start()
    .catch((err) => console.error('Error al conectar con SignalR:', err));
};

export const detenerConexion = async () => {
  if (connection) await connection.stop();
};
