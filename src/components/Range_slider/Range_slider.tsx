import React, { useState, ChangeEvent } from "react";

const RangeSlider = ({
  value,
  onRangeChange,
  className
}: {
  value: number;
  onRangeChange: (val: number) => void;
  className: string
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onRangeChange(Number(event.target.value));
  };

  return (
    <div className={`mx-auto w-full px-1.5 y-1.5 ${className}`}>
      <input
        className="w-full"
        name="scale"
        type="range"
        min="0.1"
        max="2"
        step="0.01"
        value={value}
        onChange={handleChange} />
    </div>
  );
};

export default RangeSlider;
