import { isPast } from "https://esm.run/date-fns";
import { saveShift, getShiftByDocument, saveUser } from "./fecth.js";
import { createAlerts, buildTable } from "./utils.js";
import { Shift } from "./class-shift.js";
import { isValidDateShift, validateUser } from "./validations.js";
import { addSesionStorage } from "./storage.js";

export let newShift = {};

const FORMULARIO = document.getElementById("formulario");
const SEARCH = document.getElementById("search");
const TAKE_SHIFT_BUTTOM = document.getElementById("take-shift");
const LOG_IN = document.getElementById("log-in-button");
const LOG_UP = document.getElementById("log-up-button");
const OPEN_LOG_UP = document.getElementById("open_log_up");
const LOG_IN_DATA = document.getElementById("login-data");
const LOG_UP_DATA = document.getElementById("logup-data");

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

const proccessShift = async (event) => {
  event.preventDefault();

  if (!createShift()) return;

  let isValid = await isValidDateShift();

  if (isValid) {
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

const processLogIn = async () => {
  const DATA = new FormData(LOG_IN_DATA);
  const EMAIL = DATA.get("email");
  const PASSWORD = DATA.get("password");

  let { isValit, userData } = await validateUser(EMAIL, PASSWORD);

  if (isValit) {
    createAlerts("success", `Hola ${userData.firstName}`, "Bienvenido");
    document.getElementById(
      "user-data"
    ).innerHTML = `<h1> Hola ${userData.firstName}</h1>`;
    document.getElementById("login").style.display = "none";
    document.getElementById("home").style.display = "block";
  } else {
    createAlerts("error", "Error", "Usuario o contraseña incorrectos");
  }

  addSesionStorage(userData);
};

const processLogUp = async () => {
  const DATA = new FormData(LOG_UP_DATA);
  const firstName = DATA.get("first_name");
  const lastName = DATA.get("last_name");
  const email = DATA.get("email_address");
  const document_number = DATA.get("document_number");
  const password = DATA.get("pass");

  try {
    await saveUser({ firstName, lastName, email, document_number, password });
    createAlerts("success", "Ok", "Usuario creado");
    LOG_UP_DATA.reset();
    document.getElementById("logup").style.display = "none";
    document.getElementById("login").style.display = "block";
  } catch (error) {
    createAlerts("error", "Error", error);
  }
};

const userDataLogin = () => {
  let userData = JSON.parse(sessionStorage.getItem("user"));
  if (userData) {
    document.getElementById("login").style.display = "none";
    document.getElementById("home").style.display = "block";
    document.getElementById(
      "user-data"
    ).innerHTML = `<h1> Hola ${userData.firstName}</h1>`;
  }
};

TAKE_SHIFT_BUTTOM.addEventListener("click", toggleButton);

FORMULARIO.addEventListener("submit", proccessShift);

SEARCH.addEventListener("submit", (event) => {
  event.preventDefault();
  listResults();
});

/* controles */

LOG_IN.addEventListener("click", (event) => {
  event.preventDefault();
  processLogIn();
});

LOG_UP.addEventListener("click", (event) => {
  event.preventDefault();
  processLogUp();
});

OPEN_LOG_UP.addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("logup").style.display = "block";
  document.getElementById("login").style.display = "none";
});

userDataLogin();
