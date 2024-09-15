'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChatMessage, getChatHistory } from '@/app/lib/chat';
import { UserData, getUser } from '@/app/lib/users';
import ChatBubble from '@/app/ui/chat/chatbubble';

export default function Page({ params }: { params: { chatid: string } }) {
  const router = useRouter();
  const chatSocket = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState('');

  // const history = useRef<ChatMessage[]>([]);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);

  // function getMessageHistory() {
  //   let testmsg : ChatMessage[] = [
  //     {user:6, me: true, username:"me", message:"hi!"},
  //     {user:6, me: true, username:"me", message:"hello!"},
  //     {user:1, me: false, username:"admin", message:"hey whats up"},
  //     {user:6, me: true, username:"me", message:"my computer broke!"},
  //     {user:1, me: false, username:"admin", message:"oh no!"},
  //   ];
  //   testmsg.reverse();
  //   return testmsg;
  // }

  useEffect(() => {
    getUser().then(data => { setLoggedInUser(data); });

    const socket = new WebSocket("ws://127.0.0.1:8000/");
    socket.onopen = function (e) {
      console.log("The connection was setup successfully !");
    };
    socket.onclose = function (e) {
      console.log("Something unexpected happened !");
    };


    chatSocket.current = socket;
    return () => socket.close();
  }, []);

  // Update message handler each time. Hacky, but it works.
  useEffect(() => {
    if (chatSocket.current) {
      chatSocket.current.onmessage = function receiveMessage(e : MessageEvent<any>) {
        const data : ChatMessage = JSON.parse(e.data);
        console.log(`[prehist: ${JSON.stringify(history)}`);
        setHistory(() => ([data, ...history]));
      };
    }
  }, [history, loggedInUser, chatSocket]);
  
  function sendMessage() {
    if (message) {
      if (!loggedInUser) {
        alert("Not logged in!");
      }
      else {
        if (chatSocket.current) {
          let msg : ChatMessage = {
            user: loggedInUser.pk,
            username: loggedInUser.fields.username,
            message: message
          };
          chatSocket.current.send(JSON.stringify(msg));
          setMessage('');
          console.log(`Sent message: ${JSON.stringify(msg)}`);
          return;
        }
  
        alert("Failed to send message!");
      }
    }
  }

  // messages.reverse();

  return (
    <div className="flex flex-col h-full gap-4">
      <h1 className="text-center">Chat {params.chatid}</h1>
      <div className="flex flex-col-reverse flex-grow gap-2 overflow-y-auto">
        <div className="mt-auto"></div>
        {history.map((item, index) => (
          <ChatBubble msg={item} me={(loggedInUser && item.user === loggedInUser.pk) ?? false} key={index}></ChatBubble>
        ))}
      </div>

      <input type="text"
                    id="message"
                    className="ps-10 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Send a message..."
                    value={message}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter')
                        sendMessage();
                    }}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }} />
    </div>
  );
  }