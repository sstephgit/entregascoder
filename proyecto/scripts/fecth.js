
export const saveShift = (newShift) => {
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
    })
  };
  
export const getShiftByDocument = (document) => {
    return fetch(`http://localhost:3000/shifts/?document=${document}`)
  };