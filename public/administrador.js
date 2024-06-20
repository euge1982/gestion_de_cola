//Se manejan los eventos de la pantalla Administrador

const socketAdmin = io();   //Es la conexion entre el administrador y el server

//Escuchamos el click del boton para llamar al proximo turno
document.getElementById('llamarProxTurnoBtn').addEventListener('click', () => {
  socketAdmin.emit('llamarProxTurno');   //Emite el evento 'llamarProxTurno' a los clientes
});

socketAdmin.on('turnosAtendidos', (contadorTurnos) => {   //Escucha el evento 'turnosAtendidos' enviado desde el server
  //Recibe la cantidad de turnos y los muestra en la pantalla del administrador
  document.getElementById('turnosAtendidos').innerHTML = `<p><strong>Turnos Atendidos Hoy:</strong> ${contadorTurnos}</p>`;
});


