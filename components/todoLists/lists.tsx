import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AllItems from './allItems';
import CreateScreen from './createScreen';

const Lists = () => {

    const [view, setView] = useState(0);
    const [data, setData] = useState([
        { id: 1, name: "Wheat", stock: 5, unit: 'kg', price: 20 },
        { id: 2, name: "Rice", stock: 150, unit: 'kg', price: 45 },
        { id: 3, name: "Peanuts", stock: 50, unit: 'kg', price: 120 },
        { id: 4, name: "Masur Dal", stock: 75, unit: 'kg', price: 90 },
        { id: 5, name: "Tea Bags", stock: 25, unit: 'boxes', price: 250 },
        { id: 6, name: "Cooking Oil", stock: 10, unit: 'liters', price: 180 },
        { id: 7, name: "Sugar", stock: 100, unit: 'kg', price: 40 },
        { id: 8, name: "Salt", stock: 200, unit: 'kg', price: 20 },
        { id: 9, name: "Coffee Powder", stock: 15, unit: 'jars', price: 300 },
        { id: 10, name: "Milk", stock: 30, unit: 'liters', price: 60 },
        { id: 11, name: "Eggs", stock: 120, unit: 'dozen', price: 7 },
        { id: 12, name: "Bread", stock: 40, unit: 'loaves', price: 35 },
        { id: 13, name: "Butter", stock: 25, unit: 'packs', price: 50 },
        { id: 14, name: "Cheese", stock: 18, unit: 'blocks', price: 150 },
        { id: 15, name: "Potatoes", stock: 80, unit: 'kg', price: 30 },
        { id: 16, name: "Onions", stock: 90, unit: 'kg', price: 25 },
        { id: 17, name: "Tomatoes", stock: 60, unit: 'kg', price: 40 },
        { id: 18, name: "Apples", stock: 70, unit: 'kg', price: 100 },
        { id: 19, name: "Bananas", stock: 110, unit: 'dozen', price: 50 },
        { id: 20, name: "Oranges", stock: 55, unit: 'kg', price: 80 },
        { id: 21, name: "Chicken Breast", stock: 30, unit: 'kg', price: 220 },
        { id: 22, name: "Fish Fillet", stock: 20, unit: 'kg', price: 350 },
        { id: 23, name: "Pasta", stock: 40, unit: 'packs', price: 70 },
        { id: 24, name: "Cereal", stock: 35, unit: 'boxes', price: 180 },
        { id: 25, name: "Juice", stock: 50, unit: 'liters', price: 120 },
    ])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, view === 0 ? { backgroundColor: '#3e8a45ff' } : null]} onPress={() => setView(0)}>
                    <Text style={[styles.btnText, view === 0 ? { color: 'white' } : null]}>All Items</Text>
                </Pressable>

                <Pressable style={[styles.button, view === 1 ? { backgroundColor: '#3e8a45ff' } : null]} onPress={() => setView(1)}>
                    <Text style={[styles.btnText, view === 1 ? { color: 'white' } : null]}>Low Stock</Text>
                </Pressable>

                <Pressable style={[styles.button, view === 2 ? { backgroundColor: '#3e8a45ff' } : null]} onPress={() => setView(2)}>
                    <Text style={[styles.btnText, view === 2 ? { color: 'white' } : null]}>Create</Text>
                </Pressable>
            </View>

            {view === 0 && <AllItems data={data} />}
            {view === 1 && <AllItems data={data.filter((item) => item.stock < 20)} />}
            {view === 2 && <CreateScreen data={data} setdata={setData} />}
        </View>
    )
}

export default Lists;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: '4%',
        backgroundColor: '#fffff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10,
    },
    button: {
        paddingVertical: 3.5,
        paddingHorizontal: 10,
        borderRadius: 50,
        borderWidth: 0.8,
        borderColor: '#3e8a45ff',
    },
    btnText: {
        color: '#3e8a45ff',
        fontWeight: '400',
        fontSize: 14
    },
})