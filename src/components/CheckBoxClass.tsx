import CheckBox from '@react-native-community/checkbox';
import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';


interface CheckBoxProps {
    value: boolean;
    onValueChange: (newValue: boolean) => void;
    title: string;
}

export const CheckBoxClass: FC<CheckBoxProps> = ({ value, onValueChange, title }) => {
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                value={value}
                onValueChange={onValueChange}
                tintColors={{ true: 'black', false: 'black' }}
            />
            <Text style={styles.titleText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    titleText: {
        color: 'black',
        fontSize: 16,
    },
});

