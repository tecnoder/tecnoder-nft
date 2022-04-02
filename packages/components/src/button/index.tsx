import React from "react";

export type IButton = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const Button: React.FC<{[key:string]: any}> = ({ type, buttonType, children, className, disabled, onClick, ...rest }) => {
  return (
    <button type={buttonType} onClick={onClick} className={`button ${type} ${className}`} {...rest} disabled={disabled}>{children}</button>
  );
};
