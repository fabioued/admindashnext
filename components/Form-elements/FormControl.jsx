import ErrorMessage from "./ErrorMessage";

const FormControl = ({
  className,
  id,
  name,
  label,
  value,
  onChange,
  errorMessage,
  required
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        className="form-control"
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        required={required}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default FormControl;
