import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

type ItemType = {
    id: number;
    name: string;
    stock: number;
};

type Props = {
    data: ItemType[];
    setdata: React.Dispatch<React.SetStateAction<ItemType[]>>;
};

const CreateScreen: React.FC<Props> = ({ data, setdata }) => {
    const [items, setItems] = useState<string>('');
    const [stock, setStock] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [itemId, setItemId] = useState<number | null>(null);

    // Validate Form
    const validateForm = (): boolean => {
        const nameRegex = /^[A-Za-z\s]+$/;

        if (!items.trim()) {
            Alert.alert('Validation Error', 'Item name is required.');
            return false;
        }

        if (!nameRegex.test(items.trim())) {
            Alert.alert('Validation Error', 'Item name must contain only letters.');
            return false;
        }

        const numericStock = Number(stock);

        if (!stock.trim() || isNaN(numericStock)) {
            Alert.alert('Validation Error', 'Stock must be a valid number.');
            return false;
        }

        if (numericStock <= 0) {
            Alert.alert('Validation Error', 'Stock must be greater than 0.');
            return false;
        }

        return true;
    };

    // Add Item
    const handleAddItem = () => {
        if (!validateForm()) return;
        const newItem: ItemType = {
            id: Date.now(),
            name: items.trim(),
            stock: Number(stock),
        };
        setdata([...data, newItem]);
        resetForm();
        Keyboard.dismiss(); // dismiss keyboard after action
    };

    // Update Item
    const handleUpdate = () => {
        if (!validateForm() || itemId === null) return;

        const updatedData = data.map((item) =>
            item.id === itemId ? { ...item, name: items.trim(), stock: Number(stock) } : item
        );

        setdata(updatedData);
        resetForm();
        Keyboard.dismiss(); // dismiss keyboard after action
    };

    // Delete Item
    const handleDelete = (id: number) => {
        setdata(data.filter((item) => item.id !== id));
    };

    // Edit Item
    const handleEdit = (item: ItemType) => {
        setIsEdit(true);
        setItems(item.name);
        setStock(item.stock.toString());
        setItemId(item.id);
    };

    // Reset Form
    const resetForm = () => {
        setItems('');
        setStock('');
        setIsEdit(false);
        setItemId(null);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.scrollViewContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <TextInput
                        placeholder='Enter an Item Name...'
                        placeholderTextColor='#999'
                        style={styles.input}
                        value={items}
                        onChangeText={(text) => {
                            const onlyLetters = text.replace(/[^A-Za-z\s]/g, '');
                            setItems(onlyLetters);
                        }}
                    />

                    <TextInput
                        placeholder='Stock Qty'
                        placeholderTextColor='#999'
                        style={styles.input}
                        value={stock}
                        keyboardType='numeric'
                        onChangeText={(text) => {
                            const onlyNumbers = text.replace(/[^0-9]/g, '');
                            setStock(onlyNumbers);
                        }}
                    />

                    <Pressable
                        style={styles.button}
                        onPress={isEdit ? handleUpdate : handleAddItem}
                    >
                        <Text style={styles.btnText}>
                            {isEdit ? 'Edit Item in Stock' : 'Add Item in Stock'}
                        </Text>
                    </Pressable>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingText}>All items in the Stock</Text>
                        </View>

                        {data.map((item) => (
                            <View
                                key={item.id}
                                style={[
                                    styles.itemContainer,
                                    {
                                        backgroundColor:
                                            item.stock < 20 ? '#FFCCCC' : '#D7F6BFFF',
                                    },
                                ]}
                            >
                                <Text style={styles.itemText}>{item.name}</Text>
                                <View style={styles.addDelBtn}>
                                    <Text style={styles.itemText}>{item.stock}</Text>
                                    <Pressable onPress={() => handleEdit(item)}>
                                        <Text style={[styles.itemText, styles.editBtn]}>📝</Text>
                                    </Pressable>
                                    <Pressable onPress={() => handleDelete(item.id)}>
                                        <Text style={[styles.itemText, styles.delBtn]}>⛔</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default CreateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#D7F6BFFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#3e8a45ff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    headingText: {
        fontWeight: '600',
        fontSize: 16,
        marginVertical: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7,
        marginBottom: 10,
        alignItems: 'center',
    },
    itemText: {
        fontWeight: '400',
        fontSize: 15,
    },
    addDelBtn: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
    },
    editBtn: {
        backgroundColor: '#bcbcbcff',
        color: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    delBtn: {
        backgroundColor: '#f5c1c1ff',
        color: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
});
