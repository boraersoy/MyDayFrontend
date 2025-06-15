import AsyncStorage from '@react-native-async-storage/async-storage';


export async function setData(key, value, callback){
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
        console.error("Error saving data", error);
        if (callback) {
            callback(error);
        }
    }


}

export async function getData(key, callback) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
        return null;
    }
    catch (error) {
        console.error("Error retrieving data", error);
        if (callback) {
            callback(error);
        }
    }
}