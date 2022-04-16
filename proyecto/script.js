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

const SHIFT_LIST = [];
const FORMULARIO = document.getElementById("formulario");
const SEARCH = document.getElementById("search");

FORMULARIO.addEventListener("submit", (event) => {
  event.preventDefault();
  newShift();

  Swal.fire({
    icon: "success",
    title: "Ok",
    text: "Su turno a sido creado",
  });

  FORMULARIO.reset();
});

SEARCH.addEventListener("submit", (event) => {
  event.preventDefault();
  listResults();
});

const newShift = () => {
  const DATA = new FormData(FORMULARIO);
  SHIFT_LIST.push(
    new Shift(
      DATA.get("firstName"),
      DATA.get("lastName"),
      DATA.get("document"),
      DATA.get("email"),
      DATA.get("especialidad"),
      DATA.get("dateTime")
    )
  );
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

const listResults = () => {
  const DATA = new FormData(SEARCH);
  const FILTEREDS_SHIFTS = SHIFT_LIST.filter(
    (shift) => shift.document == DATA.get("search").replaceAll(".", "")
  );
  if (FILTEREDS_SHIFTS.length > 0) {
    let tableHTML = `
    <table class="mt-5 table table-hover">                
        <th>Nombre</th>
        <th>Fecha y Hora</th>
        <th>Especialidad</th>`;

    FILTEREDS_SHIFTS.forEach((shift) => {
      tableHTML += `
        <tr>
            <td>${shift.firstName} ${shift.lastName}</td>
            <td>${new Date(shift.dateTime).toLocaleString()}</td>
            <td>${getSpeciality(shift.speciality)}</td>
        </tr>        
        `;
    });

    tableHTML += `</table>`;

    let nodeTable = document.getElementById("table");
    nodeTable.innerHTML = tableHTML;
  }
};
