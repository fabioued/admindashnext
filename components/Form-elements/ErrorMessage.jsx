const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <p className="fw-light text-danger mt-1" style={{ fontSize: 12 }}>
      {message}
    </p>
  );
};

export default ErrorMessage;
