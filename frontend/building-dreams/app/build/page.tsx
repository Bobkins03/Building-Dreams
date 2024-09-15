'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuildResponse, createBuild, getBuilds } from '@/app/lib/builds';

export default function Page() {
    const [buildCode, setBuildCode] = useState('');
    const [builds, setBuilds] = useState<BuildResponse[]>([]);
    const router = useRouter();

    useEffect(() => {
        getBuilds().then((builds) => {
            console.log(`Got build data: ${JSON.stringify(builds)}`);
            setBuilds(builds);
        });
      }, []);

      
    function handleCode(term: string) {
        setBuildCode(term);
    }

    function linkBuild(buildid: number) {
        router.push(`/build/${buildid}/details`);
    }

    function gotoBuild() {
        let buildid = parseInt(buildCode);
        if (!isNaN(buildid)) {
            router.push(`/build/${buildid}/details`);
        }
    }

    function newBuild() {
        createBuild().then(buildid => {
            if (buildid) {
                router.push(`/build/${buildid}/details`);
            }
        });
    }

    return (
        <main className="prose mx-auto my-auto flex flex-col p-6 gap-8">
            <h1 className='text-center text-white mb-0'>Builds</h1>

            <div className="flex flex-col gap-2">
                {builds.map((item, index) => (
                    <button key={index} onClick={() => linkBuild(item.pk)} className="text-zinc-200 dark:bg-zinc-700 p-4">{item.fields.name}</button>
                ))}
            </div>

            <div className="flex flex-row mx-auto gap-4 h-8 items-center">
                <input type="text"
                    id="build-code"
                    className="ps-10 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter a Build Code..."
                    onChange={(e) => {
                        handleCode(e.target.value);
                    }} />

                <button className="flex flex-row dark:bg-zinc-700 items-center gap-2" onClick={gotoBuild}>
                    Go
                </button>
            </div>

            <div>
                <button className="w-full" onClick={newBuild}>
                    Or, Create New
                </button>
            </div>
       
      </main>
    );
  }