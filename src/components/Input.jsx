import React from "react";

/**
 * Professional Input Component with icon support
 * @param {Object} props
 * @param {string} props.type - Input type (default: 'text')
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler
 * @param {string} props.error - Error message
 * @param {string} props.label - Label text
 * @param {string} props.icon - Icon emoji/symbol to display
 * @param {string} props.helper - Helper text below input
 * @param {boolean} props.disabled - Disable input
 * @param {string} props.className - Additional CSS classes
 */
const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  label,
  icon,
  helper,
  disabled = false,
  className = "",
  ...props
}) => {
  const inputClasses = `form-input ${error ? "border-red-500" : ""}`.trim();

  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <div className={icon ? "form-input-icon" : ""} data-icon={icon}>
        <input
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      </div>
      {error && (
        <div className="form-error">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}
      {helper && !error && <div className="form-helper">{helper}</div>}
    </div>
  );
};

export default Input;
