import { Dispatch, SetStateAction } from "react";


export function useDateTimePickerHandler(
  setValue: Dispatch<SetStateAction<Date>>,
  setVisible: Dispatch<SetStateAction<boolean>>
) {
  return (_: any, selectedDate?: Date) => {
    if (selectedDate) setValue(selectedDate);
    setVisible(false);
  };
}