import { useState, useContext } from 'react';
import AuthContext from '../store/authContext';
import axios from 'axios';

const Auth = () => {
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(true);

  // const baseUrl = 'https://socialmtn.devmountain.com';
  const baseUrl = 'http://localhost:4000';

  const submitHandler = (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    // console.log('submitHandler called');
    axios
      .post(register ? `${baseUrl}/register` : `${baseUrl}/login`, body)
      .then(({ data }) => {
        console.log('AFTER AUTH', data);
        authCtx.login(data.token, data.exp, data.userId);
      })
      .catch((err) => {
        alert('Network Error. Please try again later.');
        setPassword('');
        setUsername('');
      });
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button className="form-btn">{register ? 'Sign Up' : 'Login'}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? 'Login' : 'Sign Up'}?
      </button>
    </main>
  );
};

export default Auth;
