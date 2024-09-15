
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  function featuredBuild(id : number) {
    router.push(`/build/${id}/finish`);
  }

  return (
    <main className="prose mx-auto flex flex-col p-6 gap-12 w-full max-w-full">

      <div className="flex flex-col justify-center text-center text-zinc-200 h-96 w-full bg-cover bg-scroll bg-center bg-no-repeat shadow-lg [text-shadow:_2px_2px_64px_rgb(0_0_0_/_100%)]"
        style={{['backgroundImage' as any]: "url('https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg')"}}>
          
        <h1 className='text-zinc-100 text-8xl'>Building Dreams</h1>
        <p className='text-green-300 font-semibold text-3xl [text-shadow:_2px_2px_1px_rgb(0_0_0_/_100%)]'>The ultimate PC part picker</p>
      </div>
    
      <h2 className="text-zinc-200 mx-auto"> Featured Builds </h2>

      <div className="flex flex-row mx-auto gap-4">

        <button onClick={() => featuredBuild(2)} className="flex flex-row dark:bg-zinc-700 p-8 items-center gap-2">

          Budget
          <span className="material-icons "> savings </span>

        </button>

        <button onClick={() => featuredBuild(1)} className="flex flex-row dark:bg-zinc-700 p-8 items-center gap-2">

          Intermediate
          <span className="material-icons "> sports_esports </span>

        </button>

        <button onClick={() => featuredBuild(3)} className="flex flex-row dark:bg-zinc-700 p-8 items-center gap-2">

          Luxury
          <span className="material-icons "> local_atm </span>

        </button>

      </div>

      <div className='flex flex-col'>
        {/* Testimonials */}

        <div className='flex flex-row h-80 bg-zinc-800 justify-between items-center p-4'>
          <div>
            <h1 className='text-zinc-300'>Your Ultimate PC Solution</h1>
          </div>

          <Image className='h-full bg-contain bg-no-repeat shadow-lg'
            width={350}
            height={300}
            src="https://upload.wikimedia.org/wikipedia/commons/3/39/Das_Innenleben_eines_Gaming-PCs_aus_2021_20211126_HOF08249_RAW-Export_20220714004140.png"
            alt=""
            />

        </div>

      </div>
    </main>
  );
}
