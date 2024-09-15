
import BuildProgress from '@/app/ui/build/build-progress';
import { useRouter } from 'next/navigation';

export default function Layout({ children, params }: { children: React.ReactNode, params: { buildid: string } }) {

  return (

    <div className="flex flex-col h-full justify-end md:overflow-y-hidden">
      <div className="prose dark:prose-invert prose-zinc w-full h-full flex-grow p-6 md:p-12 mx-auto">{children}</div>
    </div>
  );
}