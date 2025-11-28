const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  error,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 font-semibold mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;