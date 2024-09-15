'use client';

import Link from 'next/link'
import { useState, useEffect } from 'react';
import { UserData, getUser } from '@/app/lib/users';

const links = [
  { name: 'Chat', href: '/chat' },
  { name: 'Builds', href: '/build' },
  { name: 'Sign Out', href: '/sign-out' },
];

/**
 * The shared header component.
 */
export default function Header() {
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);

  useEffect(() => {
    function updateUser() {
      getUser().then(data => {
        console.log(`user: ${JSON.stringify(data)}`);
        setLoggedInUser(data);
      });
    }
    updateUser();
    
    window.addEventListener('storage', updateUser);
    return () => {
      // window.removeEventListener('storage', updateUser);
    }
  }, []);

  return (
    <header className="flex flex-row text-xl justify-between bg-zinc-800 text-zinc-200 p-4">
      <h1>
        <Link href="/" className="font-bold">Building Dreams</Link>
      </h1>

      <nav className="flex flex-row gap-4">
        {!loggedInUser && <Link className="text-base underline hover:no-underline" href={{pathname: 'sign-in'}}>Sign In</Link>}
        {loggedInUser &&
        <>
          <div className="text-base underline no-underline">{loggedInUser.fields.username}</div>
          {links.map((item, index) => (
            <Link
              className="text-base underline hover:no-underline"
              key={index}
              href={{pathname: item.href}}
              prefetch={false}
            >
              {item.name}
            </Link>
          ))}
        </>}

      </nav>

      {/* <HeaderDescription /> */}
    </header>
  )
}