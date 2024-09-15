export default function PartChooser() {

    return (
      <>
        {links.map((link) => {
          // const LinkIcon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              className="flex flex-col h-full items-center justify-center gap-2 rounded-md bg-zinc-600 text-zinc-200 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
            >
              <p className="hidden md:block">{link.name}</p>
              <div className={styles.bubble}></div>
            </a>
          );
        })}
      </>
    );
  }
  