import React, { useState, useEffect } from 'react';
import { useData } from '../context/Datacontext';
import CampaignCard from './CampaignCard';
import { LucideHome } from 'lucide-react';
import StreamChart from './StreamChart';


const Dashboard = () => {

const { campaign } = useData();

 


    if (!Array.isArray(campaign) || campaign.length === 0) {
        return <div className="p-8">Loading campaigns...</div>;
    }

  



  return (
    <div className="flex min-h-screen bg-gradient-to-b to-[#004aad] via-[#98c4ff] from-teal-50">
      
      {/* Sidebar/Navigation Area (unchanged) */}
      <div className="min-h-screen w-[100px] px-2 flex justify-center items-start py-8 border-r border-gray-600">
        <div className="h-screen w-full bg-primary  rounded-full flex flex-col gap-3 items-center justify-start">
          <img src="/images/Logo.png" sizes='50' alt="" />
          <button className='text-primary p-3 rounded-full hover:bg-[#004aad] hover:text-white transition duration-150'>
            <LucideHome size={30} />
          </button>
        </div>
      </div> 
      
      {/* Main Content Area */}
      <div className='min-h-screen w-full p-8'>
        
        {/* Analytics Section */}
        <div className='mb-8 bg-gradient-to-b to-[#81b8ff] via-30% via-[#002f48a9] from-[#81b8ff] min-h-[25vw] p-4 rounded-xl'>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Overview</h2>
            
            {/* 3. Conditional Rendering: Only render if the component is loaded */}
          
              
                <StreamChart  /> 
           
        </div>

        {/* Campaign List Section (unchanged) */}
      
       <div className="">
        <CampaignCard campaign={campaign} // Pass the function
                        />
       </div>
        
      </div>
    </div>
  );
}

export default Dashboard;