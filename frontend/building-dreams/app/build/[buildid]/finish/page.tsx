'use client';

import { useState, useEffect } from 'react';
import { fetchBuild, BuildData, PartItem } from '@/app/lib/builds';
import CompatibleCheck from '@/app/ui/build/compatible-check';

interface PriceRef {
    name: string;
    price: number;
};

type PriceData = {
    cpu: PriceRef,
    gpu: PriceRef,
    ram: PriceRef,
    storage: PriceRef,
    mb: PriceRef,
    psu: PriceRef,
    case: PriceRef,
    cooling: PriceRef
};

export default function Page({ params }: { params: { buildid: string } }) {
    const [buildName, setBuildName] = useState("");
    const [curBuildData, setCurBuildData] = useState<BuildData | null>(null);

    const [prices, setPrices] = useState<PriceData>({
        cpu: {name: '', price: 0},
        gpu: {name: '', price: 0},
        ram: {name: '', price: 0},
        storage: {name: '', price: 0},
        mb: {name: '', price: 0},
        psu: {name: '', price: 0},
        case: {name: '', price: 0},
        cooling: {name: '', price: 0},
    });

    useEffect(() => {
        fetchBuild(params.buildid)
          .then((data) => {
            setCurBuildData(data);
            setBuildName(data.name);
            let nullObj = {name: 'None', price: 0};
            setPrices({
                cpu: data.cpu ?? nullObj,
                gpu: data.gpu ?? nullObj,
                ram: data.ram ?? nullObj,
                storage: data.stor ?? nullObj,
                mb: data.mb ?? nullObj,
                psu: data.psu ?? nullObj,
                case: data.case ?? nullObj,
                cooling: data.cool ?? nullObj,
            });
          })
      }, []);

    function copyBuildLink() {
        navigator.clipboard.writeText(window.location.href);
        alert("Build link copied to clipboard!");
    }

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className="flex flex-col gap-4">
            <h1>Finish</h1>
            <h2 className="w-full text-center">{buildName}</h2>

            <CompatibleCheck type="cpus" part={curBuildData?.cpu as PartItem} buildData={curBuildData} />
            <div className="flex flex-row items-center justify-between">
                <span>Processor</span>
                <span>{prices.cpu.name}</span>
                <span>{USDollar.format(prices.cpu.price)}</span>
            </div>

            <CompatibleCheck type="gpus" part={curBuildData?.gpu as PartItem} buildData={curBuildData} />
            <div className="flex flex-row items-center justify-between">
                <span>Graphics</span>
                <span>{prices.gpu.name}</span>
                <span>{USDollar.format(prices.gpu.price)}</span>
            </div>

            <CompatibleCheck type="rams" part={curBuildData?.ram as PartItem} buildData={curBuildData} />
            <div className="flex flex-row items-center justify-between">
                <span>Memory</span>
                <span>{prices.ram.name}</span>
                <span>{USDollar.format(prices.ram.price)}</span>
            </div>

            <CompatibleCheck type="storages" part={curBuildData?.stor as PartItem} buildData={curBuildData} />
            <div className="flex flex-row items-center justify-between">
                <span>Storage</span>
                <span>{prices.storage.name}</span>
                <span>{USDollar.format(prices.storage.price)}</span>
            </div>

            <CompatibleCheck type="motherboards" part={curBuildData?.mb as PartItem} buildData={curBuildData} />
            <div className="flex flex-row items-center justify-between">
                <span>Motherboard</span>
                <span>{prices.mb.name}</span>
                <span>{USDollar.format(prices.mb.price)}</span>
            </div>

            <CompatibleCheck type="psus" part={curBuildData?.psu as PartItem} buildData={curBuildData} />
            <div className="flex flex-row items-center justify-between">
                <span>Power</span>
                <span>{prices.psu.name}</span>
                <span>{USDollar.format(prices.psu.price)}</span>
            </div>

            <CompatibleCheck type="cases" part={curBuildData?.case as PartItem} buildData={curBuildData} />
            <div className="flex flex-row items-center justify-between">
                <span>Case</span>
                <span>{prices.case.name}</span>
                <span>{USDollar.format(prices.case.price)}</span>
            </div>

            <CompatibleCheck type="coolings" part={curBuildData?.cool as PartItem} buildData={curBuildData} />
            <div className="flex flex-row items-center justify-between">
                <span>Cooling</span>
                <span>{prices.cooling.name}</span>
                <span>{USDollar.format(prices.cooling.price)}</span>
            </div>

            <h2>Total Price</h2>
            <div className="flex justify-end">
                {USDollar.format(Object.values(prices).reduce((a, b) => a + b.price, 0))}
            </div>

            <div className="flex flex-row justify-end gap-2">
                <span>Your Build Code:</span>
                <span>{params.buildid}</span>
            </div>

            <div className="flex flex-row gap-4">
                <button className="grow" onClick={copyBuildLink}>Save</button>
                <button className="grow">Buy</button>
            </div>
        </div>
    );
  }