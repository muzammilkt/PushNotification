import { View, Text, Modal, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { CreateProduct, EditProduct } from '../services/productService';

export default function AddItemForm({ modalVisibility, setModalVisibility, item, setSelectedItem, setTriggerApi }) {
    const [data, setData] = useState({ item: '', description: '', amount: '' });

    const onSubmit = async () => {
        if (!item) {
            const response = await CreateProduct(data);
        }
        else {
            const response = await EditProduct(item._id, data);
        }
        onRequestClose();
        setTriggerApi(Date.now());
    }

    const onRequestClose = () => {
        setModalVisibility(false)
        setData({ item: '', description: '', amount: '' })
        setSelectedItem(null)
    }

    useEffect(() => {
        if (item) setData(item)
    }, [item, modalVisibility])

    return (
        <Modal
            visible={modalVisibility}
            animationType='slide'
            onRequestClose={onRequestClose}
            key={item}
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
                    value={data.description}
                    placeholderTextColor={'gray'}
                    placeholder='Description'
                    onChangeText={(v) => setData({ ...data, description: v })}
                />
                <TextInput
                    style={styles.input}
                    value={data.amount}
                    placeholderTextColor={'gray'}
                    placeholder='Amount (in INR)'
                    onChangeText={(v) => setData({ ...data, amount: v })}
                    inputMode='tel'
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
                                disabled={Boolean(!data.item && !data.description && !data.amount)}
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