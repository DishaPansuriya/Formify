import { useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native"
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApplicationScreenProps } from "../navigation/navigation";
import { TextInputClass } from "../components/TextInputClass";
import { RadioButtonGroup } from "../components/RadioClass";
import { DropdownClass } from "../components/DropdownClass";
import { CheckBoxClass } from "../components/CheckBoxClass";
import { SliderClass } from "../components/SliderClass";
import { SwitchClass } from "../components/SwitchClass";
import { ProfileClass } from "../components/ProfileClass";


const countries = [


    { label: 'India', value: 'india' },
    { label: 'United State', value: 'united state' },
    { label: 'Pakistan', value: 'pakistan' },
    { label: 'Russiya', value: 'russiya' },
    { label: 'Malaysia', value: 'malaysia' },
    { label: 'Argentina', value: 'argentina' },
    { label: 'Norway', value: 'norway' },
    { label: 'Philippines', value: 'philippines' },
    { label: 'Thailand', value: 'thailand' },
];
const cities = [
    { label: 'Surat', value: 'surat' },
    { label: 'Ahemdabad', value: 'ahemdabad' },
    { label: 'Patan', value: 'patan' },
    { label: 'Rajakot', value: 'rajakot' },
    { label: 'Vadodara', value: 'vadodara' },
    { label: 'Junagadh', value: 'junagadh' },
    { label: 'Jamanagar', value: 'jamanagar' },
    { label: 'Gandhinagar', value: 'gandhinagar' },
    { label: 'Botad', value: 'botad' },
];

export const FormScreen = ({ navigation }: ApplicationScreenProps) => {
    const [value, setValue] = useState<any>(null);
    const [city, setCity] = useState<any>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [cityFocus, setCityFocus] = useState(false);
    const [codeCheckBox, setCodeCheckBox] = useState(false)
    const [designingCheckBox, setDesigningCheckBox] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [imageUri, setImageUri] = useState('https://i.pinimg.com/564x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg')
    const [sliderValue, setSliderValue] = useState(0)
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [userData, setUserData] = useState()
    const options = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' },
    ];

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
                    setImageUri(uri)
                }
            }
        })
    }

    const savedData = async () => {
        if (isEnabled) {
            const data = {
                profile: imageUri,
                firstName: firstName,
                lastName: lastName,
                address: address,
                gender: selectedOption,
                country: value,
                city: city,
                interest: {
                    codeCheckBox: codeCheckBox, designingCheckBox: designingCheckBox
                },
                age: sliderValue,
                save: isEnabled
            }
            await AsyncStorage.setItem('savedData', JSON.stringify({ data: data }))
        }
    }

    const getData = async () => {
        const data: any = await AsyncStorage.getItem('savedData')
        const userData = JSON.parse(data);

        setUserData(userData)
        if (userData?.data !== null && userData?.data?.save) {
            setFirstName(userData.data.firstName)
            setLastName(userData.data.lastName)
            setValue(userData.data.country)
            setAddress(userData.data.address)
            setSelectedOption(userData.data.gender)
            setCodeCheckBox(userData.data.interest.codeCheckBox)
            setDesigningCheckBox(userData.data.interest.designingCheckBox)
            setSliderValue(userData.data.age)
            setImageUri(userData.data.profile)
            setCity(userData.data.city)
            setIsEnabled(userData.data.save)
        }
    }

    const resetForm = () => {
        setFirstName('')
        setLastName('')
        setValue('')
        setAddress('')
        setSelectedOption('')
        setCodeCheckBox(false)
        setDesigningCheckBox(false)
        setSliderValue(0)
        setImageUri('https://i.pinimg.com/564x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg')
        setCity('')
        setIsEnabled(false)
    }

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [cityError, setCityError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [interestError, setInterestError] = useState('');  // New state for checkbox validation

    const validateForm = () => {
        let valid = true;

        if (firstName === '') {
            setFirstNameError('First Name is required');
            valid = false;
        } else {
            setFirstNameError('');
        }

        if (lastName === '') {
            setLastNameError('Last Name is required');
            valid = false;
        } else {
            setLastNameError('');
        }

        if (address === '') {
            setAddressError('Address is required');
            valid = false;
        } else {
            setAddressError('');
        }

        if (selectedOption === '') {
            setGenderError('Gender selection is required');
            valid = false;
        } else {
            setGenderError('');
        }

        if (value === null) {
            setCountryError('Country selection is required');
            valid = false;
        } else {
            setCountryError('');
        }

        if (city === null) {
            setCityError('City selection is required');
            valid = false;
        } else {
            setCityError('');
        }

        if (sliderValue === 0) {
            setAgeError('Age must be selected');
            valid = false;
        } else {
            setAgeError('');
        }
        if (!codeCheckBox && !designingCheckBox) {
            setInterestError('At least one interest must be selected');
            valid = false;
        } else {
            setInterestError('');
        }
        return valid;
    };


    useEffect(() => {
        savedData()
    }, [isEnabled])
    useEffect(() => {
        getData()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.subContainer}>
                <ProfileClass imageUri={imageUri} onPress={openGallary} setImageUri={setImageUri} title="Select Profile" />
            </View>
            <View style={styles.subContainer}>
                <TextInputClass name={firstName} onChange={text => setFirstName(text)} title="First Name : " />
                {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
            </View>
            <View style={styles.subContainer}>
                <TextInputClass name={lastName} onChange={text => setLastName(text)} title="Last Name : " />
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
            </View>
            <View style={styles.subContainer}>
                <TextInputClass name={address} onChange={text => setAddress(text)} title="Address : " />
                {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.titleText}>Select Gender :</Text>
                <RadioButtonGroup options={options} selectedValue={selectedOption} onValueChange={(value) => setSelectedOption(value)} />
                {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.titleText}>Country : </Text>
                <DropdownClass
                    data={countries}
                    isFocus={isFocus}
                    value={value || ''}
                    placeholder='Select City'
                    onFocus={() => {
                        setIsFocus(true)
                    }}
                    onBlur={() => {
                        setIsFocus(false)
                    }}
                    onChange={(item: any) => {
                        setValue(item.value)
                        setIsFocus(false)
                    }}
                />
                {countryError ? <Text style={styles.errorText}>{countryError}</Text> : null}
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.titleText}>City : </Text>
                <DropdownClass
                    placeholder='Select City'
                    data={cities}
                    isFocus={cityFocus}
                    value={city || ''}
                    onFocus={() => {
                        setCityFocus(true)
                    }}
                    onBlur={() => {
                        setCityFocus(false)
                    }}
                    onChange={(item: any) => {
                        setCity(item.value)
                        setCityFocus(false)
                    }}
                />
                {cityError ? <Text style={styles.errorText}>{cityError}</Text> : null}
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.titleText}>Choose your interests:</Text>
                <CheckBoxClass
                    value={codeCheckBox}
                    onValueChange={(newValue: boolean) => setCodeCheckBox(newValue)}
                    title="Coding"
                />
                <CheckBoxClass
                    value={designingCheckBox}
                    onValueChange={(newValue: boolean) => setDesigningCheckBox(newValue)}
                    title="Designing"
                />
                {interestError ? <Text style={styles.errorText}>{interestError}</Text> : null}

            </View>
            <View style={styles.subContainer}>
                <SliderClass
                    sliderValue={sliderValue}
                    setSliderValue={(value: number) => setSliderValue(value)}
                />
                {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}

            </View>
            <View style={styles.subContainer}>
                <SwitchClass setIsEnabled={setIsEnabled} isEnabled={isEnabled} title="Save" />
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.subbmit}
                    onPress={async () => {
                        if (!validateForm()) {
                            return;
                        }

                        if (isEnabled) {
                            const data = {
                                profile: imageUri,
                                firstName: firstName,
                                lastName: lastName,
                                address: address,
                                gender: selectedOption,
                                country: value,
                                city: city,
                                interest: {
                                    codeCheckBox: codeCheckBox,
                                    designingCheckBox: designingCheckBox,
                                },
                                age: sliderValue,
                                save: isEnabled,
                            };
                            await AsyncStorage.setItem('userData', JSON.stringify({ data }));
                            await AsyncStorage.removeItem('savedData');
                        }
                        resetForm();
                        navigation.navigate('Home');
                    }}
                >
                    <Text style={{ color: 'black', fontSize: 18 }}>Submit</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.subbmit}
                    onPress={async () => {
                        if (!validateForm()) {
                            return;
                        }

                        if (isEnabled) {
                            const data = {
                                profile: imageUri,
                                firstName: firstName,
                                lastName: lastName,
                                address: address,
                                gender: selectedOption,
                                country: value,
                                city: city,
                                interest: {
                                    codeCheckBox: codeCheckBox,
                                    designingCheckBox: designingCheckBox,
                                },
                                age: sliderValue,
                                save: isEnabled,
                            };
                            await AsyncStorage.setItem('userData', JSON.stringify({ data }));
                            await AsyncStorage.removeItem('savedData');
                        }

                        resetForm();
                        navigation.navigate('Home');
                    }}
                >
                    <Text style={{ color: 'black', fontSize: 18 }}>Submit</Text>
                </TouchableOpacity>
            </View> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: 'black'
    },
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
    subbmit: {
        width: 100,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    errorText: {
        color: 'red',
        fontSize: 14,
    },
})