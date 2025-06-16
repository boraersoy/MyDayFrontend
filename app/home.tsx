import {StyleSheet, BackHandler, Image, TextInput, Dimensions, Alert} from 'react-native';

import { StyledText } from '@/components/StyledText';
import { StyledView } from '@/components/StyledView';
import { useRouter } from "expo-router";
import { AuthContext } from '@/context/AuthContext';
import React from "react";


import { MoodColors, TestMoodList } from '@/constants/MoodColors'
import MoodSelector from "@/components/MoodSelector";
import {HistoryContext} from "@/context/HistoryContext";
import WithNavbar from "@/components/ui/NavIconBar";
import {BASE_URL} from "@/api/config/base";


const imgCdn= "https://cdn.jsdelivr.net/gh/eyezkes/Avatars@main"



export default WithNavbar(function HomeScreen() {
    const [isExit, setIsExit] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [confirmedMood, setConfirmedMood] = React.useState("");
    const [image, setImage] = React.useState({
        current: require('@/assets/images/macarons.png'),
        next: null,
    });

    // const
    const { moodHistory, updateMoodHistory, addMood, lastAddedMood } = React.useContext(HistoryContext)
    const { user, logout, token } =  React.useContext(AuthContext);

    const [formData, setFormData] = React.useState({
        reason: '',
        description: '',
        mood: '',
    });
    const router = useRouter()
    React.useEffect(() => {
        if (!user) {
            // If the user is not authenticated, redirect to the auth screen
            logout();
            router.replace('/auth');
        }

        const loadData = async () => {
            if (moodHistory === null) {
                await updateMoodHistory(token);
            }
            if (lastAddedMood.timestamp && new Date(lastAddedMood.timestamp).getUTCSeconds() > new Date().getUTCSeconds() - 24 * 60 * 60 * 100) {
                    //@ts-ignore
                    setFormData({
                        reason: lastAddedMood.mood.reason || '',
                        description: lastAddedMood.mood.description || '',
                        mood: lastAddedMood.mood.mood || '',
                        date: new Date(lastAddedMood.timestamp).toISOString() // Set current date in YYYY-MM-DD format
                    })
                    setConfirmedMood(lastAddedMood.mood.mood)
                let imagePath = await fetch(`${BASE_URL}avatars?mood_type=${lastAddedMood.mood.mood.toLowerCase()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                    let imageData = await imagePath.json();
                //@ts-ignore
                    setImage(prevState => ({
                        ...prevState,
                        next: imageData.image_url
                    }))
                }
            setIsLoading(false);
        }

        loadData();

        const backAction = () => {
            if (isExit) {
                // If the user has pressed back twice, exit the app
                BackHandler.exitApp();
            }
            else {
                // If the user has not pressed back twice, show a toast or alert
                setIsExit(true);
                setTimeout(() => {
                    setIsExit(false);
                }, 2000); // Reset after 2 seconds
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => {
            backHandler.remove();
        };
    }, [isExit])
    const handleInputChange = (text: string, name: string) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: text
        }))
    }

    console.log(user)

    const onConfirmMood = async (mood: string) => {
        if (formData.reason === ""|| formData.description === "") {
            Alert.alert("Please fill in all fields before confirming your mood.");
            return;
        }
        setConfirmedMood(mood);
        //@ts-ignore
        setFormData(prevState => ({
            ...prevState,
            mood: mood,
            date: new Date().toISOString() // Set current date in YYYY-MM-DD format
        }))
        addMood({
            ...formData,
            mood: confirmedMood
        })
        //@ts-ignore
        let imagePath = await fetch(`${BASE_URL}avatars?mood_type=${lastAddedMood.mood.mood.toLowerCase()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        let imageData = await imagePath.json();
        setImage(prevState => ({
            ...prevState,
            next: imageData.image_url // Assuming the image is returned in the response
        }))
    }
    console.log(imgCdn + image.next)
  return (
    !isLoading && <StyledView style={styles.container}>

    {/*  TOP PART  */}
        <StyledView style={styles.cardContainer}>
            {
                TestMoodList.map((mood, index) => {
                    const days = ["Sat", "Sun", "Mon"]
                    return (
                        <StyledView key={index} style={{backgroundColor: mood?.bg, ...styles.card}}>
                            <StyledText style={{color: mood.color}} type="body">Jun</StyledText>
                            <StyledText style={{color: mood.color}} type="body">{14 + index}</StyledText>
                            <StyledText style={{color: mood.color}} type="body">{days[index]}</StyledText>
                        </StyledView>
                    )
                })
            }
            <StyledView style={styles.cardMisc}>
                <Image source={require('@/assets/images/calendar.png')}/>
                <StyledText style={{...styles.greyText, fontSize: 12 }}>Jun 16, Mon</StyledText>
            </StyledView>
            <StyledView style={styles.cardMisc}>
                <Image source={require('@/assets/images/fire.png')}/>
                <StyledText style={{...styles.greyText, fontSize: 12 }}>{user.streak.current}</StyledText>
            </StyledView>
        </StyledView>
      {/*// MAIN PART  */}
        <StyledView style={styles.mainContainer}>

            {
                image.next !== null ? <Image style={{...styles.image, left: 50, bottom: 50}} source={{uri: `${imgCdn}${image.next}`}}/>: <Image style={styles.image} source={{
                    uri: `${imgCdn}/bitmojis/${user.avatar_gender}/${user.avatar_age}/20087692.png` }}/>}


            <StyledView style={{...styles.reasonContainer, backgroundColor: image.next ? MoodColors[confirmedMood.toLowerCase()]?.bg : '#E0E0E0'}}>
                <StyledText style={{...styles.greyText, ...styles.titleText}}>Why are you feeling this way?</StyledText>
                <StyledView style={styles.reason}>
                    <StyledText style={{...styles.greyText}}>Because of:</StyledText>
                    {
                        image.next ? <StyledText style={{...styles.textInput, width: "40%", borderBottomWidth: 0, fontSize: 14, color: MoodColors[confirmedMood.toLowerCase()].color }}>{formData.reason}</StyledText>
                            : <TextInput style={{...styles.textInput, width: "40%"}} value={formData.reason} onChangeText={text => handleInputChange(text, "reason")} />
                    }
                </StyledView>
                {
                    image.next ? <StyledText style={{...styles.textInput, borderBottomWidth: 0, fontSize: 14, color: MoodColors[confirmedMood.toLowerCase()].color }}>{formData.description}</StyledText>
                        : <TextInput style={styles.textInput} value={formData.description} onChangeText={text => handleInputChange(text, "description")}  />
                }
            </StyledView>
        </StyledView>
    {/*//   SLIDER  */}
        {
        !image.next && <StyledView style={{ ...styles.slider, backgroundColor: 'transparent'}}>
            <MoodSelector onConfirmMood={onConfirmMood} />
        </StyledView>
        }
    </StyledView>
  );
}, 2)



const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 20,
        paddingTop: 50,
        height: Dimensions.get('window').height - 100,
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: 6,
        height: 200,
    },
    card: {
        borderRadius: 22,
        padding: 7,
        paddingHorizontal: 18,
        // width: "",
        height: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // width: 10
    },
    cardMisc: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        padding: 10,
        paddingVertical: 0,
        borderRadius: 16,
        backgroundColor: '#E0E0E0',
        color: '#7B7B7B',
        height: 35,
        // width: 100
    },
    image: {
        width: 400,
        height: 300,
        objectFit: 'contain',
    },

    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '50%',
        marginTop: '5%'
    },
    reasonContainer: {
        width: 150,
        height: 120,
        backgroundColor: '#E0E0E0',
        textAlign: 'center',
        padding: 10,
        borderRadius: 20,
        position: 'relative',
        top: -50,
        left: 0
    },
    reason: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "transparent",
        // marginBottom: 10,
    },


    greyText: {
        color: '#7B7B7B',
        fontSize: 14,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 16,
    },
    textInput: {
        borderBottomColor: '#7B7B7B',
        borderBottomWidth: 1,
        padding: 0,
        marginBottom: 5,
    },
    slider: {
        top: "5%"
    },
});

