
import { isEqual } from "https://esm.run/date-fns";

export const isValidDateShift = () => {
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