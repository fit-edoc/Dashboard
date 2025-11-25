import React, { useEffect, useState } from "react";
import { useData } from "../context/Datacontext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye, MousePointer2, DollarSign, TrendingUp } from "lucide-react";

const MAX_POINTS = 50;

const MetricCard = ({ title, value, icon: Icon, color }) => (
  <div className="p-2 bg-[#a5ccff] rounded-xl">


  <div className="bg-[#ffffff50] backdrop-blur-[20px] border border-white/20 rounded-[20px] p-4 flex items-center gap-4 shadow-lg">
    <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
      <Icon size={24} className={color.replace("bg-", "text-")} />
    </div>
    <div>
      <p className="text-lg font-semibold text-gray-700">{title}</p>
      <h3 className="text-xl font-bold text-indigo-950">{value}</h3>
    </div>
  </div>
  </div>
);

const StreamChart = ({ currentMetric = "impressions" }) => {
  const { streams } = useData();
  const [data, setData] = useState([]);
  const [latestMetrics, setLatestMetrics] = useState({
    impressions: 0,
    clicks: 0,
    spend: 0,
    ctr: 0,
    campaign_id:""
  });


  console.log(latestMetrics)

  useEffect(() => {
    if (!streams) return;

    const latest = streams;
const date = new Date(latest.timestamp);
const time = date.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});
    const point = {
      time: time,
      impressions: latest.impressions,
      clicks: latest.clicks,
      conversions: latest.conversions,
      spend: latest.spend,
      ctr: latest.ctr,
      cpc: latest.cpc,
      conversion_rate: latest.conversion_rate,
       campaign_id:latest.campaign_id
    };

    setLatestMetrics({
      impressions: latest.impressions,
      clicks: latest.clicks,
      spend: latest.spend,
      ctr: latest.ctr,
      campaign_id:latest.campaign_id
    });

    setData((prev) => {
      const updated = [...prev, point];
      if (updated.length > MAX_POINTS) updated.shift();
      return updated;
    });
  }, [streams]);

  if (data.length === 0)
    return (
      <div className="flex items-center justify-center h-full text-white/50">
        Waiting for live stream...
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <h1 className="font-bold px-2 text-lg">{latestMetrics.campaign_id.toLocaleUpperCase()}</h1>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Impressions"
          value={latestMetrics.impressions.toLocaleString()}
          icon={Eye}
          color="bg-white/20"
        />
        <MetricCard
          title="Clicks"
          value={latestMetrics.clicks.toLocaleString()}
          icon={MousePointer2}
            color="bg-white/20"
        />
        <MetricCard
          title="Spend"
          value={`$${latestMetrics.spend.toLocaleString()}`}
          icon={DollarSign}
            color="bg-white/20"
        />
        <MetricCard
          title="CTR"
          value={`${latestMetrics.ctr}%`}
          icon={TrendingUp}
            color="bg-white/20"
        />
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[300px]  backdrop-blur-sm border border-white/10 rounded-2xl p-4 shadow-xl">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white capitalize">
            Live {currentMetric} Trends
          </h2>
          <div className="flex gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-green-400 text-black border border-green-500/30 animate-pulse">
              ● Live
            </span>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#98c4ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="black" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="time"
                stroke="#9ca3af"
                tick={{ fill: 'black', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#9ca3af"
                tick={{ fill: 'black', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey={currentMetric}
                stroke="white"
                fillOpacity={1}
                fill="url(#colorMetric)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StreamChart;
