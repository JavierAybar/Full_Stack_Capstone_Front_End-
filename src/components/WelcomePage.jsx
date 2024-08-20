import image from '../assets/mercedes-home.png';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-center bg-no-repeat bg-contain bg-amber-500" style={{ backgroundImage: `url(${image})` }}>
      <div className='blured'>
        <div className="container pt-20 mx-auto text-center xl:w-[500px] sm:w-[350px] w-[300px]">
        <h1 className="mb-4 text-6xl font-extrabold">Welcome to Our Vehicle Reservation System</h1>
        <p className="mb-8 text-xl font-bold text-white rounded-full sm:text-2xl">Join us and explore a wide range of vehicles</p>
        <Link to="/login" className="min-w-[100px] px-4 py-2 m-2 font-semibold text-white rounded-full bg-lime-500 btn hover:bg-green-700">Login</Link>
        <Link to="/register" className="min-w-[100px] px-4 py-2 m-2 font-semibold text-white rounded-full bg-lime-500 btn hover:bg-green-700">Register</Link>
        </div>
      </div>

    </div>

  );
};

// style={{ backgroundImage: `url(${image})` }}
// flex flex-col items-center 2xl:pt-[80px] lg:pt-[160px] pt-[130px]
export default WelcomePage;
