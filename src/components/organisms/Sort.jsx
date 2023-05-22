import React from "react";

const Sort = ({ toggleSortOrder }) => {
  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "date-desc") {
      toggleSortOrder(true); // Sort by ID (Descending order)
    } else if (selectedValue === "date-asc") {
      toggleSortOrder(false); // Sort by ID (Ascending order)
    }
  };

  return (
    <div id="question-sort">
      <label htmlFor="sort-by">Sort by:</label>
      <div className="select-wrapper">
        <select name="sort-by" id="sort-by" onChange={handleSortChange}>
          <option value="date-desc">Date (Descending order)</option>
          <option value="date-asc">Date (Ascending order)</option>
          <option value="answers-desc">
            Number of responses (Descending order)
          </option>
          <option value="answers-asc">
            Number of responses (Ascending order)
          </option>
        </select>
        <div className="select-arrow"></div>
      </div>
    </div>
  );
};

export default Sort;
