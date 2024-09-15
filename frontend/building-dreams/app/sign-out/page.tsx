'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/app/lib/users';

export default function Page() {
  const router = useRouter();

  function signOut() {
    logoutUser()
    .then((loggedOut) => {
      if (loggedOut) {
        localStorage.setItem('token', '');

        // router.refresh();
        router.push('/');
        router.refresh();
      }
      else {
        alert("Failed to logout!");
      }
    })
  }

  return (    
    <main className="prose mx-auto flex flex-col p-6 gap-8">
  
      <h1 className="text-zinc-200 mx-auto"> Sign Out? </h1>
      <button className="dark:bg-zinc-700 p-8" onClick={signOut}> Sign Out </button>

    </main>  
  
    );
  }