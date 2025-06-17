import React from "react";

export interface SearchBarProps {
  searchQuery: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ searchQuery, onChange }: SearchBarProps) {
  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
      />
    </div>
  );
}
