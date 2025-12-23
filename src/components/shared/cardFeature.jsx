import React from 'react'

const CardFeature = ({img,desc,title,eventDate}) => {
  return (
    <div className="w-70 shadow-sm h-90">
      <div>
        <img src={img} alt="Img" className="object-cover h-[40%]"/>
      </div>
      <div className="flex flex-col justify-between h-[50%]">
      <div className="pt-4 pl-4">
        <p className="font-medium">{title}</p>
        <p className="font-light">{desc}</p>
      </div>
      <div className="pt-4 pl-4 border-t">
        {eventDate}
      </div>
     </div>
    </div>
  )
}

export default CardFeature
