import React, { FC, ReactNode } from "react";

interface MainProps {
  children?: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  return <main className="max-w-768 mx-auto px-4 pb-8">{children}</main>;
};

export default Main;
