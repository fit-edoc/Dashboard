import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useData } from "../context/Datacontext";
import { linearGradient } from "motion/react-client";
import StreamChart from "./StreamChart";
import Nav from "../Components/Nav";
import { Activity, CheckCircle, MousePointer2, PauseCircle, Share2Icon } from "lucide-react";
import { motion } from "motion/react";

const SinglePage = () => {

 


  // 1. Map platform names to their icon paths
 


const getStatusClasses = (status) => {
  switch (status) {
    case "active":
      return "bg-green-200 text-black/70";
    case "paused":
      return "bg-yellow-200 text-black/70";
    case "inactive":
    default:
      return "bg-gray-200 text-black/70";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "active":
      return (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-activity"
        >
          <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path 
          initial={{pathLength:"none"}}
        animate={{pathLength:[0,1],stroke:["green"]}}
        transition={{repeat:Infinity, duration:3,repeatType:"reverse",ease:"easeInOut"}} d="M3 12h4l3 8l4 -16l3 8h4" />
        </motion.svg>
      );
    case "paused":
      return <PauseCircle size={20} />;
    case "completed":
      return (
        <CheckCircle
          className="bg-green-500 rounded-full text-gray-100"
          size={20}
        />
      );
  }
};

  const { selectcampaign, campaign } = useData();


  
  return (
 <div className="flex min-h-screen bg-gradient-to-b to-[#004aad] via-[#98c4ff] from-teal-50">

<Nav/>

    <div className="min-h-screen w-full mx-auto flex flex-col px-8 py-4">
       <div className="mb-8 bg-gradient-to-b to-[#81b8ff] via-30% via-[#002f48a9] from-[#81b8ff] min-h-[25vh] p-4 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Analytics Overview
          </h2>

          <StreamChart />
        </div>
      <div className="mt-4  rounded-lg  min-h-[10vh]">
         <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-100">
        <table className="min-w-full divide-y  bg-[#ffffff66] backdrop-blur-2xl">
          {/* Table Header */}
          <thead className="bg-black">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
              >
                Campaign Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
              >
                Platforms
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider"
              >
                Budget
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider"
              >
                Daily-Budget
              </th>
              
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className=" bg-gradient-to-b   via-[#d0e4ff] from-teal-50  backdrop-blur-sm divide-y  divide-gray-700">
         
              <tr
             
                key={selectcampaign.id}
                className="transition duration-150"
              >
                {/* Name */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-neutral-800 cursor-pointer">
                  {selectcampaign.name}
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 inline-flex items-center gap-2 text-xs leading-5 font-semibold rounded-full capitalize ${getStatusClasses(
                      selectcampaign.status
                    )}`}
                  >
                    {selectcampaign.status} {getStatusIcon(selectcampaign.status)}
                  </span>
                </td>

                {/* Platform(s) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {selectcampaign.platforms}
                  
                </td>

                {/* Budget */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-medium">
                  ${selectcampaign.budget}
                </td>

                {/* Spent */}

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-medium">
                  ${selectcampaign.daily_budget}
                </td>

               
              </tr>
        
          </tbody>
        </table>
      </div>
      </div>
    </div>
     </div>
  );
};

export default SinglePage;
