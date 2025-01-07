import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ServiceCard({ title, description, imageUrl }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative h-28 justify-center items-center flex">
        <Image
          src={imageUrl}
          alt={title}
          width={150} 
          height={75} 
          className="object-cover "
        />
      </div>
      <div className="">
        <h3 className="text-md font-semibold mb1 justify-center items-center flex">{title}</h3>
        <p className="text-sm justify-center items-center flex">{description}</p>
      </div>
    </div>
  );
}