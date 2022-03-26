/* El programa va a pedir 5 nombres de alumnos, validando
que los nombres no tengan espacios en blanco, luego 
pedira una calificacion para cada nombre y ira imprimiendola 
en pantalla validando que la calificacion sea de 0 a 10.

imprime: el alumn@ **** esta Aprobado/Reprobado 

nota: se aprueba con una calificacion de 5.
*/

let alumnos = [];

alert("acontinuacion debe ingresar 5 nombres de alumnos sin espacios");

while (alumnos.length < 5) {
  let nombre = prompt(
    `ingrese el nombre del alumno numero ${alumnos.length + 1}`
  );

  if (!nombre.includes(" ")) {
    alumnos.push(nombre);
  } else {
    alert("el nombre contiene espacios en blanco");
  }
}

for (let i = 0; i < alumnos.length; i++) {
  const nombre = alumnos[i];
  let calificacion = -1;
  while (calificacion < 0 || calificacion > 10) {
    calificacion = parseInt(prompt(`ingrese la calificacion de ${nombre}`));
    if (calificacion < 0 || calificacion > 10) {
        alert("la calificacion ingresada debe ser de 0 a 10");   
    }
    
  }
  if (calificacion >= 5) {
    document.write(`<p>${nombre} esta aprobad@</p>`);
  } else {
    document.write(`<p>${nombre} esta reprobad@</p>`);
  }
}
