import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { fetchVehicles } from '../../redux/reducers/vehiclesSlice';
import { addReservation } from '../../redux/reservation/reservSlice';

import image from '../../assets/mercedes-reservation.png';

function AddReservationPage() {
  // const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);

  // const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  // const userId = userFromLocalStorage ? userFromLocalStorage.id : null;
  const authUser = useSelector((state) => state.auth.user.data);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const onSubmit = (data) => {
    const formDataWithIds = {
      ...data,
      user_id: authUser.id,
      vehicle_id: id,
    };

    dispatch(addReservation(formDataWithIds)).then(() => {
      // Show a success toast message
      toast.success('Reservation added successfully!');
      // Redirect to "My Reservations"
      // navigate('/my-reservations');
    });
  };

  return (
    <div className="w-full bg-center bg-cover " style={{ backgroundImage: `url(${image})` }}>
      <div className="flex flex-col items-center 2xl:pt-[80px] lg:pt-[160px] pt-[130px] w-full h-screen bg-opacity-80 bg-lime-500 backdrop-opacity-60">
        <h2 className="mb-3 text-lg font-extrabold tracking-widest text-white sm:text-4xl">BOOK A VEHICLE TEST-RIDE</h2>
        <hr className="w-[60%] text-white border-t-4 mb-3" />
        <p className="sm:w-[45%] w-[90%] mb-10 text-sm font-semibold text-white sm:text-lg">
          There are 34 different versions of the Vespa. Today five series are
          in production: the classic manual transmission PX and the modern CVT transmission S,
          LX, GT and GTS. We have showrooms all over the globe which some include test-riding
          facilities. If you wish to find out if a test-ride is available in your area, please use
          the selector below.
        </p>
        <div className="mx-auto ">
          <form className="p-6 bg-white rounded shadow-lg sm:w-[430px] w-[340px]" onSubmit={handleSubmit(onSubmit)}>
            {/* City Input */}
            <label htmlFor="city" className="block mt-2 mb-2 text-sm font-medium text-gray-800 dark:text-back">
              Select your city
            </label>
            <input
              required
              id="city"
              type="text"
              name="city"
              placeholder="City"
              {...register('city', { required: true })}
              className="w-full p-2 mb-2 text-gray-900 border rounded focus:outline-none focus:shadow-outline dark:text-gray-500 "
            />

            {/* Date Input */}
            <label htmlFor="date" className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-back">
              Select a date
            </label>
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                required
                id="date"
                type="date"
                name="date"
                placeholder="Select date"
                {...register('date', { required: true })}
                min={new Date().toISOString().split('T')[0]}
                className="border rounded w-full text-gray-900 text-sm  ps-10 p-2.5  dark:placeholder-gray-400 dark:text-gray-500 focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className=" w-full mt-4 text-white bg-gradient-to-r from-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Book Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddReservationPage;
