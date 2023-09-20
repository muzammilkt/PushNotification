import React, { useState } from 'react'

import RazorpayCheckout from 'react-native-razorpay';


import { View, Text, Platform, Modal, TextInput, StyleSheet, Button, FlatList, Alert } from 'react-native'
import AddItemForm from '../components/AddItemForm';
import ItemCard from '../components/ItemCard';


const items = [
    {
        id: 1,
        item: "Adidas Boot",
        description: "One of the best",
        amount: 1000
    },
    {
        id: 2,
        item: "Adidas Boot",
        description: "One of the best",
        amount: 2000
    },
    {
        id: 3,
        item: "Adidas Boot",
        description: "One of the best",
        amount: 3000
    },
    {
        id: 4,
        item: "Adidas Boot",
        description: "One of the best",
        amount: 4000
    },
    {
        id: 5,
        item: "Adidas Boot",
        description: "One of the best",
        amount: 5000
    },
]

export default function HomeScreen() {

    const [modalVisibility, setModalVisibility] = useState(false);
    const buttonPress = () => {
        setModalVisibility(true);
    }

    const onPayButtonPress = (item) => {
        const razorpayOptions = {
            description: item.item,
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_iwD7t2wb7ZuqVo',
            amount: item.amount,
            name: 'RazorpayTest',
            prefill: {
                email: 'void@razorpay.com',
                contact: '919567167713',
                name: 'Razorpay test'
            },
            theme: { color: '#ffb6c1' }
        }
        RazorpayCheckout.open(razorpayOptions).then((data) => {
            Alert.alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <View style={styles.container}>
            <AddItemForm
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
                onPayButtonPress={onPayButtonPress}
            />
            <Text style={styles.titleText}>Sample Store</Text>
            <View style={styles.listView}>
                <View style={styles.button}>
                    <Button
                        title='Add new item'
                        color={'cornflowerblue'}
                        style={styles.button}
                        onPress={buttonPress}
                    />
                </View>
                <FlatList
                    data={items}
                    renderItem={({ item, index }) => <ItemCard
                        item={item}
                        key={index}
                        onPayButtonPress={onPayButtonPress}
                    />}
                    keyExtractor={((item) => item.id)}
                    contentContainerStyle={styles.listContianer}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 12
    },
    titleText: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 30,
        color: 'black',
        fontWeight: '500'
    },
    listView: {
        borderColor: 'darkcyan',
        borderWidth: 1,
        borderRadius: 8,
        flex: 1,
        marginTop: 12,
        gap: 4,
        padding: 8
    },
    button: {
        alignSelf: 'flex-end',
        borderColor: 'darkgray',
        borderRadius: 50,
        borderWidth: 1
    },
    listContianer: {
        marginTop: 20,
        gap: 8
    }
})