import api from 'api';
import AuthContext from 'contexts/Authentication';
import jwtDecode from 'jwt-decode';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ACTION_TYPES } from 'store';

const Authentication = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setAccessToken } = useContext(AuthContext);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const {
      data: { accessToken },
    } = await api.post('/signin', { username, password });

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    setAccessToken(accessToken);
    // dispatch({
    //   type: ACTION_TYPES.LOGGED_IN,
    //   payload: { accessToken, id: (jwtDecode(accessToken!) as any).id },
    // });
    // window.localStorage.setItem('accessToken', data.accessToken);
  };
  return (
    <div>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Authentication;
