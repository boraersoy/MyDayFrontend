import React, { useState} from 'react';
import {
    TextInput,
    StyleSheet,
    Image, TouchableOpacity, Alert,
} from 'react-native';
// import {AuthContext} from "../../context/authContext";
import {useContext} from "react";
import {Link, useNavigation} from "expo-router";
import {StyledText} from "../../components/StyledText";
import {StyledView} from "../../components/StyledView";
import {Colors} from "../../constants/Colors";
import CheckBox from '@react-native-community/checkbox';
import {AuthService} from "../../api/requests/auth";
import ParallaxScrollView from "../../components/ParallaxScrollView";



export default function Auth() {
    const [formData, setFormData ] = useState({
        email: "",
        password: "",
    });
    // const [checkBoxStatus, setCheckBoxStatus] = useState(false)
    const [isSignup, setIsSignup] = useState(false);
    // const { login, user } = useContext(AuthContext);
    const emailRegExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")

    const navigate = useNavigation()
    // console.log(JSON.stringify(navigate.getState(), null, 2));
    // React.useEffect(() => {
    //     if (user) {
    //         // eslint-disable-next-line react-hooks/rules-of-hooks
    //         const navigate = useNavigation()
    //         if (navigate.canGoBack()){
    //             navigate.goBack()
    //         }else {
    //             navigate.navigate("/index")
    //         }
    //     }
    // }, [user])

    const handleValueChange = (text, name) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: text
        }))
    }

    const handleChangeAuthPage = () => {
        setIsSignup(!isSignup);
    }

    const handleSubmit = async () => {

        if (!formData.email.matchAll(emailRegExp)){
            Alert.alert('Failed', 'Email provided is not valid')
        }
        navigate.navigate("/home")
        if (!isSignup) {
            // console.log("login")
            // const resp = await AuthService.login({email: formData.email.toLowerCase(), password: formData.password})
            // console.log(resp)
            // if (resp === "Unauthorized" || resp === "Forbidden") {
            //     Alert.alert('Failed', 'Credentials provided are not valid')
            //     // login({user: null, error: resp})
            //     return;
            // }
            // login({user :JSON.parse(resp), error: null})
            // return;
        }
        // const resp = await AuthService.register({email: formData.email.toLowerCase(), password: formData.password, user_type: formData.user_type})
        // console.log("Im clicked")
        // console.log(resp)
        // if (resp === "Unauthorized" || resp === "Forbidden") {
        //     Alert.alert('Failed', 'Credentials provided are not valid')
        //     login({user: null, error: resp})
        //     return;
        // }
        // login({user :JSON.parse(resp), error: null})
    };

    return (
        <StyledView style={styles.container}>
            <StyledView style={styles.containerTitle}>
                <StyledText type="title" color={Colors.default.text} style={styles.title}>{isSignup ? "Sign up" : "Login"}</StyledText>
            </StyledView>
            <Image style={styles.image} source={require("../../assets/images/MyDay.png")} resizeMode="contain" />


            <StyledView style={styles.containerForm}>

            <TextInput
                id="email"
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.light.text}
                value={formData.email}
                onChangeText={text => handleValueChange(text, "email")}
            />
            <TextInput
                id="password"
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.light.text}
                value={formData.password}
                onChangeText={text => handleValueChange(text, "password")}
                secureTextEntry
            />
            </StyledView>

            <StyledView style={styles.miscContainer}>
                <StyledText type="text">{isSignup ? "If you already have an account" :"If wish to create an account"}</StyledText>
                <TouchableOpacity style={styles.button} onPress={handleChangeAuthPage}>
                    <StyledText type="text" style={{ color: Colors.default.link }}>{isSignup ? " Login" :" Sign up"}</StyledText>
                </TouchableOpacity>
            </StyledView>
            <StyledView style={styles.containerSubmit}>
                <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                    <StyledText type="submit" color={Colors.default.background} style={{}}>
                        {isSignup ? "Sign up" : "Sign in"}
                    </StyledText>
                </TouchableOpacity>
            </StyledView>
        </StyledView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 50,
        alignItems: "center",
        gap: 20
    },
    containerImage: {
        flex: 1,
        backgroundColor: Colors.default.background,
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
    },
    containerForm: {
        width: "100%"
    },
    containerTitle: {
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        position: "absolute",
        top: "10%",
    },
    containerSubmit: {
        width: "100%",
        height: 30,
        textAlign: "center",
        alignItems: "center",

        backgroundColor: Colors.default.text,
        color: Colors.default.background,
        borderRadius: 12
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: Colors.default.text,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: Colors.default.text,
        width: "100%"
    },
    image: {
        margin: 0,
        width: 200
    },
    link: {
        fontSize: 30,
        fontWeight: "bold",
        position: "absolute",
        top: 50,
        left: 20,
        color: Colors.default.link
    },
    buttonContainer: {
        paddingVertical: 8,
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.default.background,
        borderRadius: 6,
    },
    miscContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
        width: "100%",
    },
    button: {
        width: "auto",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.default.background,
    },
    submit: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        position: "relative",
        height: "100%"
    }



});

