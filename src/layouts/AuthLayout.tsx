import { IoReaderOutline } from "react-icons/io5"
import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:flex lg:flex-col items-center justify-center bg-black">
        <i className="mx-auto w-auto">
            <IoReaderOutline size={150} color="white" />
        </i>
        <span className="text-white font-extralight text-6xl">Tasks</span>
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <Outlet />
      </div>
    </div>
  )
}
