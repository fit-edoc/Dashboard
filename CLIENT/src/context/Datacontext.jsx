import axios from "axios";
import { createContext, useContext, useEffect, useState, useRef } from "react";

const DataContext = createContext(null);
const STREAM_POLL_INTERVAL = 5000; // 5 seconds for real-time updates

export const DataProdiver = ({ children }) => {

    // --- STATE ---
    const [campaign, setCampaign] = useState([]);
    const [selectcampaign,setSelectCampaign] = useState(null)
    const [streams, setStreams] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const eventSourceRef = useRef(null);

    // --- CAMPAIGN FETCH ---
    const getCampaign = async () => {
        try {
            const res = await axios.get("https://mixo-fe-backend-task.vercel.app/campaigns");
           
            setCampaign(res.data.campaigns);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
        }
    };

  
    useEffect(() => {
        getCampaign();

     
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);
  

    const getStreamsById = async(id) => {
        setLoading(true);
        setError(null);

       
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


    const value = {
        campaign,             
        streams,  
        selectcampaign,            
        getStreamsById       
       
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