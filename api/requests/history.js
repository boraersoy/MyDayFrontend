import {BASE_URL} from "../config/base";


export default class HistoryService {
    static async getHistory(token) {
        if (!token) {
            return [];
        }
        const date = new Date();
        const today = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const todayLastYear = new Date(date.setFullYear(date.getFullYear() - 1)).toISOString().split('T')[0]; // Format: YYYY-MM-DD

        console.log(`Fetching history from ${todayLastYear} to ${today}`);

        let resultRaw = await fetch(`${BASE_URL}moods/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!resultRaw.ok) {
            throw new Error("Failed to fetch history");
        }
        return await resultRaw.json();
    }

    // static async addMood(mood, token) {
    //     if (!token) {
    //         return;
    //     }
    //     let resultRaw = await fetch("", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(mood),
    //     });
    //     if (!resultRaw.ok) {
    //         throw new Error("Failed to add mood");
    //     }
    //     return await resultRaw.json();
    // }
}