'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import ReactDOM from 'react-dom';

export default function Modal({ onClose, title, children }: { onClose: Function, title: string, children: React.ReactNode }) {
    const handleCloseClick = (e: any) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
    <div className='modal-overlay p-8'>
        <div className="dark prose dark:prose-invert prose-zinc w-full h-full max-w-full">
            <div className="modal flex flex-col dark:bg-zinc-700">
                <div className="modal-header">
                    <a href="#" onClick={handleCloseClick}>
                        x
                    </a>
                </div>
                {title && <h1 className='text-center'>{title}</h1>}
                {children}
            </div>
        </div>
    </div>
  )

  const ref = document.getElementById("modal-root");

  if (ref) {
    return ReactDOM.createPortal(
        modalContent,
        ref
      );
  }
  else {
    return modalContent;
  }
}