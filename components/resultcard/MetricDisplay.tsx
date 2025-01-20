interface MetricDisplayProps {
    value: string;
    label: string;
  }
  
  export function MetricDisplay({ value, label }: MetricDisplayProps) {
    const isPercentage = value.startsWith('+');
    const displayClass = isPercentage 
      ? "text-7xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent"
      : "text-7xl font-bold bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent";
  
    return (
      <div className="text-center bg-gray-50">
        <div className={displayClass} style={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>{value}</div>
        <p className="mt-3 text-gray-700 max-w-[280px] mx-auto">{label}</p>
      </div>
    );
  }