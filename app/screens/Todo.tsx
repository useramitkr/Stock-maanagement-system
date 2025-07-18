import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Lists from '@/components/todoLists/lists';

const Todo = () => {

    return (
        <View style={styles.container}>

            {/* Scree title  */}
            <Stack.Screen
                options={{
                    headerTitle: 'Grocery Stock Manager',
                    headerBackTitle: 'Back',
                    headerStyle: {
                        backgroundColor: '#303742',
                    },
                    headerTintColor: '#bababaff',
                }}
            />
            <StatusBar style="light" />

            {/* Page Title */}
            <View style={styles.titleSection}>
                <Text style={styles.mainTitle}>Real-time Inventory Insights</Text>
            </View>

            {/* All Lists  */}
            <View>
                <Lists />
            </View>

        </View>
    )
}

export default Todo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        margin: 0,
        backgroundColor: 'white',
    },
    titleSection: {
        width: '100%',
        backgroundColor: '#303742',
        padding: 10,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    mainTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center',
        padding: 20,
    },
});
