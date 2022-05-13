import { format } from "https://esm.run/date-fns";

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
  
  export const buildTable = (data) => {
    let tableHTML = `
    <table class="mt-5 table table-hover">                
        <th>Nombre</th>
        <th>Fecha y Hora</th>
        <th>Especialidad</th>`;
      data.forEach(({ firstName, lastName, dateTime, speciality }) => {
      tableHTML += `
        <tr>
            <td>${firstName} ${lastName}</td>
            <td>${format(new Date(parseInt(dateTime)), "dd-MM-yyyy H:mm")}</td>
            <td>${getSpeciality(speciality)}</td>
        </tr>        
        `;
    });
  
    tableHTML += `</table>`;
  
    return tableHTML;
  };
  
  export const createAlerts = (icon, title, text) => {
    Swal.fire({
      icon,
      title,
      text,
    });
  };
  