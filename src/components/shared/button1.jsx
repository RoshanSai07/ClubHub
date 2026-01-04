import React from "react";
import { Link } from "react-router-dom";

const ButtonOutline = ({ text, url }) => {
  return (
    <Link
      to={url}
      className=" inline-block border-2 border-blue-500 px-5 py-1 rounded-md text-[#4285F4] text-center no-underline transition hover:bg-blue-50 hover:shadow-sm"
    >
      {text}
    </Link>
  );
};

export default ButtonOutline;
