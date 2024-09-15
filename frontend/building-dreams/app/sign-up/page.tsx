'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { createUser } from '@/app/lib/users';

export default function Page() {
  const { push } = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function newUser() {
    createUser(username, password)
    .then((created) => {
      if (created) {
        alert("User created!");
        push(`/sign-in`);
      }
      else {
        alert("Failed to create user!");
      }
    })
  }

  return (    
    <main className="prose mx-auto flex flex-col p-6 gap-8">
  
      <h1 className="text-zinc-200 mx-auto"> Sign Up </h1>
  
      <div className="flex flex-col mx-auto gap-6">
  
        <input className="dark:bg-zinc-700 text-zinc-200 p-8" placeholder="Username" onChange={(e) => { setUsername(e.target.value); }} />
  
        <input type="password" className="dark:bg-zinc-700 text-zinc-200 p-8" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} />

        <input type="password" className="dark:bg-zinc-700 text-zinc-200 p-8" placeholder="Confirm Password" />
  
        <button className="dark:bg-zinc-700 p-8" onClick={newUser}> Sign Up </button>

        <Link className="text-blue-700 mx-auto" href="/sign-in" id="Sign Up"> Have an account? Sign In </Link>

      </div> 

    </main>  
  
    );
  }