import {Text,  StyleSheet} from 'react-native';


export function StyledText({ style, type = 'text', color= "#3AA6B9", ...rest }) {
    return <Text
        style={[
            {color: color},
            {fontFamily: 'arial'},
            styles[type],
            {...style},
        ]}
        {...rest}
    />
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'arial',
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'arial',
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        lineHeight: 28,
        fontFamily: 'arial',
    },
    secondary: {
        fontSize: 22,
        fontWeight: "bold",
        lineHeight: 28,
        fontFamily: 'arial',
    }
})