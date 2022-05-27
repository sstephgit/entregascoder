import { isEqual } from "https://esm.run/date-fns";
import { getShiftByDocument, getUserByEmail } from "./fecth.js";
import { newShift } from "./index.js";
import { createAlerts } from "./utils.js";

export const isValidDateShift = async () => {
  try {
    let isValit = false;
    await getShiftByDocument(newShift.document)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          data.filter((shift) => {
            if (
              isEqual(new Date(shift.dateTime), new Date(newShift.dateTime))
            ) {
              createAlerts(
                "error",
                "error",
                "Ya existe un turno para esta fecha"
              );
              isValit = false;
            } else {
              isValit = true;
            }
          });
        } else {
          isValit = true;
        }
      });

    return isValit;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const validateUser = async (email, pass) => {
  try {
    let isValit = false;
    let userData = {};
    await getUserByEmail(email)
      .then((response) => response.json())
      .then((data) => {
        data.filter((user) => {
          if (user.email === email && user.password === pass) {
            isValit = true;
            userData = user;
          }
        });
      });

    return { isValit, userData };
  } catch (error) {
    console.log(error)
    return { isValit, userData };
  }
};
