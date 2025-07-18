import { Fragment,useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Badge } from './Badge';
import { MetricDisplay } from './MetricDisplay';
import { FeatureList } from './FeatureList';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    subtitle: string;
    badge: string;
    logo: string;
    title: string;
    description: string;
    metrics: Array<{
        value: string;
      label: string;
    }>;
    features: string[];
  };
}


export function Modal({ isOpen, onClose, data }: ModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle description view
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription =
  data.description.length > 100
    ? `${data.description.slice(0, 100)}...`
    : data.description;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all">
                <div className="flex justify-between items-start mb-8">
                  <Badge label={data.badge} />
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start p-6 sm:p-8 mb-12 space-y-6 md:space-y-0">
                  {/* Left Section */}
                  <div className="flex-1">
                    <h2 className="text-5xl font-bold mb-4">{data.subtitle}</h2>
                    <p className="text-gray-600 mb-4">
                      {isExpanded ? data.description : truncatedDescription}
                    </p>
                    <button
                      className="text-blue-600 hover:text-blue-700"
                      onClick={toggleDescription}
                    >
                      {isExpanded ? "See less" : "See more"}
                    </button>
                  </div>

                  {/* Right Section */}
                  <div className="md:ml-8">
                    <Image
                      src={data.logo}
                      alt={data.title}
                      width={120}
                      height={120}
                      className="object-contain mx-auto md:mx-0"
                    />
                  </div>
                </div>
                <div className="p-8 rounded-xl mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {data.metrics.map((metric, index) => (
                      <MetricDisplay
                        key={index}
                        value={metric.value}
                        label={metric.label}
                      />
                    ))}
                    <div className='px-4'>
                      <FeatureList features={data.features} />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}