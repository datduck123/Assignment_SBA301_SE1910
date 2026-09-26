import React from "react";

export default function SearchBar({ keyword, onSearchChange, placeholder }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || "Search records..."}
        value={keyword}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {keyword && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onSearchChange("")}
        >
          Clear
        </button>
      )}
    </div>
  );
}
