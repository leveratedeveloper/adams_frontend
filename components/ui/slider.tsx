'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number[];
    onValueChange?: (value: number[]) => void;
    ariaLabel?: string;
    showValue?: boolean;
  }
>(
  (
    {
      className,
      min = 0,
      max = 100,
      step = 1,
      defaultValue = [50],
      onValueChange,
      ariaLabel,
      showValue = true,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState(defaultValue);

    const handleValueChange = (newValue: number[]) => {
      setValue(newValue);
      onValueChange?.(newValue);
    };

    return (
      <div className="relative w-full">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            'relative flex w-full touch-none select-none items-center',
            className
          )}
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          aria-label={ariaLabel}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300">
            <SliderPrimitive.Range className="absolute h-full bg-blue-500" />
          </SliderPrimitive.Track>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"   className="w-4 h-4 fill-blue-500">
              <path fill-rule="evenodd" d="M6.333 4.478A4 4 0 0 0 1 8.25c0 .414.336.75.75.75h3.322c.572.71 1.219 1.356 1.928 1.928v3.322c0 .414.336.75.75.75a4 4 0 0 0 3.772-5.333A10.721 10.721 0 0 0 15 1.75a.75.75 0 0 0-.75-.75c-3.133 0-5.953 1.34-7.917 3.478ZM12 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" clip-rule="evenodd" />
              <path d="M3.902 10.682a.75.75 0 1 0-1.313-.725 4.764 4.764 0 0 0-.469 3.36.75.75 0 0 0 .564.563 4.76 4.76 0 0 0 3.359-.47.75.75 0 1 0-.725-1.312 3.231 3.231 0 0 1-1.81.393 3.232 3.232 0 0 1 .394-1.81Z" />
            </svg>
          <SliderPrimitive.Thumb
            className="relative block h-5 w-5 rounded-full border-2 border-blue-500 bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {showValue && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-blue-500">
                {value[0]}
              </div>
            )}
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>

        {/* Optional Labels for Min and Max */}
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
