import React from "react";

interface FiltersProps {
  selectedAuthor: string;
  onAuthorChange: (author: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  authors: string[];
  types: string[];
}

const Filters: React.FC<FiltersProps> = ({
  selectedAuthor,
  onAuthorChange,
  selectedType,
  onTypeChange,
  authors,
  types,
}) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <select
        value={selectedAuthor}
        onChange={(e) => onAuthorChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">All Authors</option>
        {authors.map((author) => (
          <option key={author} value={author}>
            {author || "Unknown"}
          </option>
        ))}
      </select>

      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
