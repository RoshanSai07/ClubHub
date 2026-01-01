import React from "react";
import { Link } from "react-router-dom";

const ButtonBg = ({ text, url }) => {
  return (
    <Link
      to={url}
      className="
        inline-flex items-center justify-center
        px-5 py-1.5
        bg-[#4285F4]
        text-white font-medium
        rounded-md
        transition-colors
        hover:bg-blue-600
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
    >
      {text}
    </Link>
  );
};

export default ButtonBg;
