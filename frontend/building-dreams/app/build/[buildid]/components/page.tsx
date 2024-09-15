'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Modal from '@/app/ui/modal';
import PartsList from '@/app/ui/parts/parts-list';
import { fetchBuild, setBuildData, PartItem, BuildData } from '@/app/lib/builds';

export default function Page({ params }: { params: { buildid: string } }) {
    const [showModal, setShowModal] = useState(false);
    const [showType, setShowType] = useState('cpus');

    const [buildName, setBuildName] = useState("");

    const [selectedCPU, setSelectedCPU] = useState<PartItem | null>(null);
    const [selectedGPU, setSelectedGPU] = useState<PartItem | null>(null);
    const [selectedRAM, setSelectedRAM] = useState<PartItem | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<PartItem | null>(null);

    useEffect(() => {
        console.log(`get build ${params.buildid}`);
        fetchBuild(params.buildid)
          .then((data) => {
            setBuildName(data.name);

            setSelectedCPU(data.cpu);
            setSelectedGPU(data.gpu);
            setSelectedRAM(data.ram);
            setSelectedStorage(data.stor);
          })
      }, []);

    function showCPUs() {
        setShowType('cpus');
        setShowModal(true);
    }

    function showGPUs() {
        setShowType('gpus');
        setShowModal(true);
    }

    function showRAM() {
        setShowType('rams');
        setShowModal(true);
    }

    function showStorage() {
        setShowType('storages');
        setShowModal(true);
    }

    function getTitle(type: string) {
        if (type == 'cpus') return 'Select a Processor';
        if (type == 'gpus') return 'Select a GPU';
        if (type == 'rams') return 'Select RAM';
        if (type == 'storages') return 'Select Storage';
        return '';
    }

    function getUpdateName(type: string) {
        if (type == 'cpus') return 'cpu';
        if (type == 'gpus') return 'gpu';
        if (type == 'rams') return 'ram';
        if (type == 'storages') return 'stor';
        return '';
    }

    function onSelectPart(part: PartItem) {
        if (showType == 'cpus') setSelectedCPU(part);
        if (showType == 'gpus') setSelectedGPU(part);
        if (showType == 'rams') setSelectedRAM(part);
        if (showType == 'storages') setSelectedStorage(part);
        
        setBuildData(params.buildid, getUpdateName(showType), part.id.toString()).then((success) => {
            if (!success)
                alert(`Failed to update part!`);
        });

        setShowModal(false);
    }

    return (
        <div className="flex flex-col gap-4">
            {showModal &&
                <Modal title={getTitle(showType)} onClose={() => setShowModal(false)}>
                    <PartsList buildid={params.buildid} type={showType} selectPart={onSelectPart} />
                </Modal>
            }
            
            <h1>Components</h1>
            <h2 className="w-full text-center">{buildName}</h2>
            <div className="flex flex-row items-center justify-between">
                <span>Processor</span>
                {/* <button onClick={showCPUs}>Choose Processor</button> */}
                <button onClick={showCPUs}>{selectedCPU?.name ?? 'Choose Processor'}</button>
            </div>
            <div className="flex flex-row items-center justify-between">
                <span>Graphics</span>
                <button onClick={showGPUs}>{selectedGPU?.name ?? 'Choose GPU'}</button>
            </div>
            <div className="flex flex-row items-center justify-between">
                <span>Memory</span>
                <button onClick={showRAM}>{selectedRAM?.name ?? 'Choose RAM'}</button>
            </div>
            <div className="flex flex-row items-center justify-between">
                <span>Storage</span>
                <button onClick={showStorage}>{selectedStorage?.name ?? 'Choose Storage'}</button>
            </div>
        </div>
    );
  }