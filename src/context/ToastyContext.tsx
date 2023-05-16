import { createContext, useContext } from "react"

export type ToastyContent = {
  popupMsg: string[]
  setPopupMsg:(c: string[]) => void
}

export const ToastyContext = createContext<ToastyContent>({
  popupMsg: [],
  setPopupMsg: () => {}
});
export const useAccessContext = () => useContext(ToastyContext)
