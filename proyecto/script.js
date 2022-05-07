import { format, isEqual, isPast } from "https://esm.run/date-fns";

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

  if (!createShift()) return;

  if (isValidDateShift()) {
    saveShift()
      .then(() => {
        createAlerts("success", "Ok", "Su turno ha sido creado");
        FORMULARIO.reset();
      })
      .catch((error) => {
        createAlerts("error", "Error", error);
      });
  } else {
    createAlerts("error", "Error", "Ya existe un turno para esta fecha y hora");
  }
});

SEARCH.addEventListener("submit", (event) => {
  event.preventDefault();
  listResults();
});

const createShift = () => {
  const DATA = new FormData(FORMULARIO);
  if (isPast(new Date(DATA.get("dateTime")))) {
    createAlerts(
      "error",
      "Error",
      "La fecha no puede ser anterior a la actual"
    );
    return false;
  } else {
    newShift = new Shift(
      DATA.get("firstName"),
      DATA.get("lastName"),
      DATA.get("document"),
      DATA.get("email"),
      DATA.get("especialidad"),
      DATA.get("dateTime")
    );
    return true;
  }
};

const isValidDateShift = () => {
  const DATA_LOCAL_STORAGE = JSON.parse(localStorage.getItem("shiftList"));
  if (DATA_LOCAL_STORAGE == null) {
    return true;
  }
  const EXISTING_SHIFT = DATA_LOCAL_STORAGE.find((shift) =>
    isEqual(new Date(newShift.dateTime), new Date(shift.dateTime))
  );
  if (EXISTING_SHIFT) {
    return false;
  }
  return true;
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

const createAlerts = (icon, title, text) => {
  Swal.fire({
    icon,
    title,
    text,
  });
};

const buildTable = (data) => {
  let tableHTML = `
  <table class="mt-5 table table-hover">                
      <th>Nombre</th>
      <th>Fecha y Hora</th>
      <th>Especialidad</th>`;

  data.forEach(({ firstName, lastName, dateTime, speciality }) => {
    tableHTML += `
      <tr>
          <td>${firstName} ${lastName}</td>
          <td>${format(new Date(dateTime), "dd-MM-yyyy H:mm")}</td>
          <td>${getSpeciality(speciality)}</td>
      </tr>        
      `;
  });

  tableHTML += `</table>`;

  return tableHTML;
};

const listResults = () => {
  try {
    const VALUE_SEARCH = new FormData(SEARCH).get("search").replaceAll(".", "");
    if(VALUE_SEARCH)
    getShiftByDocument(VALUE_SEARCH).then((data) => {
      if (DATA_LOCAL_STORAGE == null) {
        createAlerts("error", "Error", "No hay turnos cargados");
        return;
      }
      const FILTEREDS_SHIFTS = DATA_LOCAL_STORAGE.filter(
        ({ document }) =>
          document == VALUE_SEARCH.get("search").replaceAll(".", "")
      );
      if (FILTEREDS_SHIFTS.length) {
        const tableHTML = buildTable(FILTEREDS_SHIFTS);

        let nodeTable = document.getElementById("table");
        nodeTable.innerHTML = tableHTML;
        return;
      } else {
        createAlerts("error", "Error", "No hay turnos cargados para este DNI");
        let nodeTable = document.getElementById("table");
        nodeTable.innerHTML = "";
        return;
      }
    });
  } catch (error) {}
};

const saveShift = () => {
  return fetch("http://localhost:3000/shifts", {
    method: "POST",
    body: JSON.stringify({
      firstName: newShift.firstName,
      lastName: newShift.lastName,
      email: newShift.email,
      speciality: newShift.speciality,
      document: newShift.document,
      dateTime: newShift.dateTime,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    response.json();
  });
};

const getShiftByDocument = (document) => {
  return fetch(`http://localhost:3000/shifts/?document=${document}`).then(
    (response) => {
      response.json();
    }
  );
};
