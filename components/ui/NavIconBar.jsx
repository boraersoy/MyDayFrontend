import {StyledView} from "../StyledView";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {Colors} from "@/constants/Colors";

import React from "react";
import {useRouter} from "expo-router";


export default function WithNavbar(Component, page) {
    return function WrappedComponent(props) {
        return (
            <NavIconBar page={page}>
                <Component {...props} />
            </NavIconBar>
        );
    };
}

const pages = [
    `/stats`,
    `/uplift`,
    `/home`,
    `/history`,
    `/settings`
]

export function NavIconBar({ children, page }) {

    const router = useRouter();

    const handlePageChange = (newPage) => {
        if (page === newPage) return
        router.replace(pages[newPage]);
    }

    return (
        <StyledView style={{}}>
            {children}
            <StyledView style={styles.container}>
                <TouchableOpacity style={{...styles.iconContainer, backgroundColor: page === 0 ? "#3AA6B94A": "transparent"}} onPress={() => handlePageChange(0)}><Image style={styles.icon} source={require('@/assets/images/icons/graph.png')} /></TouchableOpacity>
                <TouchableOpacity style={{...styles.iconContainer, backgroundColor: page === 1 ? "#3AA6B94A": "transparent"}} onPress={() => handlePageChange(1)}><Image style={styles.icon} source={require('@/assets/images/icons/like.png')} /></TouchableOpacity>
                <TouchableOpacity style={{...styles.iconContainer, backgroundColor: page === 2 ? "#3AA6B94A": "transparent"}} onPress={() => handlePageChange(2)}><Image style={styles.icon} source={require('@/assets/images/icons/home.png')} /></TouchableOpacity>
                <TouchableOpacity style={{...styles.iconContainer, backgroundColor: page === 3 ? "#3AA6B94A": "transparent"}} onPress={() => handlePageChange(3)}><Image style={styles.icon} source={require('@/assets/images/icons/clock.png')} /></TouchableOpacity>
                <TouchableOpacity style={{...styles.iconContainer, backgroundColor: page === 4 ? "#3AA6B94A": "transparent"}} onPress={() => handlePageChange(4)}><Image style={styles.icon} source={require('@/assets/images/icons/setting.png')} /></TouchableOpacity>
            </StyledView>
        </StyledView>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        backgroundColor: Colors.default.background,
        position: "fixed",
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: Colors.default.icon,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

    },
    icon: {
        width: 30,
        height: 30,
    },
    iconContainer: {
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.default.background ,
        borderRadius: "50%"
    }
})