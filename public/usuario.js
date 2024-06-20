//Se manejan los eventos de la pantalla del Usuario

const socketUsuario = io();   //Es la conexion entre el usuario y el server

//Se escucha el click del boton para un nuevo turno
document.getElementById('nuevoTurnoBtn').addEventListener('click', () => {
  socketUsuario.emit('nuevoTurno');   //Emite el evento 'nuevoTurno' a los clientes 
});

