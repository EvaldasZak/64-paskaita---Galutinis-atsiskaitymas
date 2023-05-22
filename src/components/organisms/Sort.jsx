import React from "react";
import styled from "styled-components";

// Styled components
const SortWrapper = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-right: 5px;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Select = styled.select`
  appearance: none;
  padding: 8px 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: #888 transparent transparent transparent;
  pointer-events: none;
`;

const Sort = ({ setSortOrder }) => {
  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    setSortOrder(selectedValue); // Sort by ID (Descending order)
  };

  return (
    <SortWrapper>
      <Label htmlFor="sort-by">Sort by:</Label>
      <SelectWrapper>
        <Select name="sort-by" id="sort-by" onChange={handleSortChange}>
          <option value="date-desc">Date (Descending order)</option>
          <option value="date-asc">Date (Ascending order)</option>
          <option value="answers-desc">
            Number of responses (Descending order)
          </option>
          <option value="answers-asc">
            Number of responses (Ascending order)
          </option>
        </Select>
        <SelectArrow></SelectArrow>
      </SelectWrapper>
    </SortWrapper>
  );
};

export default Sort;
