import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function ItemCard({ item, onButtonClick }) {
    return (
        <View style={styles.container}>
            <View style={{ gap: 8 }}>
                <Text style={styles.nameText}>{item.item}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onButtonClick("PAY", item)}
            >
                <Text>pay ₹{item.amount}</Text>
            </TouchableOpacity>
            <Pressable><Text style={{ color: 'red' }} onPress={() => onButtonClick("DELETE", item)}>delete</Text></Pressable>
            <Pressable><Text style={{ color: 'blue' }} onPress={() => onButtonClick("EDIT", item)}>edit</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 16,
        padding: 12,
        alignItems: 'center'
    },
    nameText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 16
    },
    descriptionText: {
        color: 'lightslategrey',
        fontSize: 12,
    },
    button: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,

    }
})