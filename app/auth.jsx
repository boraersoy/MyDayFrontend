import React, { useState, useContext} from 'react';
import {
    TextInput,
    StyleSheet,
    Image, TouchableOpacity, Alert } from 'react-native';
import {AuthContext} from "../context/AuthContext";
import { useRouter } from "expo-router";
import {StyledText} from "../components/StyledText";
import {StyledView} from "../components/StyledView";
import {Colors} from "../constants/Colors";
import {AuthService} from "../api/requests/auth";
import {HistoryContext} from "../context/HistoryContext";




export default function Auth() {
    const [formData, setFormData ] = useState({
        email: "sb@example.com",
        password: "password123",
    });
    const [loginError, setLoginError] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    // const { login, user } = useContext(AuthContext);
    const emailRegExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")

    const router = useRouter();
    const auth = useContext(AuthContext);
    const { updateMoodHistory } = useContext(HistoryContext)
    React.useEffect(() => {
        if (auth.isAuthenticated) {
            router.replace("/home");
        }
    }, [auth.token])

    React.useEffect(() => {
        if (loginError) {
            setTimeout(() => {
                setLoginError(false);
            }, 2000)
        }
    }, [loginError])

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
        if (isSignup) {
            if (!formData.email || !formData.password) {
                setLoginError(true);
                return;
            }
            if (emailRegExp.test(formData.email)){
                await AuthService.register({
                    ...formData,
                    "avatar_age": "young",
                    "avatar_gender": "male"
                });
                Alert.alert("Registration successful", "You can now log in.");
                setIsSignup(false);
                return;
            }
            Alert.alert("Invalid email format", "Please enter a valid email address.");
            setLoginError(true);
            console.log("Invalid email format");
            return;
        }
        if (!formData.email || !formData.password) {
            setLoginError(true);
            return;
        }
        if (emailRegExp.test(formData.email)){
            let resp = await auth.login(formData);
            await updateMoodHistory(resp.token)
            router.replace("/home")
            return;
        }
        Alert.alert("Invalid email format", "Please enter a valid email address.");
        setLoginError(true);
        console.log("Invalid email format");
    };

    return (
        <StyledView style={styles.container}>
            <StyledView style={styles.containerTitle}>
                <StyledText type="title" color={Colors.default.text} style={styles.title}>{isSignup ? "Sign up" : "Login"}</StyledText>
            </StyledView>
            <Image style={styles.image} source={require("../assets/images/MyDay.png")} resizeMode="contain" />


            <StyledView style={styles.containerForm}>

            <TextInput
                id="email"
                style={loginError ? styles.inputError : styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.light.text}
                value={formData.email}
                onChangeText={text => handleValueChange(text, "email")}
            />
            <TextInput
                id="password"
                style={loginError ? styles.inputError : styles.input}
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
                <TouchableOpacity style={styles.submit} onPress={(e) => handleSubmit(e)}>
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
    inputError: {
        height: 40,
        borderColor: 'red',
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
    },




});

