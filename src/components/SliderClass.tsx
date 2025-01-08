import Slider from '@react-native-community/slider';
import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface SliderProps {
    sliderValue: number;
    setSliderValue: (value: number) => void
}

export const SliderClass: FC<SliderProps> = props => {
    return (
        <View>
            <Text style={styles.titleText}>Age : {props.sliderValue}</Text>
            <Slider
                style={{ width: 350, height: 40 }}
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor="black"
                maximumTrackTintColor="gray"
                value={props.sliderValue}
                onValueChange={props.setSliderValue}
                thumbTintColor="gray"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    subContainer: {
        marginVertical: 17,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    titleText: {
        color: 'black',
        fontSize: 16,
    },
});

