import type { IconType } from "react-icons";
import { IoSpeedometerOutline, IoReaderOutline, IoLogOutOutline } from 'react-icons/io5';
import { SideMenuItem } from "../components/sidemenu/SideMenuItem";

interface MenuItem {
    title: string;
    subTitle: string;
    href: string;
    Icon: IconType;
}


const menuItems: MenuItem[] = [
    { title: 'Dashboard', subTitle: 'Visualizar datos', href: '/dashboard', Icon: IoSpeedometerOutline },
    { title: 'Tasks', subTitle: 'Ver mis tareas', href: '/dashboard/tasks', Icon: IoReaderOutline }
]


export const SideMenu = () => {
    return (
        <div id="menu" className="bg-gray-900 min-h-screen z-10 text-slate-300 w-80 left-0 overflow-y-scroll">
      <div id="logo" className="my-4 px-6">
        {/* Title */}
        <h1 className="text-lg md:text-2xl font-bold text-white">
          Zustand
          <span className="text-blue-500 text-xs"> StateManager</span>
          .
        </h1>
        <p className="text-slate-500 text-sm">Manejador de estados simple pero poderoso.</p>
      </div>

      {/*  Profile */ }
      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Bienvenido,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <img className="rounded-full w-8 h-8" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80" alt="" />
          </span>
          <span className="text-sm md:text-base font-bold">
            {/* { user?.fullName } */}
            Thomas Smith
          </span>
        </a>
      </div>

      {/* Menu Items */ }
      <nav id="nav" className="w-full px-6">

        {
          menuItems.map( item =>(
            <SideMenuItem key={item.href} {...item} />
          ) )
        }


        {/* Logout */}
        <a /* onClick={ logoutUser } */ className="mt-10">
          <div>
            <IoLogOutOutline />
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-slate-300 font-bold leading-5">Logout</span>
            <span className="text-sm text-slate-500 hidden md:block">Cerrar sesión</span>
          </div>
        </a>

      </nav>
    </div>
    )
}
