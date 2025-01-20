'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import Image from 'next/image';

interface ResultCardProps {
    logo: string;
    badge: string;
    percentage: string;
    title: string;
    subtitle: string;
    description: string;
    metrics: {
      value: string;
      label: string;
    }[];
    features: string[];
  }
  
export function ResultCard(props: ResultCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="bg-gray-50 p-8 rounded-lg flex flex-col items-center text-center">
  {/* Logo */}
  <div className="h-16 mb-8">
    <Image
      src={props.logo}
      alt={props.title}
      width={150}
      height={64}
      className="object-contain"
    />
  </div>
    {/* Percentage */}
    <div className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent mb-4">
        <div style={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}> {props.percentage}</div> 
        </div>
        {/* Title */}
        <h3 className="text-xl font-semibold mb-4">{props.title}</h3>
        {/* Description */}
        <p className="text-gray-600 mb-4">
          {props.description.length > 100
            ? `${props.description.substring(0, 80)}...`
            : props.description}
        </p>
        {/* Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-600 font-semibold flex items-center hover:text-blue-700"
        >
          Read more
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={props}
      />
    </>
  );
}