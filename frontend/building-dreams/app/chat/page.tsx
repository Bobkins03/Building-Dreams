'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createChat, getChats, ChatResponse } from '@/app/lib/chat';
import ChatBubble from '@/app/ui/chat/chatbubble';

export default function Page() {
  const router = useRouter();
  const [chats, setChats] = useState<ChatResponse[]>([]);

  useEffect(() => {
    getChats().then((chats) => {
        console.log(`Got chat data: ${JSON.stringify(chats)}`);
        setChats(chats);
    });
  }, []);

  
  function linkChat(chatid: number) {
    router.push(`/chat/${chatid}`);
  }

  function newChat() {
    createChat()
    .then((chatId) => {
      if (chatId) {
        // alert("Chat created! " + chatId);
        router.push(`/chat/${chatId}`);
      }
      else {
        alert("Failed to create chat!");
      }
    })
  }

  return (
    <main className="prose mx-auto my-auto flex flex-col p-4 gap-4">
        <h1 className='text-center text-white mb-0'>Your Chats</h1>

        <div className="flex flex-col gap-2">
          {chats.map((item, index) => (
            <button key={index} onClick={() => linkChat(item.pk)} className="text-zinc-200 dark:bg-zinc-700 p-4">Chat {item.pk}</button>
          ))}
        </div>

        <div>
            <button className="w-full" onClick={newChat}>
              Create New
            </button>
        </div>
   
  </main>
);
  }