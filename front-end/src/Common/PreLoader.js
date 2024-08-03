import React from "react";
import { helix } from "ldrs";
helix.register();
const PreLoader = () => {
  return (
    <div className="grid place-items-center h-screen bg-gray-800 ">
      <l-helix size="110" speed="2.5" color="blue"></l-helix>
    </div>
  );
};

export default PreLoader;
