class Shift {
  constructor(firstName, lastName, document, email, speciality, dateTime) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.document = document;
    this.email = email;
    this.speciality = speciality;
    this.dateTime = dateTime;
  }
}

let newShift = {};
const FORMULARIO = document.getElementById("formulario");
const SEARCH = document.getElementById("search");

FORMULARIO.addEventListener("submit", (event) => {
  event.preventDefault();
  createShift();
  addLocalStorage();
  createAlerts("success","Ok","Su turno ha sido creado")
  FORMULARIO.reset();
});

SEARCH.addEventListener("submit", (event) => {
  event.preventDefault();
  listResults();
});

const createShift = () => {
  const DATA = new FormData(FORMULARIO);
  newShift = new Shift(
    DATA.get("firstName"),
    DATA.get("lastName"),
    DATA.get("document"),
    DATA.get("email"),
    DATA.get("especialidad"),
    DATA.get("dateTime")
  );
};

const addLocalStorage = () => {
  if (localStorage.getItem("shiftList")) {
    let dataStorage = JSON.parse(localStorage.getItem("shiftList"));
    dataStorage.push(newShift);
    localStorage.setItem("shiftList", JSON.stringify(dataStorage));
  } else {
    localStorage.setItem("shiftList", JSON.stringify([newShift]));
  }
};

const getSpeciality = (value) => {
  let specialityName = "";

  switch (value) {
    case "1":
      specialityName = "Masaje";
      break;
    case "2":
      specialityName = "Limpieza Facial";
      break;
    case "3":
      specialityName = "Depilación";
      break;
    default:
      break;
  }

  return specialityName;
};

const createAlerts = (icon,title,text) =>{
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  });   
}


const buildTable = (data) =>{
  let tableHTML = `
  <table class="mt-5 table table-hover">                
      <th>Nombre</th>
      <th>Fecha y Hora</th>
      <th>Especialidad</th>`;

  data.forEach((shift) => {
    tableHTML += `
      <tr>
          <td>${shift.firstName} ${shift.lastName}</td>
          <td>${new Date(shift.dateTime).toLocaleString()}</td>
          <td>${getSpeciality(shift.speciality)}</td>
      </tr>        
      `;
  });

  tableHTML += `</table>`;

  return tableHTML
}

const listResults = () => {
  const DATA_LOCAL_STORAGE = JSON.parse(localStorage.getItem("shiftList"))
  
  if (DATA_LOCAL_STORAGE == null){
    createAlerts("error","Error","No hay turnos cargados")
    return
  }
  const DATA_SEARCH = new FormData(SEARCH);
  const FILTEREDS_SHIFTS = DATA_LOCAL_STORAGE.filter(
    (shift) => shift.document == DATA_SEARCH.get("search").replaceAll(".", "")
  );
  if (FILTEREDS_SHIFTS.length) {
    const tableHTML = buildTable(FILTEREDS_SHIFTS)

    let nodeTable = document.getElementById("table");
    nodeTable.innerHTML = tableHTML;
    return
  }else{
    createAlerts("error","Error","No hay turnos cargados para este DNI")
    let nodeTable = document.getElementById("table");
    nodeTable.innerHTML = "";
    return
  }
};
