import React, { FC } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

interface ProfileProps {
    onPress: any,
    imageUri: any,
    title: string,
    setImageUri: any
}

export const ProfileClass: FC<ProfileProps> = props => {
    const openGallary = () => {
        const options: any = {
            mediaType: 'photo',
            includeBase64: false,
            selectionLimit: 1
        }
        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                console.log(`Cancelled image`);
            } else if (res.errorCode) {
                console.log(`Error: ${res.errorMessage}`);
            } else {
                const uri: any = res.assets && res.assets[0]?.uri
                if (uri) {
                    props.setImageUri(uri)
                }
            }
        })
    }
    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.profileImg} onPress={openGallary}>
                <Image
                    style={styles.profileImg}
                    source={{ uri: props.imageUri }}
                />
            </TouchableOpacity>
            <Text style={styles.titleText}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    profileImg: {
        width: 124,
        height: 124,
        borderRadius: 62,
        marginBottom: 15
    },
    titleText: {
        color: 'black',
        fontSize: 16,
    },
});

