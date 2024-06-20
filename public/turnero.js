//Se manejan los eventos de la pantalla del Turnero

const socketTurnero = io();   //Es la conexion entre el turnero y el server

socketTurnero.on('turnoActual', (turno) => {   //Escucha el evento 'turnoActual' del server
  //Recibe el turno actual y lo muestra en la pantalla del turnero
  document.getElementById('turnoActual').innerHTML = `<p>Turno Actual: <span class="turno-actual"><br>T ${turno}</span></p>`;
});

socketTurnero.on('proximoTurno', (turnos) => {   //Escucha el evento 'proximoTurno' del server
  //Muestra los proximos turnos en la pantalla del turnero, sino hay mas muestra un cartel
  document.getElementById('proximoTurno').innerHTML = `<p>Próximos Turnos: <br><br> T ${turnos.length > 0 ? turnos.join('<br>T') : '---'}</p>`;
  //turnos.join convierte el arreglo en una cadena de con los eltos del arreglo separado por ','
});

socketTurnero.on('llamar', () => {   //Escucha el evento 'llamar' desde el server
  const audio = new Audio('timbre.mp3');   //Se crea un nuevo objeto de audio de JS con la direccion de 'timbre.mp3'
  audio.play();   //Se reproduce con el .play()
});
