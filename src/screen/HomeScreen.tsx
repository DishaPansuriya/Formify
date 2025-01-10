import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const HomeScreen = () => {
    const [data, setData] = useState<any>()
    useEffect(() => {
        const getData = async () => {
            const data: any = await AsyncStorage.getItem('userData')
            const userData = JSON.parse(data);
            setData(userData)
        }
        getData()
    }, [])
    console.log(data);

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={{ fontSize: 24, color: '#fff', marginBottom: 24, fontWeight: 'bold' }}>Profile</Text>
                <Image style={styles.image} source={{ uri: data?.data?.profile || 'https://i.pinimg.com/564x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg' }} />
                <View>
                    <Text style={styles.titleText}>Name : {data?.data?.firstName} {data?.data?.lastName}</Text>
                    <Text style={styles.titleText}>Gender : {data?.data?.gender}</Text>
                    <Text style={styles.titleText}>Age : {data?.data?.age}</Text>
                    <Text style={styles.titleText}>Address : {data?.data?.address}</Text>
                    <Text style={styles.titleText}>Country : {data?.data?.country}</Text>
                    <Text style={styles.titleText}>City : {data?.data?.city}</Text>
                    <Text style={styles.titleText}>Interest :
                        {data?.data?.interest.codeCheckBox && data?.data?.interest.designingCheckBox ? ' Coding, Designing' : ''}
                        {data?.data?.interest.designingCheckBox && !data?.data?.interest.codeCheckBox ? ' Designing' : ''}
                        {!data?.data?.interest.designingCheckBox && data?.data?.interest.codeCheckBox ? ' Coding' : ''}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center'
    },
    titleText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    subContainer: {
        width: '100%',
        marginVertical: 17,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    image: {
        borderRadius: 50,
        width: 100,
        height: 100,
        marginBottom: 30
    }
})
