import api from "@api";
import AuthContext from "@contexts/authentication";
import jwtDecode from "jwt-decode";
import { useContext, useState } from "react";
// import { useDispatch } from "react-redux";

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const { setAccessToken } = useContext(AuthContext);

  // const dispatch = useDispatch();

  const handleSignIn = async () => {
    const {
      data: { accessToken },
    } = await api.post("/signin", { username, password });

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    setAccessToken(accessToken);
    // dispatch({
    //   type: ACTION_TYPES.LOGGED_IN,
    //   payload: { accessToken, id: (jwtDecode(accessToken!) as any).id },
    // });
    // window.localStorage.setItem('accessToken', data.accessToken);
  };

  const handleSignUp = async () => {
    const { data } = await api.post("/signup", {
      username,
      password,
      nickname,
    });
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <div>
        <h1 className="inline-block">
          {isSignIn ? "Sign in Mode" : "Sign up Mode"}
        </h1>
        <button
          onClick={() => setIsSignIn((oldValue) => !oldValue)}
          className="ml-5 bg-editProfile-teal"
        >
          Switch Mode
        </button>
      </div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {!isSignIn && (
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={isSignIn ? handleSignIn : handleSignUp}>
        Submit
      </button>
    </div>
  );
};

export default Authentication;
