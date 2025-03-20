import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-opacity-50"></div>
    </div>
  );
};

export default Loader;
