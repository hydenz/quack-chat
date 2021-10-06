import Authentication from 'components/Authentication/Index';
import { useAppSelector } from 'hooks/useSelector';
import Main from 'components/Main/Index';

function App() {
  const authToken = useAppSelector((state) => state.currentUser.accessToken);

  return authToken ? <Main /> : <Authentication />;
}

export default App;
