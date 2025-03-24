"use client";
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
};

export default LoadingSpinner;