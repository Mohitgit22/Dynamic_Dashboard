
"use client";
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchFilter = ({ 
  onSearch, 
  placeholder = "Search by title or ID...",
  className = "",
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  // Handle search input change
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  
  // Clear search input
  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };
  
  return (
    <div className={`mb-4 ${className}`}>
      <div className={`flex items-center relative bg-white dark:bg-gray-800 border ${isFocused ? 'border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/30' : 'border-gray-300 dark:border-gray-700'} rounded-lg`}>
        <div className="flex items-center justify-center pl-3">
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full"></div>
          ) : (
            <Search size={18} className="text-gray-500 dark:text-gray-400" />
          )}
        </div>
        
        <input
          type="text"
          className="w-full py-2 px-3 bg-transparent text-gray-800 dark:text-gray-200 outline-none"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {searchTerm && (
          <button 
            onClick={clearSearch}
            className="flex items-center justify-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;