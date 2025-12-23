
import React from 'react'

const FooterPage = () => {
  return (
    <div className="mt-15">
      <footer className="footer sm:footer-horizontal text-base-content p-10">
  <aside>
    <div className='flex justify-center items-center gap-1'>
   <svg
            width="72"
            height="64"
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
          </svg>
       <p className="font-bold text-[30px]">ClubHub</p>
       </div>
      <p className="font-light">
     Empowering student communities to connect,<br/> grow, and lead together
     </p>
  </aside>
  <nav>
    <h6 className="footer-title">Platform</h6>
    <a className="link link-hover">For Students</a>
    <a className="link link-hover">For Clubs</a>
    <a className="link link-hover">Admin Portal</a>
  </nav>
  <nav>
    <h6 className="footer-title">Support</h6>
    <a className="link link-hover">Handbook</a>
    <a className="link link-hover">Help</a>
    <a className="link link-hover">Contact</a>
  </nav>
</footer>
    </div>
  )
}

export default FooterPage
