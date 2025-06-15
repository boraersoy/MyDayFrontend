import {StyledView} from "./StyledView";
import {StyleSheet, Image} from "react-native";
import {StyledText} from "./StyledText";
import {MoodColors} from "../constants/MoodColors";

const emojis = {
    happy: "../assets/images/emojis/happy.png",
    sad: "../assets/images/emojis/sad.png",
    neutral: "../assets/images/emojis/neutral.png",
    angry: "../assets/images/emojis/angry.png",
    disgusted: "../assets/images/emojis/disgusted.png",
    surprised: "../assets/images/emojis/surprised.png",
    tired: "../assets/images/emojis/tired.png",
    peaceful: "../assets/images/emojis/peaceful.png",
    anxious: "../assets/images/emojis/anxious.png",
    embarrassed: "../assets/images/emojis/embarrassed.png",
    confident: "../assets/images/emojis/confident.png",
    amazing: "../assets/images/emojis/amazing.png",
}

export default function Card({item}) {
    let color = MoodColors[item.mood_type.name.toLowerCase()] || MoodColors.unknown;
    let parsedDate = new Date(item.created_at).toISOString().split("T")[0]; // Format: YYYY-MM-DD
    let emojiIdx = item.mood_type.name.toLowerCase();
    if (emojiIdx.includes("/")) {
        emojiIdx = emojiIdx.split("/")[1];
    }
    let emojiSrc = emojis[emojiIdx]
    return (
        <StyledView style={{...styles.cardContainer, backgroundColor: color.bg}}>
            <StyledView style={styles.titleContainer}>
                <StyledView style={styles.icon} >
                    {/*<Image style={styles.icon} source={require(`${emojiSrc}`)} />*/}
                </StyledView>
                <StyledView style={styles.titleTextContainer}>
                    <StyledText style={{...styles.titleText, color: color.color}}>{parsedDate}</StyledText>
                    <StyledText style={{...styles.titleText, color: color.color}}>{item.mood_type.name}</StyledText>
                </StyledView>
            </StyledView>
            <StyledView style={styles.descContainer}>
                <StyledView style={styles.descInner}>
                    <StyledText style={{...styles.descText, fontWeight: "bold", color:color.color}}>Because of: </StyledText>
                    <StyledText style={{...styles.descText, color:color.color}}>{item.reason?.name || "" }</StyledText>
                </StyledView>
                <StyledView style={styles.descInner}>
                    <StyledText style={{...styles.descText, color:color.color}}>
                        {item.note}
                    </StyledText>
                </StyledView>
            </StyledView>
        </StyledView>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        // height: 200,
        borderRadius:32,
        padding: 20,
        marginBottom: 30
    },
    titleContainer: {
        backgroundColor: "transparent",
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        alignItems: "center",
    },
    titleTextContainer: {
        backgroundColor: "transparent",
    },
    icon: {
        height: 40,
        width: 40,

    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    descContainer: {
        backgroundColor: "transparent",

    },
    descInner: {
        backgroundColor: "transparent",
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    descText: {
    },
    miscContainer: {},
    buttonText: {}
})