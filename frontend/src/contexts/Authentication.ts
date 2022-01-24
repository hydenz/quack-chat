import { createContext } from 'react';

interface IAuthContext {
  accessToken: string;
  setAccessToken: (value: string | ((val: string) => string)) => void;
}

const AuthContext = createContext(null as unknown as IAuthContext);

export default AuthContext;
