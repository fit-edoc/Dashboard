import React, { useState } from "react";
import { useData } from "../context/Datacontext";
import { Activity, CheckCircle, MousePointer2, PauseCircle, Share2Icon } from "lucide-react";
import {motion} from "motion/react"
import { Link, useNavigate } from "react-router-dom";
// Define the structure for the campaign data (using the expanded JSON structure)

/**
 * Maps an array of platform names to an array of unique image paths.
 * @param {string[]} platforms - An array of platform names (e.g., ["meta", "google", "linkedin"]).
 * @returns {string[]} An array of image paths corresponding to the platforms.
 */
const getAllPlatformIcons = (platforms) => {
  // Define a map for all known platforms and their icon paths
  const platformIconMap = {
    meta: "./images/meta.png",
    facebook: "./images/meta.png",
    instagram: "./images/meta.png",
    google: "./images/google.png",
    youtube: "./images/google.png",
    google_ads: "./images/google.png",
    linkedin: "./images/linkedin.png",
    email: "./images/email.png", // Example of a new icon
    // Define a fallback for any platform not explicitly listed
    default: "./images/enterprise.png",
  };

  if (!Array.isArray(platforms) || platforms.length === 0) {
    return []; // Return an empty array if no platforms are present
  }

  // 1. Map platform names to their icon paths
  const iconPathsWithDuplicates = platforms.map((platform) => {
    const key = platform;
    // Return the specific icon path, or the 'default' icon if the key is not found
    return platformIconMap[key] || platformIconMap["default"];
  });

  // 2. Use a Set to filter out duplicate paths (e.g., if "meta" and "facebook" are both present)
  return [...new Set(iconPathsWithDuplicates)];
};

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

// Main Component
const CampaignTable = ({ campaign }) => {



  const navigate = useNavigate()
  const { getStreamsById } = useData();

  const handleClick = (id) => {
    getStreamsById(id);
    navigate(`/single/${id}`);
 
    
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between px-3 items-end">
        <h2 className="text-2xl font-bold  mb-6">Campaign Dashboard Summary</h2>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Campaigns ({campaign.length})
        </h2>
      </div>
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
                <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider"
              >
                get Info
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className=" bg-gradient-to-b  via-[#98c4ff] from-teal-50 backdrop-blur-sm divide-y  divide-gray-700">
            {campaign.map((campaign) => (
              <tr
             
                key={campaign.id}
                className="hover:bg-[#597a827b]  transition duration-150"
              >
                {/* Name */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-neutral-800 cursor-pointer">
                  {campaign.name}
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 inline-flex items-center gap-2 text-xs leading-5 font-semibold rounded-full capitalize ${getStatusClasses(
                      campaign.status
                    )}`}
                  >
                    {campaign.status} {getStatusIcon(campaign.status)}
                  </span>
                </td>

                {/* Platform(s) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {campaign.platforms
                    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
                    .join(", ")}
                  <div className="flex gap-5 mt-1">
                    {getAllPlatformIcons(campaign.platforms).map(
                      (path, index) => (
                        <img
                          key={index} // Key is required for list items in React
                          src={path} // The individual image path (e.g., "./images/meta.png")
                          alt="Platform Icon" // Good for accessibility
                          className="w-5 h-5" // Tailwind classes to control size
                          title={campaign.platforms[index]} // Optional: show the platform name on hover
                        />
                      )
                    )}
                  </div>
                </td>

                {/* Budget */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-medium">
                  ${campaign.budget}
                </td>

                {/* Spent */}

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-medium">
                  ${campaign.daily_budget}
                </td>

                {/* Conversions */}
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-medium">
             
               
               
              <button    onClick={() => handleClick(campaign.id)} className="px-2 py-2 rounded-full shadow-[0px_1px_2px_0.5px_black] bg-gradient-to-br from-[#ffffff] to-[#7bb4ff]"><MousePointer2 className="rotate-90"/></button>  
                </td>

                {/* CPA */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignTable;
