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
  });
};

export const getShiftByDocument = (document) => {
  return fetch(`http://localhost:3000/shifts/?document=${document}`);
};

export const getUserByEmail = (email) => {
  return fetch(`http://localhost:3000/user/?email=${email}`);
};

export const saveUser = (user) => {
  return fetch("http://localhost:3000/user", {
    method: "POST",
    body: JSON.stringify({
      admind: user.admind,
      document: user.document,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
