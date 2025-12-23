import React from 'react'
import bgImg from "@/assets/SignIn.png";
import SingUpCard2 from '@/components/layout/Singup/SingUpCard2';

const LoginPage = () => {
  return (
    <div className="relative w-screen h-screen">
    <div className="absolute inset-0 w-full h-full bg-cover" style={{backgroundImage:`url(${bgImg})`}}>
    <div className="absolute bg-black/20 inset-0"></div>
    <div className="relative z-10"><SingUpCard2 txt="in" /></div>
    </div>
    </div>
  )
}

export default LoginPage

