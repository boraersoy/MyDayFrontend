import {StyledView} from "../components/StyledView";
import {StyledText} from "../components/StyledText";

import {StyleSheet, TouchableOpacity, FlatList, Dimensions, Image, ActivityIndicator} from "react-native";
import React from "react";
import {Colors} from "../constants/Colors";
import {Link} from "expo-router";
import WithNavbar from "../components/ui/NavIconBar";
import {HistoryContext} from "../context/HistoryContext";

import {filterQuotes, quotes} from "../constants/quotes";
import {filterTasks, tasks} from "../constants/tasks";

export default WithNavbar(function Uplift(){
    const { lastAddedMood } = React.useContext(HistoryContext);
    const [text] = React.useState({
        quote: Math.floor(Math.random() * filterQuotes(lastAddedMood && lastAddedMood.mood ? lastAddedMood.mood.mood : "").length),
        task: Math.floor(Math.random() * filterTasks(lastAddedMood && lastAddedMood.mood ? lastAddedMood.mood.mood : "").length),
    });


    return (
        <StyledView style={styles.container}>
            {
                lastAddedMood && lastAddedMood.mood
                    ? <>
                    <StyledView style={styles.container}>
                        <StyledText style={styles.title}>Hey, I see that you&#39;re {lastAddedMood?.mood?.mood.toLowerCase()}. Let&#39;s try something together</StyledText>
                        <StyledView style={styles.upliftContainer}>
                            <Image style={styles.image} source={require("../assets/images/bitmojis/female/young/uplift_young_woman.png")} />
                            <StyledView style={{display: "flex", flexDirection:"column", gap: 0}}>
                                <StyledText style={{...styles.title, color: "#7B7B7B", fontSize: 16, fontWeight: "bold", marginBottom: "10"}}>Todays Challange : </StyledText>
                                <StyledText style={styles.text}>{tasks[text.task].text} </StyledText>
                            </StyledView>
                        </StyledView>
                        <StyledText style={styles.quote}>{quotes[text.quote].text}</StyledText>
                    </StyledView>
                    </>
                    : <>
                    <StyledText style={styles.skipTextBold}>
                        Uupps! Looks like you skipped today&#39;s mood.
                    </StyledText>
                    <StyledView style={styles.skipImage} >
                        <Image style={styles.skipImage} source={require('../assets/images/bitmojis/female/young/no_uplift_young_woman.png')} />
                    </StyledView>
                    <StyledView style={styles.skipDescContainer}>
                        <StyledText style={styles.skipText}>First, head back to </StyledText>
                        <Link href={"/"} style={styles.skipLink}>home screen </Link>
                        <StyledText style={styles.skipText}>and get that mood in!</StyledText>
                    </StyledView></>
            }

        </StyledView>)
}, 1)


const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        height: Dimensions.get("window").height - 100,
        width: "100%",
        padding: 40
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
        color: Colors.default.text
    },
    text: {
        fontSize: 15,
        textAlign: "center",
        marginBottom: 20,
        color: Colors.default.text
    },
    upliftContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        gap: 20,
        width: "60%",
        marginVertical: 50,
        right: 10
    },
    image: {
        width: Dimensions.get("window").width /2 +20 ,
        height: Dimensions.get("window").width /2 +20,
        bottom: 30,

    },
    quote: {
        fontSize: 22,
        textAlign: "center",
        marginTop: "15%",
    },

    // MOOD ENTER

    // NO MOOD ENTER
    skipTextBold: {
        fontSize: 26,
        lineHeight: 38,
        textAlign: "center"
    },
    skipImageContainer: {

    },
    skipImage: {
        height: 400,
        width: 400,
    },
    skipText: {
        fontSize: 20,
        textAlign: "center",
        alignSelf: "center",
    },
    skipLink: {
        fontSize: 20,
        color: "teal",
        textAlign: "center"
    },
    skipDescContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"

    },

})