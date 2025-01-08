import React, { FC } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';

interface SwitchProps {
    isEnabled: boolean,
    setIsEnabled: any,
    title: string
}

export const SwitchClass: FC<SwitchProps> = props => {
    const toggleSwitch = () => props.setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.toggleContainer}>
            <Text style={styles.titleText}>{props.title}</Text>
            <Switch
                trackColor={{ true: '#000', false: 'gray' }}
                thumbColor={props.isEnabled ? 'gray' : '#000'}
                onValueChange={toggleSwitch}
                value={props.isEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        color: 'black',
        fontSize: 16,
    },
});

