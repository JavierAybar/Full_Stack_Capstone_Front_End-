import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../redux/slices/authSlice';
import Spinner from '../components/Spinner';
import image from '../assets/car_logo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validateInput = () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }
    return true;
  };
const handleSubmit = (e) => {
  e.preventDefault();
  if (!validateInput()) return;
  dispatch(authenticateUser({ email, password }))
    .then((response) => {
      if (response.error) {
        console.error('Error response:', response.error);
        setEmail('');
        setPassword('');
      } else {
        navigate('/vehicles');
      }
    })
    .catch((error) => {
      console.error('Error in handleSubmit:', error);
    });
};
  return (
    <div className="login-page full-height container h-1/2 d-flex  align-items-center  justify-content-center" style={{ backgroundImage: `url(${image})` }}>
      <div className='login-blured'>

        <div className="login-form-div">
            <form onSubmit={handleSubmit} className="login-form">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
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
              <button
                type="submit"
                disabled={loading}
                className="w-full p-2 text-white bg-[#41c219] hover:bg-green-600 rounded"
                >
                Login
              </button>

              {loading && <Spinner />}
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

export default Login;
