const FormCheck = ({ className, options, name, onChange, checked, required }) => {
  return (
    <div className={className}>
      {options.map((option, key) => (
        <div key={key} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={key}
            required={required}
            value={option.value}
            defaultChecked={checked === option.value}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor={key}>
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FormCheck;
