'use client';

import { useState, useEffect } from 'react';
import { fetchBuild, setBuildData, BuildData } from '@/app/lib/builds';

export default function Page({ params }: { params: { buildid: string } }) {
    const [buildName, setBuildName] = useState("");

    useEffect(() => {
        console.log(`get build ${params.buildid}`);
        fetchBuild(params.buildid)
          .then((data) => {
            setBuildName(data.name);
          })
      }, []);
    
            
    function handleBuildName(term: string) {
        setBuildName(term);
        setBuildData(params.buildid, "name", term);
    }

    return (
        <div className="flex flex-col gap-4">
            <h1>Details</h1>
            <div className="flex flex-row items-center justify-between">
                <span>Build Name</span>
                {/* See https://github.com/gregrickaby/nextjs-app-router-examples/blob/main/components/blog/CommentForm.tsx */}
                <input type="text" id="buildname"
                value={buildName}
                onChange={(e) => {
                    handleBuildName(e.target.value);
                }} ></input>
            </div>
            {/* <div className="flex flex-row items-center justify-between">
                <span>Max Price</span>
                <div className="flex flex-row items-center gap-4">
                    $
                    <input type="text" id="rangeend" className="w-16" value="500"></input>
                </div>
            </div> */}
        </div>
    );
  }