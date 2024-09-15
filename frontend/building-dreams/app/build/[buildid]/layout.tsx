
import BuildProgress from '@/app/ui/build/build-progress';
import { useRouter } from 'next/navigation';

export default function Layout({ children, params }: { children: React.ReactNode, params: { buildid: string } }) {

  return (

    <div className="flex flex-col h-full justify-between md:overflow-hidden">
      <div className="flex-grow grow md:overflow-y-auto">
        <div className="prose dark:prose-invert prose-zinc flex-grow p-6 md:p-12 mx-auto">{children}</div>
      </div>
      {/* <div className="prose dark:prose-invert prose-zinc flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div> */}

      <div className="w-full flex-none py-4">
        <BuildProgress id={params.buildid} />
      </div>
    </div>
  );
}