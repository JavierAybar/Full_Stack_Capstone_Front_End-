import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/authSlice';
import image from '../assets/car_logo.jpg';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validateInput = () => {
    if (!username || !email || !password || !passwordConfirmation) {
      alert('Please enter all required fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }
    if (password !== passwordConfirmation) {
      alert('Password and password confirmation do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    
    dispatch(registerUser({
      username, email, password, passwordConfirmation,
    }))
      .then((response) => {
        // Check if the response status is 200
        if (response.type === "auth/registerUser/fulfilled" ) {
          navigate('/vehicles');
        }
      })
  };

  return (
    <div className=" login-page container full-height h-1/2 d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${image})` }}>
      <div className="login-blured">
        <div className="login-form-div">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="mb-4 text-2xl font-bold">Registration</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
            />
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-2 mb-6 border rounded focus:outline-none focus:shadow-outline"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full p-2 text-white bg-[#41c219] hover:bg-green-600 rounded"
            >
              Register
            </button>

            {error && (
            <p className="mt-4 text-red-500">
              Error:
              {error}
            </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
