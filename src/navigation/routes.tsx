import { createStackNavigator } from "@react-navigation/stack"
import { HomeScreen } from "../screen/HomeScreen"
import { FormScreen } from "../screen/FormScreen"

const Stack = createStackNavigator()
const MyStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Form" component={FormScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default MyStack