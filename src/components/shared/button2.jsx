import React from 'react'
import { Link } from 'react-router-dom'

const ButtonBg = ({text,url}) => {
  return (
     <Link 
      to={url} 
      className="inline-block border-2 border-transparent px-5 py-1 bg-[#4285F4] rounded-md text-white text-center no-underline "
    >
      {text}
    </Link>
  )
}

export default ButtonBg

