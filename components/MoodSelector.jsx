import {StyledView} from "./StyledView";
import {FlatList, Image, Pressable, StyleSheet, TouchableOpacity} from 'react-native'
import React from "react";
import {Colors} from "@/constants/Colors";
import {StyledText} from "@/components/StyledText";
import {MoodColors} from "@/constants/MoodColors";


const moods = [
    { id: 1, name: 'Angry', src: require('../assets/images/icons/angry.png')},
    { id: 2, name: 'Surprised/Scared', src: require('../assets/images/icons/surprised.png')},
    { id: 3, name: 'Sad', src: require('../assets/images/icons/sad.png')},
    { id: 4, name: 'Loved', src: require('../assets/images/icons/loved.png')},
    { id: 5, name: 'Happy', src: require('../assets/images/icons/happy.png')},
    { id: 6, name: 'Disgusting', src: require('../assets/images/icons/disgusted.png')},
    { id: 7, name: 'Confident', src: require('../assets/images/icons/cool.png')},
    { id: 8, name: 'Neutral', src: require('../assets/images/icons/neutral.png')},
    { id: 9, name: 'Amazing', src: require('../assets/images/icons/amazing.png')},
    { id: 10, name: 'Overwhelmed/Tired', src: require('../assets/images/icons/tired.png')},
    { id: 11, name: 'Peaceful', src: require('../assets/images/icons/peaceful.png')},
    { id: 12, name: 'Anxious', src: require('../assets/images/icons/anxious.png')},
    { id: 13, name: 'Embarrassed', src: require('../assets/images/icons/embarassed.png')},
]
// [
//         {"name": "Amazing"},
//         {"name": "Overwhelmed/Tired"},
//         {"name": "Peaceful"},
//         {"name": "Anxious"},
//         {"name": "Embarrassed"},
export default function MoodSelector({ onConfirmMood }) {
    const [selectedMood, setSelectedMood] = React.useState("Happy");


    const handleConfirmMood = () => {
        onConfirmMood(selectedMood, MoodColors[selectedMood.toLowerCase().split("/")[0].trim()].bg);
    }

    const RenderItem = ({ item }) => {
        const isSelected = selectedMood === item.name;
        return (
            <TouchableOpacity
                style={{
                    ...styles.touchable,
                    backgroundColor: isSelected ? '#3AA6B94A' : 'transparent',
                    // borderWidth: isSelected ? 2 : 0,
                }}
                onPress={() => setSelectedMood(item.name)}
            >
                <Image
                    source={item.src}
                    style={styles.icon}
                />
            </TouchableOpacity>
        )
    }
    return (
        <StyledView style={styles.container}>
            <StyledView style={styles.bar}>
                <FlatList
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    data={moods}
                    showsHorizontalScrollIndicator={false}
                    renderItem={RenderItem} />
                <Pressable onPress={handleConfirmMood} style={styles.addIconContainer}>
                    <StyledText style={styles.addIcon}>+</StyledText>
                </Pressable>

            </StyledView>
            <StyledView style={styles.bottom} >
                <StyledText style={styles.moodText}>{selectedMood}</StyledText>
            </StyledView>
        </StyledView>
    )
}

const styles = StyleSheet.create({
    container : {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    bar: {
        paddingLeft: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.default.icon,
        height: 50,
        paddingHorizontal: 15,
        borderRadius: 30,

    },
    touchable: {
        width: 30,
        height: 30,
        margin: 5,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    icon : {
        width: 20,
        height: 20,
    },
    addIconContainer: {
        width: 40,
        height: 50,
        borderLeftWidth: 3,
        borderLeftColor: Colors.default.background,
        backgroundColor: Colors.default.icon,
        borderBottomRightRadius:30,
        borderTopRightRadius:30,
        marginRight: -15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addIcon: {
        fontSize: 25,
        paddingRight: 5,
        color: Colors.default.background,
    },
    bottom: {
        // backgroundColor: Colors.default.text,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    moodText: {

    },
})