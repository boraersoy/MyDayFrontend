
import {createContext, useState, useEffect, useContext} from "react";
import {getData, setData} from "@/utils/mobileStorage";
import {AuthContext} from "./AuthContext";
import HistoryService from "../api/requests/history";
import {BASE_URL} from "@/api/config/base";

export const HistoryContext = createContext({
    moodHistory: [],
    updateMoodHistory: (token) => {},
    addMood: (mood) => {},
    lastAddedMood: null,
});


export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState(null);
    const [lastAddedMood, setLastAddedMood] = useState({
        mood: {
            reason: '',
            description: '',
            mood: '',
            date: null,
        },
        timestamp: null,
    });

    const { token } = useContext(AuthContext);

    useEffect(() => {
        const initializeHistory = async () => {
            try {
                const storedHistory = await getData("moodHistory");
                const storedLastMood = await getData("lastMood");
                if (storedLastMood) {
                    setLastAddedMood(storedLastMood);
                } else {
                    setLastAddedMood({
                        mood: null,
                        timestamp: null,
                    });
                }
                if (storedHistory) {
                    setHistory(storedHistory);
                    return;
                }
                // If no history is found, get from db
                if (!token) {
                    return;
                }
                const history = await HistoryService.getHistory(token);

                console.log("History retrieved from DB:", history);
                setHistory(history);

            } catch (error) {
                console.error("Error retrieving mood history:", error);
            }
        };



        initializeHistory().then(() => {});
    }, []);

    const updateMoodHistory = async (token) => {
        try {
            const history = await HistoryService.getHistory(token);

            setHistory(history.filter(item => new Date(item.created_at).getTime() < new Date()));
            await setData("moodHistory", history);
        } catch (error) {
            console.error("Error updating mood history:", error);
        }
    };

    const addMood = async (mood) => {
        try {
            // Here you would typically send the mood to the server
            // For now, we just simulate adding it to the history
            // const updatedHistory = await HistoryService.getHistory(token);
            if (!lastAddedMood === null){
                return
            }
            const lastMood = {
                mood: mood,
                timestamp: new Date().toISOString(),
            }
            setLastAddedMood(lastMood);
            await setData("lastMood", lastMood);
            // setHistory(updatedHistory);
            // await setData("moodHistory", updatedHistory);
        } catch (error) {
            console.error("Error adding mood:", error);
        }
    };

    return (
        <HistoryContext.Provider value={{
            moodHistory: history,
            updateMoodHistory,
            addMood,
            lastAddedMood
        }}>
            {children}
        </HistoryContext.Provider>
    )
}