import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom/dist';
import { useNavigate } from 'react-router-dom';

import SideBar from './SideBar/SideBar';
import NavBar from './NavBar/NavBar';

const Layout = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('resize', () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="flex h-full w-full">
      <SideBar open={open} onClose={() => setOpen(false)} />

      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
          <div className="h-full">
            <NavBar onOpenSidenav={() => setOpen(true)} />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Outlet />
            </div>
            <div className="p-3">
              <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
                <h5 className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
                  <p className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base">
                    @2023 Admin Panel
                  </p>
                </h5>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
