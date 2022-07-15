import React, { useState } from "react";
import Select from "react-select";

import ErrorMessage from "./ErrorMessage";

const FormSelect = ({
  id,
  className,
  name,
  label,
  isMulti,
  placeholder,
  options,
  selectedOptions,
  setSelectedOptions,
  errorMessage,
  required
}) => {
  const [inputValue, setInputValue] = useState("");

  const exists = (value) =>
    selectedOptions.filter(
      (opt) => opt.value.toLowerCase() === value.toLowerCase()
    ).length > 0;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue && isMulti && !exists(inputValue)) {
      setSelectedOptions((prev) => [
        ...prev,
        { label: inputValue, value: inputValue },
      ]);
      setInputValue("");
    }
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <Select
        id={id}
        name={name}
        className="app-form-select"
        defaultValue={selectedOptions}
        value={selectedOptions}
        onChange={setSelectedOptions}
        options={options}
        required={required}
        isMulti={isMulti}
        placeholder={placeholder}
        inputValue={inputValue}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default FormSelect;
