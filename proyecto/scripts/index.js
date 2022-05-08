import { isPast } from "https://esm.run/date-fns";
import { saveShift, getShiftByDocument } from "./fecth.js";
import { createAlerts, buildTable } from "./utils.js";
import { Shift } from "./class-shift.js";
import { isValidDateShift } from "./validations.js";

let newShift = {};

const FORMULARIO = document.getElementById("formulario");
const SEARCH = document.getElementById("search");
const TAKE_SHIFT_BUTTOM = document.getElementById("take-shift");

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

const listResults = async () => {
  try {
    const VALUE_SEARCH = new FormData(SEARCH).get("search").replaceAll(".", "");
    if (VALUE_SEARCH)
      getShiftByDocument(VALUE_SEARCH)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data) {
            createAlerts("error", "Error", "No hay turnos cargados");
            return;
          }
     
          if (data.length) {
            const tableHTML = buildTable(data);
            let nodeTable = document.getElementById("table");
            nodeTable.innerHTML = tableHTML;
            return;
          } else {
            createAlerts(
              "error",
              "Error",
              "No hay turnos cargados para este DNI"
            );
            let nodeTable = document.getElementById("table");
            nodeTable.innerHTML = "";
            return;
          }
        });
  } catch (error) {}
};

const proccessShift = (event) => {
  event.preventDefault();

  if (!createShift()) return;

  if (isValidDateShift()) {
    saveShift(newShift)
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
};

const toggleButton = (event) => {
  event.preventDefault();
  document.getElementById("home").style.display = "none";
  document.getElementById("shift").style.display = "block";
};

TAKE_SHIFT_BUTTOM.addEventListener("click", toggleButton);

FORMULARIO.addEventListener("submit", proccessShift);

SEARCH.addEventListener("submit", (event) => {
  event.preventDefault();
  listResults();
});
