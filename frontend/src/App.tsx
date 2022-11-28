import Authentication from "@pages/authentication";
import Main from "@pages/main";
import AuthContext from "@contexts/authentication";
import { useLocalStorage } from "@hooks";
import { Provider } from "react-redux";
import store from "redux/store";
import jwtDecode from "jwt-decode";

function App() {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

  const myId = accessToken && (jwtDecode(accessToken) as any).id;

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ accessToken, setAccessToken, myId }}>
        {accessToken ? <Main /> : <Authentication />}
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
