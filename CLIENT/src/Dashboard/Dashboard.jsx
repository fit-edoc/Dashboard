import React, { useState, useEffect } from "react";
import { useData } from "../context/Datacontext";
import CampaignCard from "./CampaignCard";
import { LucideHome } from "lucide-react";
import StreamChart from "./StreamChart";
import Loader from "../ui/Loader";
import Nav from "../Components/Nav";
import { motion } from "motion/react";


const Dashboard = () => {
  const { campaign } = useData();

  if (!Array.isArray(campaign) || campaign.length === 0) {
    return (
      <div className="h-[500px] items-center flex flex-col  gap-3 justify-center">
       <motion.h1  animate={{rotateX:360,rotateZ:-360}} transition={{duration:3,ease:"backInOut" ,repeat:Infinity}} className="font-bold text-[20px] mb-6"> Loading campaigns</motion.h1>
        <Loader />{" "}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b to-[#004aad] via-[#98c4ff] from-teal-50">
   
      <Nav/>

      {/* Main Content Area */}
      <div className="min-h-screen w-full p-8">
        {/* Campaign List Section ) */}
        <div className="">
          <CampaignCard
            campaign={campaign} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
