"use client";

const SearchFilter = ({ onSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full p-2 border rounded-lg"
        placeholder="Search by title or ID..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
