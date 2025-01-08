import { FC } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

interface UserTextInput {
    name: string,
    onChange: (text: string) => void,
    title: string
}
export const TextInputClass: FC<UserTextInput> = props => {
    return (
        <View>
            <Text style={styles.titleText}>{props.title}</Text>
            <TextInput style={styles.textInput} onChangeText={props.onChange} value={props.name} />
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        marginVertical: 17,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    textInput: {
        marginTop: 10,
        borderWidth: 1,
        width: '100%',
        height: 35,
        borderRadius: 3,
        color: 'black',
        fontSize: 14
    },
    titleText: {
        color: 'black',
        fontSize: 16,
    },
})