const Input = ({ type, placeholder, onChange, className, onKeyDown }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={`input ${className}`}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
