'use client';

import { useState, useEffect } from 'react';
import Modal from '@/app/ui/modal';
import PartsList from '@/app/ui/parts/parts-list';
import { fetchBuild, setBuildData, PartItem, BuildData } from '@/app/lib/builds';

export default function Page({ params }: { params: { buildid: string } }) {
    const [showModal, setShowModal] = useState(false);
    const [showType, setShowType] = useState('motherboards');

    const [buildName, setBuildName] = useState("");

    const [selectedMB, setSelectedMB] = useState<PartItem | null>(null);
    const [selectedPSU, setSelectedPSU] = useState<PartItem | null>(null);
    const [selectedCase, setSelectedCase] = useState<PartItem | null>(null);
    const [selectedCooling, setSelectedCooling] = useState<PartItem | null>(null);

    useEffect(() => {
        fetchBuild(params.buildid)
          .then((data) => {
            setBuildName(data.name);

            setSelectedMB(data.mb);
            setSelectedPSU(data.psu);
            setSelectedCase(data.case);
            setSelectedCooling(data.cool);
          })
      }, []);

    function showMBs() {
        setShowType('motherboards');
        setShowModal(true);
    }

    function showPSUs() {
        setShowType('psus');
        setShowModal(true);
    }

    function showCase() {
        setShowType('cases');
        setShowModal(true);
    }

    function showCooling() {
        setShowType('coolings');
        setShowModal(true);
    }

    function getTitle(type: string) {
        if (type == 'motherboards') return 'Select a Motherboard';
        if (type == 'psus') return 'Select a PSU';
        if (type == 'cases') return 'Select Case';
        if (type == 'coolings') return 'Select Cooling';
        return '';
    }

    function getUpdateName(type: string) {
        if (type == 'motherboards') return 'mb';
        if (type == 'psus') return 'psu';
        if (type == 'cases') return 'case';
        if (type == 'coolings') return 'cool';
        return '';
    }

    function onSelectPart(part: PartItem) {
        if (showType == 'motherboards') setSelectedMB(part);
        if (showType == 'psus') setSelectedPSU(part);
        if (showType == 'cases') setSelectedCase(part);
        if (showType == 'coolings') setSelectedCooling(part);
        
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

            <h1>Motherboard + Casing</h1>
            <h2 className="w-full text-center">{buildName}</h2>
            <div className="flex flex-row items-center justify-between">
                <span>Motherboard</span>
                <button onClick={showMBs}>{selectedMB?.name ?? 'Choose Motherboard'}</button>
            </div>
            <div className="flex flex-row items-center justify-between">
                <span>Power Supply</span>
                <button onClick={showPSUs}>{selectedPSU?.name ?? 'Choose PSU'}</button>
            </div>
            <div className="flex flex-row items-center justify-between">
                <span>Case</span>
                <button onClick={showCase}>{selectedCase?.name ?? 'Choose Case'}</button>
            </div>
            <div className="flex flex-row items-center justify-between">
                <span>Cooling</span>
                <button onClick={showCooling}>{selectedCooling?.name ?? 'Choose Cooling'}</button>
            </div>
        </div>
    );
  }