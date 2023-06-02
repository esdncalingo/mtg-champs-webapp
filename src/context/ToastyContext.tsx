import React, { useContext } from "react"
import { PopupMessage } from "../helpers/props/properties";

type ToastyContextType = {
  popupMsg: PopupMessage[];
  setPopupMsg: React.Dispatch<React.SetStateAction<PopupMessage[]>>;
};

export const ToastyContext = React.createContext<ToastyContextType>({
  popupMsg: [],
  setPopupMsg: () => {},
});
export const useToastContext = () => useContext(ToastyContext)
