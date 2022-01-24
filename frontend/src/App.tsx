import Authentication from 'components/Authentication/Index';
import { useAppSelector } from 'hooks/useSelector';
import Main from 'components/Main/Index';
import AuthContext from 'contexts/Authentication';
import useLocalStorage from 'hooks/useLocalStorage';

function App() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {accessToken ? <Main /> : <Authentication />}
    </AuthContext.Provider>
  );
}

export default App;
