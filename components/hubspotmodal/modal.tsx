"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center max-h-full">
      <div className="bg-white p-4 rounded-lg shadow-2xl relative w-full max-w-7xl max-h-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Schedule a Meeting</h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        {children}

        {/* Modal Footer */}
        <div className="mt-4 flex justify-end">
          {/* <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            onClick={onClose}
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
}
