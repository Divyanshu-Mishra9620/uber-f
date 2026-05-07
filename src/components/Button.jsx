import React from "react";

/**
 * Professional Button Component with multiple variants
 * @param {Object} props
 * @param {string} props.children - Button text
 * @param {string} props.variant - 'primary' | 'secondary' | 'outline' (default: 'primary')
 * @param {string} props.size - 'sm' | 'md' | 'lg' (default: 'md')
 * @param {boolean} props.loading - Show loading state
 * @param {boolean} props.disabled - Disable button
 * @param {function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.type - Button type (default: 'button')
 * @param {JSX.Element} props.icon - Icon element to display before text
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
  icon,
  ...props
}) => {
  const baseClasses = "btn";
  const variantClasses = `btn-${variant}`;
  const sizeClasses = size === "sm" ? "btn-sm" : "";
  const loadingClasses = loading ? "btn-loading" : "";
  const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${loadingClasses} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={allClasses}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
