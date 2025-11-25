import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useData } from "../context/Datacontext";
import { linearGradient } from "motion/react-client";
import StreamChart from "./StreamChart";
import Nav from "../Components/Nav";

const SinglePage = () => {

  const { selectcampaign, campaign } = useData();

  console.log(selectcampaign);
  return (
 <div className="flex min-h-screen bg-gradient-to-b to-[#004aad] via-[#98c4ff] from-teal-50">

<Nav/>

    <div className="min-h-screen w-full mx-auto flex flex-col px-8 py-4">
       <div className="mb-8 bg-gradient-to-b to-[#81b8ff] via-30% via-[#002f48a9] from-[#81b8ff] min-h-[25vw] p-4 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Analytics Overview
          </h2>

          <StreamChart />
        </div>
      <div className="   h-[100px]"></div>
    </div>
     </div>
  );
};

export default SinglePage;
