import { AnimatePresence, motion } from "motion/react";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
  <div className="h-[100px] w-[200px] bg-orange-600 overflow-hidden flex items-center justify-center">
       
       <AnimatePresence>

        <motion.svg
        animate={{rotate:[20,0,-20]}}
        transition={{duration:0.5,repeat:Infinity}}
        className="text-white"
        xmlns="http://www.w3.org/2000/svg"
        width="94"
        height="94"
        viewBox="0 0 24 24"
        fill="none"
        
        stroke="currentColor"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-error-404"
        >
        <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path   animate={{opacity:[0,1,0]}}  transition={{duration:0.5,repeat:Infinity}} d="M3 8v3a1 1 0 0 0 1 1h3" />
        <motion.path  animate={{opacity:[0,1,0]}} transition={{duration:0.5,repeat:Infinity}} d="M7 8v8" />
        <motion.path animate={{opacity:[0,1,0]}} transition={{duration:0.5,repeat:Infinity}} d="M17 8v3a1 1 0 0 0 1 1h3" />
        <motion.path d="M21 8v8" />
        <motion.path animate={{opacity:[0,1,0]}} transition={{duration:0.5,repeat:Infinity}}
         d="M10 10v4a2 2 0 1 0 4 0v-4a2 2 0 1 0 -4 0" />
      </motion.svg>
          
                 </AnimatePresence>
  </div>
    </div>
  );
};

export default NotFound;
