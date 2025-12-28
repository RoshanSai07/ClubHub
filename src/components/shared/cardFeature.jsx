import React from "react";

const CardFeature = ({ img, desc, title, eventDate }) => {
  return (
    <div className="w-70 h-90 border rounded-sm shadow-lg overflow-hidden flex flex-col bg-white">
      
      {/* Image */}
      <div className="h-[40%] w-full">
        <img
          src={img}
          alt="Img"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        
        {/* Title & Description */}
        <div className="p-4">
          <p className="font-medium text-base mb-1">{title}</p>
          <p className="font-light text-sm text-gray-600 line-clamp-3">
            {desc}
          </p>
        </div>

        {/* Date */}
        <div className="px-4 py-3 border-t text-sm text-gray-500">
          {eventDate}
        </div>

      </div>
    </div>
  );
};

export default CardFeature;
