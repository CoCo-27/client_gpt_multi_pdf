import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import ChatMiddle from 'src/components/Chat/Chat';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sumText, setSumText] = useState('');
  const [buttonFlag, setButtonFlag] = useState(
    localStorage.getItem('disable_flag')
      ? JSON.parse(localStorage.getItem('disable_flag'))
      : false
  );

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div
      className={`flex h-screen w-full pt-[48px] sm:pt-0 ${
        loading === true ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {loading ? (
        <div className="absolute w-full h-full z-10 flex justify-center items-center">
          <Spin
            tip="Loading..."
            spinning={loading}
            size="large"
            style={{ width: '100%' }}
          ></Spin>
        </div>
      ) : (
        <></>
      )}
      <ChatMiddle setLoading={setLoading} />
    </div>
  );
};

export default Chat;
