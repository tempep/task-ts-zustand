import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth.store";
import toast from "react-hot-toast";

interface Inputs {
  email: string;
  password: string;
  remember: boolean;
}


export const LoginPage = () => {

  const navigate = useNavigate();


  const loginUser = useAuthStore(state => state.loginUser);

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      email: localStorage.getItem('remember-email') ? localStorage.getItem('remember-email')! : ''
    }
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password, remember }) => {
    try {
      await loginUser(email, password);
      if (remember) {
        localStorage.setItem('remember-email', email);
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(`${error}`);
    }
  }


  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-lg rounded-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <div className="relative">
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder=""
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-0 shadow-md focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register('email', { required: true })}
              />
              <label
                htmlFor="email"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Email address
              </label>
              {errors.email && <span className="text-red-600">The email is required</span>}
            </div>

            <div className="flex items-center justify-between">

            </div>
            <div className="relative flex items-center justify-between">

              <input
                id="password"
                type="password"
                placeholder=""
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-0 shadow-md focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register('password', { required: true })}
              />
              <label
                htmlFor="password"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Password
              </label>
              {errors.password && <span className="text-red-600">The password is required</span>}
            </div>


            <div className="mb-4 flex items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  {...register('remember')}
                />
                <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>

              </div>
              <div className="text-sm">
                <a href="#" className="font-semibold text-black underline hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>

            <div>
              <button type="submit"
                className="flex w-full justify-center rounded-md bg-black hover:bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p>Don't have an account already?</p>
            <Link to='/auth/register' className="hover:underline text-black underline hover:text-indigo-500">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </>

  )
}
