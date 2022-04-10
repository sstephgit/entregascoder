class Shift {
    constructor(firstName, lastName, document, email, dateTime) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.document = document;
        this.email = email;
        this.dateTime = dateTime;
    }
}

const SHIFT_LIST = [];
const FORMULARIO = document.getElementById("formulario");
const SEARCH = document.getElementById("search");

FORMULARIO.addEventListener("submit", (event) => {
    event.preventDefault();
    newShift();
    alert("turno agendado")
    FORMULARIO.reset();
});

SEARCH.addEventListener("submit", (event) => {
    event.preventDefault();
    listResults();
});

const newShift = () => {
    const DATA = new FormData(FORMULARIO);    
    SHIFT_LIST.push(new Shift(DATA.get("firstName"),
        DATA.get("lastName"),
        DATA.get("document"),
        DATA.get("email"),
        DATA.get("dateTime")));
}

const listResults = () => {
    const DATA = new FormData(SEARCH);
    const FILTEREDS_SHIFTS = SHIFT_LIST.filter((shift) => shift.document == DATA.get("search").replaceAll(".", ""));
    if (FILTEREDS_SHIFTS.length > 0) {
        console.log(FILTEREDS_SHIFTS);
    }
}






