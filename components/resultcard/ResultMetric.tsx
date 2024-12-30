interface ResultMetricProps {
    value: string;
    label: string;
  }
  
  export function ResultMetric({ value, label }: ResultMetricProps) {
    return (
      <div className="text-center">
        <div className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">
          {value}
        </div>
        <p className="mt-2 text-gray-700">{label}</p>
      </div>
    );
  }