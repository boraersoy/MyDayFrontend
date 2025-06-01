import { View } from 'react-native';
import { Colors} from "../constants/Colors";

export function StyledView({style, ...rest}) {

    return <View style={{backgroundColor: Colors.default.background, ...style}} {...rest} />
}