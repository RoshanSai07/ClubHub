import Toast from "@/components/shared/toast";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SingUpCard1 = () => {
    const [user,setUser]=useState("");
    const [showToast,setShowToast]=useState(false);
    const handleBtnClick=(u)=>{
          setUser(u);
          setShowToast(true);
          setTimeout(()=>{
           setShowToast(false);
          },3000)

    }
  return (
    <div className="min-h-screen flex items-center justify-center min-w-screen">
        {showToast && <Toast msg={user}/>}
      <div className="card w-176 h-100 bg-base-100 card-xl shadow-sm flex items-center justify-center gap-6">
        <h2 className="card-title text-[24px] justify-center"> <svg
            width="38"
            height="34"
            viewBox="0 0 36 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2.66666L3 9.33332L18 16L33 9.33332L18 2.66666Z"
              fill="#4285F4"
            />
            <path
              d="M3 18.6667L18 25.3333L33 18.6667"
              stroke="#34A853"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 13.3333L18 20L33 13.3333"
              stroke="#FBBC05"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 22L18 28.6667L33 22"
              stroke="#EA4335"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>ClubHub</h2>
          <p className="font-extralight text-[32px]">
            Welcome to ClubHub</p>
          <div className="flex flex-col gap-4">
            <p className="text-center">Who are you?</p>
            <div className="flex gap-4">
            <button onClick={()=>handleBtnClick("Student")} className="text-blue-500 cursor-pointer active:bg-blue-500/25 p-2 active:rounded-2xl">Student</button>
            <button onClick={()=>handleBtnClick("ClubHead")} className="text-green-500 cursor-pointer active:bg-green-500/25 p-2 active:rounded-2xl ">Club Head</button>
            <button onClick={()=>handleBtnClick("Admin")} className="text-red-500 active:bg-red-500/25 p-2 active:rounded-2xl cursor-pointer ">Admin</button>
          </div>
          <div className=" mx-auto">
            <button className="btn btn-primary rounded-2xl w-32"><Link to="/singup1">Continue</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUpCard1;
