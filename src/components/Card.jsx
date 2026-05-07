import React from "react";

/**
 * Professional Card Component for content containers
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.clickable - Make card clickable
 * @param {function} props.onClick - Click handler
 */
const Card = ({
  children,
  className = "",
  clickable = false,
  onClick,
  ...props
}) => {
  const classes = `
    bg-white rounded-lg border border-neutral-200 p-4 transition-all
    ${clickable ? "cursor-pointer hover:border-neutral-300 hover:shadow-md" : ""}
    ${className}
  `.trim();

  const Component = clickable ? "button" : "div";

  return (
    <Component
      className={classes}
      onClick={onClick}
      type={clickable ? "button" : undefined}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
