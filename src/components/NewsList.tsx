import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search articles..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
    />
  );
};

export default SearchBar;
