import React, { Children } from 'react'

const CardNoImg = ({title,pText,children,color}) => {
const iconColors = {
  blue: "bg-blue-500/25",  
  green: "bg-green-500/25",
  yellow: "bg-yellow-500/25",
  red: "bg-red-500/25"
};
  return (
   <div className="card bg-base-100 w-70 shadow-sm">
  <div className="card-body">
    <div className={`flex ${iconColors[color]} rounded-full w-8 h-8 items-center justify-center`}>{children}</div>
    <h2 className="card-title">{title}</h2>
    <p>{pText}</p>
  </div>
</div>
  )
}

export default CardNoImg
