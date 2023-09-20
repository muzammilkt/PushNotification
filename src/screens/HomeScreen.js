import React, { useCallback, useEffect, useState } from 'react'

import RazorpayCheckout from 'react-native-razorpay';


import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native'
import AddItemForm from '../components/AddItemForm';
import ItemCard from '../components/ItemCard';
import { DeleteProduct, ListAllProducts } from '../services/productService';

export default function HomeScreen() {

    const [modalVisibility, setModalVisibility] = useState(false);
    const buttonPress = () => {
        setModalVisibility(true);
    }

    const [data, setData] = useState([]);
    const [triggetApi, setTriggerApi] = useState(Date.now());
    const [selectedItem, setSelectedItem] = useState(null);

    async function getProducts() {
        const response = await ListAllProducts();
        setData(response.data);
    }

    async function deleteItem(item) {
        try {
            Alert.prompt(
                `Delete ${item.item}`,
                "Are you sure you want to delete this item?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "OK",
                        onPress: async () => {
                            const response = await DeleteProduct(item._id);
                            setData(prev => prev.filter((i) => i._id != item._id))
                        },
                    },
                ],
                {
                    cancelable: false, // Prevents the dialog from being dismissed by tapping outside
                    placeholder: 'Type DELETE to confirm', // Optional placeholder text
                }
            );
        } catch (error) {
            console.log(error);
        }

    }

    const onButtonClick = (mode = "EDIT", item) => {
        setSelectedItem(item)
        if (mode == "EDIT") setModalVisibility(true);
        if (mode == "PAY") onPayButtonPress(item);
        if (mode == "DELETE") deleteItem(item);
    }

    const onPayButtonPress = (item) => {
        const razorpayOptions = {
            description: item.item,
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_iwD7t2wb7ZuqVo',
            amount: item.amount * 100, // Convert INR to paise
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
    useEffect(() => { getProducts() }, [triggetApi])


    return (
        <View style={styles.container}>
            {modalVisibility && <AddItemForm
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
                onPayButtonPress={onPayButtonPress}
                item={selectedItem}
                setSelectedItem={setSelectedItem}
                setTriggerApi={setTriggerApi}
            />}
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
                    data={data}
                    renderItem={({ item, index }) => <ItemCard
                        item={item}
                        key={item._id}
                        onButtonClick={onButtonClick}
                    />}
                    keyExtractor={((item) => item._id)}
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