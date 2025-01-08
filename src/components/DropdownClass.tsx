import { FC } from "react"
import { StyleSheet } from "react-native"
import { Dropdown } from "react-native-element-dropdown"

interface RadioButtonOption {
    label: string;
    value: string;
}

interface UserDropdown {
    isFocus: boolean;
    onFocus: () => void;
    onBlur: () => void;
    onChange: (item: RadioButtonOption) => void;
    value: string;
    data: RadioButtonOption[];
    placeholder: string
}

export const DropdownClass: FC<UserDropdown> = props => {
    return (
        <Dropdown
            style={[styles.dropdown, props.isFocus && { borderColor: 'black', borderWidth: 2 }]}
            placeholderStyle={{ color: 'black' }}
            selectedTextStyle={{ color: 'black' }}
            data={props.data}
            maxHeight={300}
            itemTextStyle={{ color: 'black' }}
            labelField="label"
            valueField="value"
            placeholder={!props.isFocus ? props.placeholder : '...'}
            value={props.value}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            onChange={props.onChange}
        />
    )
}

const styles = StyleSheet.create({
    dropdown: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 10
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
