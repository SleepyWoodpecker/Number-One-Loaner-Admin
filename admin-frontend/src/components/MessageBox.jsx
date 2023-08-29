import React from "react";

function MessageBox({ children, color }) {
  return (
    <div
      className={`bg-${color}-100 rounded-md text-sm p-5 text-center font-semibold m-1 absolute top-80 z-50 opacity-90 w-80 left-0 right-0 mx-auto`}
    >
      {children}
    </div>
  );
}

export default MessageBox;
