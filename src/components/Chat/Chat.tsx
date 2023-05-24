import React, { useState, useRef, useEffect } from 'react';
import { notification } from 'antd';
import ChatMessage from '../ChatMessage/ChatMessage';
import uploadServices from 'src/services/uploadServices';
import { isEmpty } from 'src/utils/isEmpty';
import { Message } from 'src/types/chatType';

const Chat = ({ setLoading }) => {
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [array, setArray] = useState([]);




  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
      {
        message: 'Hi, what would you like to learn about this legal case?',
        type: 'apiMessage',
      },
    ],
    history: [],
  });

  const { messages, history } = messageState;


  const req_qa_box = useRef(null);
  useEffect(() => {
    req_qa_box.current.scrollTop = req_qa_box.current.scrollHeight;
  }, []);

  const handlePressEnter = (e) => {
    if (e.key === 'Enter' && formValue) {
      handleMessage();
    }
  };

  const handleMessage = async () => {
    setFormValue('');
    const save = array.slice();
    save.push({ message: formValue, flag: false, sourceDocs: [] });
    save.push({ message: '...', flag: true });
    setArray(save);
    uploadServices
      .requestMessage(formValue, history)
      .then((res) => {
        console.log('response Message = ', res);
        const update = save.slice();
        update[update.length - 1].message = res.data.text;
        update[update.length - 1].flag = true;
        update[update.length - 1].sourceDocs = res.data.sourceDocuments;
        setArray(update);
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: res.data.text,
              sourceDocs: res.data.sourceDocuments,
            },
          ],
          history: [...state.history, [formValue, res.data.text]],
        }));
        console.log('history = ', history);
      })
      .catch((err) => {
        console.log('MEssage Error = ', err);
        notification.error({
          description: err.response.data.message,
          message: '',
          duration: 2,
        });
      });

  };

  return (
    <div className="flex w-full min-w-min">
      <div className="h-full flex flex-col flex-1 justify-between p-4 duration-500 overflow-hidden relative bg-white">
        <div className="relative w-full h-[calc(100vh-110px)]">
          <div
            ref={req_qa_box}
            className="relative flex w-full h-full flex-grow flex-col rounded-md border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] overflow-y-auto overflow-x-hidden"
          >
            {!isEmpty(array) ? (
              array.map((item, index) => {
                return (
                  <ChatMessage
                    key={index}
                    box_ref={req_qa_box}
                    message={item.message}
                    sourceDocuments={item.sourceDocs || []}
                    status={item.flag}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="relative flex w-full flex-col mt-53 p-2 rounded-md border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] ">
          <input
            ref={inputRef}
            className="m-0 w-full resize-none border-0 overflow-hidden bg-transparent py-2 pr-8 text-black dark:bg-transparent dark:text-white md:py-2 md:pl-4"
            value={formValue}
            required
            placeholder="SELECT A QUICK QUESTION OR ASK YOUR OWN QUESTION HERE........."
            onChange={(e) => setFormValue(e.target.value)}
            style={{
              maxHeight: '400px',
              height: '44px',
            }}
            onKeyDown={(e) => handlePressEnter(e)}
          />
          <button
            className="absolute right-2 top-2 rounded-sm m-3 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900"
            disabled={formValue ? false : true}
            onClick={() => handleMessage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-send"
            >
              <path d="M10 14l11 -11"></path>
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
