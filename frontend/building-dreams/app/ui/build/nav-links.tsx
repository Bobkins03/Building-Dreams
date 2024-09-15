'use client';

import { usePathname } from "next/navigation";
import styles from "./bubble.module.css";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Details', href: 'details' },
  { name: 'Components', href: 'components' },
  { name: 'Motherboard + Casing', href: 'mbc' },
  { name: 'Finish', href: 'finish' },
];

export default function NavLinks({ id }: { id: string }) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        let href = `/build/${id}/${link.href}`;

        // const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={href}
            className="flex flex-col h-full items-center justify-center gap-2 rounded-md bg-zinc-600 text-zinc-200 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
          >
            <p className="hidden md:block">{link.name}</p>
            <div className={`${styles.bubble} ${pathname == href ? styles.bubbleActive : ""}`}></div>
          </a>
        );
      })}
    </>
  );
}
