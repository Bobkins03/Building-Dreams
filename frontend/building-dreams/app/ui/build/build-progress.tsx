import Link from 'next/link';
import NavLinks from '@/app/ui/build/nav-links';

export default function BuildProgress({ id }: { id: string }) {
  return (
    <div className="flex w-full flex-row justify-center bg-zinc-800 px-4 py-3 md:py-2">
      {/* <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link> */}
      <div className="flex gap-16 flex-row justify-center justify-between">
        <NavLinks id={id} />

      </div>
    </div>
  );
}
