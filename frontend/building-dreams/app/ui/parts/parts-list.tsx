'use client';
import { useState, useEffect } from 'react';
import { fetchBuild, BuildData, PartItem, isPartCompatible, CPUData, GPUData, RAMData, StorageData, MotherboardData, PSUData, CaseData, CoolingData } from '@/app/lib/builds';

export default function PartsList({ buildid, type, selectPart }: { buildid: string, type: string, selectPart: Function }) {
  const [curBuildData, setCurBuildData] = useState<BuildData | null>(null);
  const [parts, setParts] = useState([]);
  const [partsFilter, setPartsFilter] = useState('');
  const [filterCompatible, setFilterCompatible] = useState(true);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // Grab the parts.
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/${type}/?format=json`)
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setParts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);

  useEffect(() => {
    fetchBuild(buildid)
    .then((data) => {
      setCurBuildData(data);
    })
  }, []); // filterCompatible

  function handleSearch(term: string) {
    console.log(term);
    setPartsFilter(term);
  }
  
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  function getPartDetails(part: PartItem) {
    if (type === 'cpus') {
      let cpuData = part as CPUData;
      return (<>
        <span className="w-32">Socket: {cpuData.CPU_socket}</span>
        <span className="w-32">TDP: {cpuData.TDP}</span>
        <span className="w-48">Clock Speed: {cpuData.clock_speed}</span>
        <span className="w-32">Cores: {cpuData.core_count}</span>
      </>);
    }
    if (type === 'gpus') {
      let gpuData = part as GPUData;
      return (<>
        <span className="w-64">Chipset: {gpuData.chipset}</span>
        <span className="w-48">Manufacturer: {gpuData.manufacturer}</span>
        <span className="w-48">Clock Speed: {gpuData.clock_speed}</span>
        <span className="w-32">Memory: {gpuData.memory}GB</span>
      </>);
    }
    if (type === 'rams') {
      let ramData = part as RAMData;
      return (<>
        <span className="w-64">Standard: {ramData.memory_standard} {ramData.clock_speed}</span>
        <span className="w-64">Memory: {ramData.modules} x {ramData.memory}GB</span>
      </>);
    }
    if (type === 'storages') {
      let storageData = part as StorageData;
      return (<>
        <span className="w-32">Type: {storageData.type}</span>
        <span className="w-64">Interface: {storageData.interface}</span>
        <span className="w-48">Cache: {storageData.cache}</span>
        <span className="w-48">Capacity: {storageData.capacity}{storageData.capacity_unit}</span>
      </>);
    }
    if (type === 'motherboards') {
      let mbData = part as MotherboardData;
      return (<>
        <span className="w-48">Socket: {mbData.CPU_socket}</span>
        <span className="w-48">Memory Slots: {mbData.memory_slots}</span>
        <span className="w-64">Max Memory: {mbData.max_memory}GB</span>
        {/* <span className="w-48">Type: {mbData.type}</span> */}
      </>);
    }
    if (type === 'psus') {
      let psuData = part as PSUData;
      return (<>
        <span className="w-32">Type: {psuData.type}</span>
        <span className="w-32">{psuData.wattage}W</span>
        <span className="w-48">Modular: {psuData.modular}</span>
      </>);
    }
    if (type === 'cases') {
      let caseData = part as CaseData;
      return (<>
        <span className="w-64">Type: {caseData.type}</span>
        <span className="w-32">Fans: {caseData.fan_count}</span>
        <span className="w-32">PSU: {caseData.power_supply}</span>
      </>);
    }
    if (type == 'coolings') {
      let coolingData = part as CoolingData;
      return (<>
        <span className="w-48">Type: {coolingData.type}</span>
        <span className="w-32">Fans: {coolingData.fan_count}</span>
        <span className="w-48">Max RPM: {coolingData.max_RPM}</span>
      </>);
    }
    
    return (<></>);
  }

  return (
    <div className='flex flex-col gap-4 overflow-y-hidden'>
      {/* focus:ring-blue-500 focus:border-blue-500  */}
      <input type="search"
        id="default-search"
        className="block w-full p-4 ps-10 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }} />
      <div className="px-1 flex flex-row items-center">
        <input type="checkbox" id="filter-compatible" name="scales" onChange={(e) => setFilterCompatible(e.target.checked)} checked={filterCompatible} />
        <label className="ml-2 mr-8"> Filter Compatible Parts</label>

        <input type="text"
          id="maxprice"
          className="w-16 h-8"
          value={maxPrice ?? ""}
          onChange={(e) => {
            let pr = parseInt(e.target.value)
            if (pr && !isNaN(pr))
              setMaxPrice(pr);
            else
              setMaxPrice(null);
          }}></input>
        <label className="ml-2"> Max Price</label>
      </div>
      <div className='flex flex-col gap-2 overflow-y-scroll'>
        {parts
        .filter((part: PartItem) => {
          return (!partsFilter
            || part.name.toLowerCase().includes(partsFilter.toLowerCase()))
            && (!filterCompatible || (curBuildData && isPartCompatible(type, part, curBuildData))
          && (!maxPrice || part.price <= maxPrice));
        })
        .map((part: PartItem, index) => (
          <div key={index} className='flex flex-row items-center justify-between p-2 odd:bg-zinc-600'>
            <div>{part.name}</div>
            <div className='flex flex-row items-center text-center gap-4'>
              {getPartDetails(part)}
              <button className="w-32" onClick={() => selectPart(part)}>{USDollar.format(part.price)}</button>
            </div>
          </div>
        ))}    
      </div>
  
    </div>
  );
}
  