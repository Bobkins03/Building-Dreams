'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/lib/users';

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function newUser() {
    loginUser(username, password)
    .then((token) => {
      if (token) {
        localStorage.setItem('token', token);
        // alert("User logged in! token=" + token);
        router.push(`/`);
        router.refresh();
      }
      else {
        alert("Failed to login!");
      }
    })
  }

  return (    
    <main className="prose mx-auto flex flex-col p-6 gap-8">
  
      <h1 className="text-zinc-200 mx-auto"> Sign In </h1>
  
      <div className="flex flex-col mx-auto gap-6">
  
        <input className="dark:bg-zinc-700 text-zinc-200 p-8" placeholder="Username" onChange={(e) => { setUsername(e.target.value); }}  />
  
        <input type="password" className="dark:bg-zinc-700 text-zinc-200 p-8" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }}  />
  
        <button className="dark:bg-zinc-700 p-8" onClick={newUser}> Sign In </button>

        <Link className="text-blue-700 mx-auto" href="/sign-up" id="Sign Up"> Don&apos;t have an account? Sign Up </Link>

      </div>    

    </main>  
  
    );
  }