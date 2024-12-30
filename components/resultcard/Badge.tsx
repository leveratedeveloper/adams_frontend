interface BadgeProps {
    label: string;
  }
  
  export function Badge({ label }: BadgeProps) {
    return (
      <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
        {label}
      </span>
    );
  }