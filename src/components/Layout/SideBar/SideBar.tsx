import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiX } from 'react-icons/hi';
import { notification } from 'antd';
import authServices from 'src/services/authServices';

const SideBar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [select, setSelect] = useState(0);

  const goToDashBoard = () => {
    setSelect(0);
    navigate('/dashBoard');
  };

  const goToTable = () => {
    setSelect(1);
    navigate('/userTable');
  };

  const goToChat = () => {
    setSelect(2);
    navigate('/chat');
  };

  const SignOut = () => {
    setSelect(3);
    const data = {
      email: localStorage.getItem('email'),
    };

    authServices
      .logOut(data)
      .then((result) => {
        notification.success({
          description: result.data.message,
          message: '',
          duration: 2,
        });
        localStorage.clear();
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          description: error.response.data.message,
          message: '',
          duration: 2,
        });
      });
  };

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96'
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>
      <div className="mx-[56px] mt-[50px] flex items-center">
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Admin Panel
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30"></div>
      <ul className="flex flex-col mb-auto pt-1">
        <button onClick={() => goToDashBoard()}>
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span className="font-bold text-brand-500 dark:text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
                </svg>
              </span>
              <p className="leading-1 flex ms-4 ml-4 font-bold text-navy-700 dark:text-white">
                Main Dashboard
              </p>
            </li>
            {select === 0 ? (
              <div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 right-0 dark:bg-brand-400"></div>
            ) : (
              <></>
            )}
          </div>
        </button>
        <button onClick={() => goToTable()}>
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span className="font-bold text-brand-500 dark:text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                </svg>
              </span>
              <p className="leading-1 flex ms-4 ml-4 font-bold text-navy-700 dark:text-white">
                Customer Table
              </p>
            </li>
            {select === 1 ? (
              <div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 right-0 dark:bg-brand-400"></div>
            ) : (
              <></>
            )}
          </div>
        </button>
        <button onClick={() => goToChat()}>
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span className="font-bold text-brand-500 dark:text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  viewBox="0 0 32 32"
                  height="1em"
                  width="1em"
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.802 20.283c0 1.23-0.857 2.237-1.904 2.237s-1.905-1.006-1.905-2.237v-7.321c0-1.23 0.857-2.237 1.905-2.237s1.904 1.007 1.904 2.237v7.321zM29.007 20.283c0 1.23-0.857 2.237-1.905 2.237s-1.905-1.006-1.905-2.237v-7.321c0-1.23 0.857-2.237 1.905-2.237s1.905 1.007 1.905 2.237v7.321zM20.164 3.649l1.222-2.193c0.1-0.179 0.070-0.388-0.065-0.463s-0.329 0.009-0.428 0.188l-1.25 2.244c-1.115-0.439-2.364-0.684-3.684-0.684-1.33 0-2.588 0.25-3.71 0.695l-1.256-2.254c-0.1-0.179-0.293-0.264-0.428-0.188s-0.165 0.284-0.065 0.463l1.228 2.204c-2.555 1.2-4.276 3.453-4.276 6.035 0 0.262 0.019 0.521 0.053 0.776h16.909c0.035-0.255 0.053-0.513 0.053-0.776 0-2.59-1.732-4.849-4.301-6.046zM12.097 7.477c-0.411 0-0.744-0.333-0.744-0.744s0.333-0.744 0.744-0.744 0.744 0.333 0.744 0.744c0 0.411-0.333 0.744-0.744 0.744zM19.861 7.477c-0.411 0-0.744-0.333-0.744-0.744s0.333-0.744 0.744-0.744 0.744 0.333 0.744 0.744c0 0.411-0.333 0.744-0.744 0.744zM7.45 11.211v12.471h0.007c0.087 1.053 1.056 1.89 2.23 1.89h12.541c1.173 0 2.142-0.837 2.23-1.89h0.007v-12.471h-17.014zM14.74 25.51v3.858c0 1.23-0.857 2.237-1.905 2.237s-1.904-1.007-1.904-2.237v-3.855zM21.088 25.508v3.86c0 1.23-0.857 2.237-1.905 2.237s-1.905-1.007-1.905-2.237v-3.86z"></path>
                </svg>
              </span>
              <p className="leading-1 flex ms-4 ml-4 font-bold text-navy-700 dark:text-white">
                Chat Setting
              </p>
            </li>
            {select === 2 ? (
              <div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 right-0 dark:bg-brand-400"></div>
            ) : (
              <></>
            )}
          </div>
        </button>
        <button onClick={() => SignOut()}>
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span className="font-bold text-brand-500 dark:text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
                </svg>
              </span>
              <p className="leading-1 flex ms-4 ml-4 font-bold text-navy-700 dark:text-white">
                Sign Out
              </p>
            </li>
            {select === 3 ? (
              <div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 right-0 dark:bg-brand-400"></div>
            ) : (
              <></>
            )}
          </div>
        </button>
      </ul>
    </div>
  );
};

export default SideBar;
