import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ServiceCard({ title, description, imageUrl }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}