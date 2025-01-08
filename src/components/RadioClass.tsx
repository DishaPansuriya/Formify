import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RadioButtonOption {
    label: string;
    value: string;
}

interface RadioButtonGroupProps {
    options: RadioButtonOption[];
    selectedValue: string;
    onValueChange: (value: string) => void;
}

export const RadioButtonGroup: FC<RadioButtonGroupProps> = ({ options, selectedValue, onValueChange }) => {
    return (
        <View>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.value}
                    style={styles.radioButtonContainer}
                    onPress={() => onValueChange(option.value)}>
                    <View style={styles.radioButton}>
                        {selectedValue === option.value && <View style={styles.radioButtonSelected} />}
                    </View>
                    <Text style={styles.radioButtonLabel}>{option.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioButtonSelected: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'black',
    },
    radioButtonLabel: {
        color: 'black',
    },
});