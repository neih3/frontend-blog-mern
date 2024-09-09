import React from "react";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler;
}

const Button = ({ children, style, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`py-2 px-3 text-[white]  rounded-lg flex cursor-pointer items-center gap-2`}
    >
      {children}
    </div>
  );
};

export default Button;
