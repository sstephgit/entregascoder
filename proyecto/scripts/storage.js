
  export const addSesionStorage = (user) => {
    if (sessionStorage.getItem("user")) {
      let dataStorage = JSON.parse(sessionStorage.getItem("user"));
      dataStorage.push(user);
      sessionStorage.setItem("user", JSON.stringify(dataStorage));
    } else {
      sessionStorage.setItem("user", JSON.stringify(user));
    } 
  }