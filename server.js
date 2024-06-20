const express = require('express');   //Importa express
const app = express();   //Se crea una instancia de express
const server = require('http').Server(app);   //Se importa http
const io = require('socket.io')(server);   //Importa socket.io 

const port = 3000;   //Se inicializa el puerto en el localhost:3000

//Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

//Variables para la gestión de los turnos
let turnos = [];   //Va a ser el array que contenga los turnos
let turnoActual = 0;   //Se inicializa en 0 porque no hay turnos todavia
let turnosAtendidos = 0;   //Se inicializa en 0, es el contador de turnos atendidos
let proximoNumeroTurno = 1;   //Numeración consecutiva de los turnos, solo se reinicia cuando se reinicia el servidor

//Conexión con socket.io
io.on('connection', (socket) => {   //Es un método de socket.io que escucha el evento 'connection'(que se activa cada vez que un cliente establece una conexión websocket con el servidor)
  console.log('Nuevo usuario conectado');

  //Emitir datos iniciales al cliente conectado
  socket.emit('turnoActual', turnoActual);
  socket.emit('proximoTurno', turnos.slice(0, 3));
  socket.emit('turnosAtendidos', turnosAtendidos);

  //Manejador para nuevo ticket
  socket.on('nuevoTurno', () => {   //Escucha el evento 'nuevoTurno' del cliente
    const nuevoTurno = proximoNumeroTurno++; 
    turnos.push(nuevoTurno);
    io.emit('nuevoTurno', nuevoTurno);   //Emite el evento 'nuevoTurno' a todos los clientes
    io.emit('proximoTurno', turnos.slice(0, 3));   //Actualiza los próximos turnos
  });

  //Manejador para llamar al siguiente turno
  socket.on('llamarProxTurno', () => {
    if (turnos.length > 0) {
      turnoActual = turnos.shift();   //Remueve el primer elemento del arreglo de turnos
      turnosAtendidos++;
      io.emit('turnoActual', turnoActual);   //Emitir evento 'turnoActual' a todos los clientes
      io.emit('proximoTurno', turnos.slice(0, 3));   //Emitir evento 'proximoTurno' a todos los clientes
      io.emit('turnosAtendidos', turnosAtendidos);   //Emitir evento 'turnosAtendidos' a todos los clientes
      io.emit('llamar');   //Emitir evento 'llamar' a todos los clientes
    }
  });

  socket.on('disconnect', () => {   //Escucha el evento 'disconnect'
    console.log('Cliente desconectado');
  });
});

//Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

