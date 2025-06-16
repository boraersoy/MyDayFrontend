import {StyledView} from "../components/StyledView";
import {StyledText} from "../components/StyledText";
import Card from "../components/Card";

import {StyleSheet, TouchableOpacity, FlatList, Dimensions, Image} from "react-native";
import React from "react";
import {Colors} from "../constants/Colors";
import WithNavbar from "../components/ui/NavIconBar";

import {STATS} from "../constants/Stats";
import {MoodColors} from "../constants/MoodColors";
import Context from "../context/Context";
import {HistoryContext} from "../context/HistoryContext";
import {AuthContext} from "../context/AuthContext";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
]

export default WithNavbar(function History() {
    const [view, setView] = React.useState("Calendar");
    const [dateStr, setDateStr] = React.useState("");
    const [date, setDate] = React.useState(new Date());

    const { moodHistory, updateMoodHistory } = React.useContext(HistoryContext);
    const { token, user } = React.useContext(AuthContext);

    React.useEffect(() => {
        if (!dateStr){
            setDateStr(`${months[date.getMonth()]} ${date.getFullYear()}`)
            return;
        }
        updateMoodHistory(token)
        let monthIdx = months.findIndex((val) => val === dateStr.split(" ")[0].trim())
        let year = parseInt(dateStr.split(" ")[1].trim())
        setDate(new Date(year, monthIdx +1, 0))

    }, [dateStr])

    const handleDateChange = (d) => {
        let monthIdx = months.findIndex((val) => val === dateStr.split(" ")[0].trim())
        let isYearChange = false;
        let year = parseInt(dateStr.split(" ")[1].trim())
        if (d === "fw") {
            if (monthIdx === 11) isYearChange = true;
            setDateStr(`${months[(monthIdx +1 )% 12]} ${isYearChange ? year + 1 : year}`)
        }
        if (d === "bk") {
            if (monthIdx === 0) isYearChange = true;
            setDateStr(`${months[(monthIdx +11) % 12]} ${isYearChange ? year - 1 : year}`)
        }
    }


    return <StyledView style={styles.container} >
        <StyledView style={styles.headerContainer}>
            <StyledText style={styles.headerText}>Your {view}</StyledText>
            <StyledView style={styles.headerMisc}>
                <StyledView style={{...styles.iconContainer, ...styles.leftIconContainer}}>
                    {
                        view === "Calendar" ? <TouchableOpacity style={{...styles.icon, ...styles.iconSelected}} onPress={() => {}}>
                            <Image style={{width: 20, height: 20}} source={require("../assets/images/calendar.png")} />
                        </TouchableOpacity>: <TouchableOpacity style={styles.icon} onPress={() => setView("Calendar")}>
                            <Image style={{width: 20, height: 20}} source={require("../assets/images/calendar.png")} />
                        </TouchableOpacity>
                    }

                </StyledView>
                <StyledView style={styles.iconContainer}>
                    {
                        view === "Diary" ? <TouchableOpacity style={{...styles.icon, ...styles.iconSelected}} onPress={() => {}}>
                            <Image style={{width: 20, height: 20}} source={require("../assets/images/diary.png")} />
                        </TouchableOpacity>: <TouchableOpacity style={styles.icon} onPress={() => setView("Diary")}>
                            <Image style={{width: 20, height: 20}} source={require("../assets/images/diary.png")} />

                        </TouchableOpacity>
                    }
                </StyledView>
            </StyledView>
        </StyledView>
        <StyledView style={styles.dateContainer}>
            <TouchableOpacity onPress={() => handleDateChange("bk")}>
                <StyledText style={styles.dateText}> {`< `} </StyledText>
            </TouchableOpacity>
            <StyledText style={styles.dateText}>
                {dateStr}

            </StyledText>
            <TouchableOpacity onPress={() => handleDateChange("fw")}>
                <StyledText style={styles.dateText}> {` >`} </StyledText>
            </TouchableOpacity>
        </StyledView>
        {
            view === "Calendar" ? <Calendar date={date} email={user?.email} /> : <Diary history={moodHistory} />
        }
    </StyledView>
},3)

const randomColors = {
    0:"red",
    1:"yellow",
    2:"yellow",
    4:"yellow",
    6:"green",
    10:"purple",
    13:"purple",
    19:"yellow",
    25:"green",
    26:"red",
    27:"red",
    30:"red",
}



function Calendar({ date, email }) {
    const [layout, setLayout] = React.useState({
        height: 0,
        width: 0
    })
    const [dateData, setDateData] = React.useState({
        daysTotal: 0,
        offset: 0,
    })
    const today = new Date();
    React.useEffect(() => {
        let daysTotal = daysInMonth(date.getMonth(), date.getFullYear())
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 0).toString().split(" ")[0]
        let offset = days.findIndex((val) => val === firstDay)

        setDateData({
            daysTotal,
            offset,
        })
    }, [date])


    let fillAllIconPlace = Array(42).fill(0).map((_, idx) => idx  -dateData.offset)
    return (
        <StyledView style={styles.calendarContainer}>
            <StyledView style={styles.daysContainer}>
                <FlatList
                    data={days}
                    renderItem={({item}) =>
                        <StyledText style={{...styles.daysText, width: (layout.width -70) /7, marginLeft: 10}}>
                            {item}
                        </StyledText>}
                    numColumns={7}
                    horizontal={false}
                />
            </StyledView>
            <StyledView style={styles.calendarIconsContainer}>
                <FlatList
                    onLayout={(event) => setLayout(event.nativeEvent.layout)}
                    data={fillAllIconPlace}
                    renderItem={({ item }) => {
                        let idx = STATS[item % STATS.length]
                        if (idx !== undefined) {
                            idx = idx.mood.toLowerCase();
                        } else {
                            idx = "";
                        }
                        let color = idx ? MoodColors[idx.toLowerCase()].bg: ""
                        color = email === "sb@example.com" ? color : MoodColors.unknown.bg

                        let style = {
                            width: (layout.width -70) /7,
                            marginLeft: 10,
                            backgroundColor: date.getMonth() !== new Date().getMonth() || today.getDate() -1 < item ? "transparent": color,
                            borderWidth: 0
                        }
                        return (
                            item > 0 && item <= dateData.daysTotal ? <StyledView
                                style={{...styles.calendarIcons, ...style}}>
                                <StyledText style={styles.calendarIconText}>{item}</StyledText>
                            </StyledView> : <StyledView style={{
                                ...styles.calendarIconInvisible,
                                width: (layout.width - 70) / 7,
                                marginLeft: 10
                            }}>

                            </StyledView>
                        )
                    }}
                    keyExtractor={(_item, idx) => idx.toString()}
                    numColumns={7}
                    horizontal={false}

                />
            </StyledView>
        </StyledView>
    )
}
export function Diary({ history }) {
    const [cardData, setCardData] = React.useState([]);

    React.useEffect(() => {
        let myHistory = [...history];
        myHistory.filter((item) => true);
        myHistory.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setCardData(myHistory);
    }, [history])

    return (
        <StyledView style={styles.diaryContainer}>
            <FlatList
                style={styles.diaryFlatList}
                data={cardData}
                // extraData={[0,0,0,0]}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <Card item={item}/>
                }} />
        </StyledView>
    )
}

function daysInMonth(month, year) {
    const daysInMonths = [31, (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))
        ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonths[month];
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height - 100,
        paddingHorizontal: 40,
        paddingVertical: 50,

    },
    headerContainer: {
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerText: {
        fontSize: 30,
        fontWeight: "600",
        lineHeight: 25,
    },
    headerMisc: {
        backgroundColor: "#fff",
        height: 40,
        width: 80,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.default.icon,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    leftIconContainer: {
        borderRightColor: Colors.default.icon,
        borderRightWidth: 1
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    iconSelected: {
        backgroundColor: "#3AA6B94A",
    },

    dateContainer: {
        display: "flex",
        flexDirection: "row",
        height: 80,
        top: 40
    },
    dateText: {
        fontSize: 20
    },
    // CALENDAR STYLES
    calendarContainer: {
        // backgroundColor: "green",
        width: "100%",
        height: 500,
        top: 70
    },
    daysContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center"
    },
    daysText: {
        fontSize: 18,
        textAlign: "center"
    },
    calendarIconsContainer: {
        width: "100%",
        // backgroundColor: "#000",
        display: "flex",
        gap: 5,
        marginTop: 15,
    },
    calendarIcons: {
        marginVertical: 15,
        borderWidth: 1,
        borderRadius: "100%",
        height:35,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    calendarIconInvisible: {
        visibility: "none"
    },
    calendarIconText: {
        textAlign: "center"
    },

    // DIARY STYLES
    diaryContainer: {
        display: "flex",
        gap: 20,
        top: 20,
        marginBottom: 150
    },
    diaryFlatList: {
        height: "95%"
    },


})