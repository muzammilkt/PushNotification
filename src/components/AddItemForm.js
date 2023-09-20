import { View, Text, Modal, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';

export default function AddItemForm({ modalVisibility, setModalVisibility }) {
    const [data, setData] = useState({ item: '', discription: '', amount: '' });

    const onSubmit = () => {
        console.log(data);
    }

    const onRequestClose = () => {
        setModalVisibility(false)
        setData({ item: '', discription: '', amount: '' })
    }


    return (
        <Modal
            visible={modalVisibility}
            animationType='slide'
            onRequestClose={onRequestClose}
        >
            <View style={{ marginTop: 100 }}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'gray'}
                    value={data.item}
                    placeholder='Item Name'
                    onChangeText={(v) => setData({ ...data, item: v })}
                />
                <TextInput
                    style={styles.input}
                    value={data.discription}
                    placeholderTextColor={'gray'}
                    placeholder='Discription'
                    onChangeText={(v) => setData({ ...data, discription: v })}
                />
                <TextInput
                    style={styles.input}
                    value={data.amount}
                    placeholderTextColor={'gray'}
                    placeholder='Amount'
                    onChangeText={(v) => setData({ ...data, amount: v })}
                />
                <View>
                    <View style={styles.buttonsView}>
                        <Button
                            title='Cancel'
                            color={'red'}
                            style={styles.button}
                            onPress={onRequestClose}
                        />

                        <View style={styles.button}>
                            <Button
                                title='Submit'
                                color={'cornflowerblue'}
                                style={styles.button}
                                onPress={onSubmit}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 20,
        height: 40,
        marginTop: 20,
        padding: 12
    },
    button: {
        borderColor: 'darkgray',
        borderRadius: 50,
        borderWidth: 1,
    },
    buttonsView: {
        marginTop: 20,
        marginHorizontal: 20,
    }
})