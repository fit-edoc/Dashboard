import {LucideHome } from 'lucide-react'
import React from 'react'
 import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
       <div className="min-h-screen w-[100px] px-2 flex justify-center items-start py-8 border-r border-gray-600">
        <div className="h-screen w-full bg-primary  rounded-full flex flex-col gap-3 items-center justify-start">
          <img src="/images/Logo.png" sizes="50" alt="" />
        <Link to={'/'}>
        
        
         <button className="text-primary p-3 rounded-full hover:bg-[#004aad] hover:text-white transition duration-150">
            <LucideHome size={30} />
          </button>
           </Link>
        </div>
      </div>
    </div>
  )
}

export default Nav
