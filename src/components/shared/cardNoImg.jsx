import React from "react";

const CardNoImg = ({ title, pText, children, color }) => {
  const iconColors = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    yellow: "bg-yellow-100",
    red: "bg-red-100",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 w-full">
      <div
        className={`flex items-center justify-center w-11 h-11 rounded-full mb-4 ${iconColors[color]}`}
      >
        <span className="text-xl">{children}</span>
      </div>

      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>

      <p className="text-sm text-gray-600 leading-relaxed">{pText}</p>
    </div>
  );
};

export default CardNoImg;
