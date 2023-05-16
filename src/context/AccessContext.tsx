import { createContext, useContext } from "react"

export type AccessContent = {
  accessData: string
  setAccessData:(c: string) => void
}

export const AuthorizationContext = createContext<AccessContent>({
  accessData: '',
  setAccessData: () => {}
});
export const useAccessContext = () => useContext(AuthorizationContext)
