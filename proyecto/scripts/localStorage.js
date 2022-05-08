/* Esto lo voy a modificar para la ultima entrega guardando los datos del usuario en el sesionStorage */

export const addLocalStorage = () => {
    if (localStorage.getItem("shiftList")) {
      let dataStorage = JSON.parse(localStorage.getItem("shiftList"));
      dataStorage.push(newShift);
      localStorage.setItem("shiftList", JSON.stringify(dataStorage));
    } else {
      localStorage.setItem("shiftList", JSON.stringify([newShift]));
    }
  };