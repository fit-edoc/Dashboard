import axios from "axios";
import { createContext, useContext, useEffect, useState, useRef } from "react";

const DataContext = createContext(null);
const STREAM_POLL_INTERVAL = 5000; // 5 seconds for real-time updates

export const DataProdiver = ({ children }) => {

    // --- STATE ---
    const [campaign, setCampaign] = useState([]);
    const [selectcampaign,setSelectCampaign] = useState([])
    const [streams, setStreams] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const eventSourceRef = useRef(null);

    // --- CAMPAIGN FETCH ---
    const getCampaign = async () => {
        try {
            const res = await axios.get("https://mixo-fe-backend-task.vercel.app/campaigns");
            // API response structure seems to be { campaigns: [...] }
            setCampaign(res.data.campaigns);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
        }
    };

    // Initial load of static campaign list
    useEffect(() => {
        getCampaign();

        // Cleanup function to close EventSource when component unmounts
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);
    console.log("current item",selectcampaign)

    const getStreamsById = async(id) => {
        setLoading(true);
        setError(null);

        // Close existing connection if any
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        try {
            const res = await axios.get(`https://mixo-fe-backend-task.vercel.app/campaigns/${id}`)
            setSelectCampaign(res.data.campaign)
            const url = `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights/stream`;
            const eventSource = new EventSource(url);
            eventSourceRef.current = eventSource;

            eventSource.onopen = () => {
                console.log("Stream connected");
                setLoading(false);
            };

            eventSource.onmessage = (event) => {
                try {
                    const parsedData = JSON.parse(event.data);
                    setStreams(parsedData);
                } catch (e) {
                    console.error("Error parsing stream data:", e);
                }
            };

            eventSource.onerror = (err) => {
                console.error("Stream error:", err);
                eventSource.close();
                setError("Connection lost");
                setLoading(false);
            };

        } catch (err) {
            console.error("Failed to setup stream", err);
            setError(err);
            setLoading(false);
        }
    };

    // --- CONTEXT VALUE ---
    const value = {
        campaign,             // Array of static campaign list data
        streams,  
        selectcampaign,            // Array of real-time stream data points
        getStreamsById       // Function to stop polling
        // getCampaignById is not used in the UI flow, so we can omit it for brevity
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);

    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }

    return context;
};