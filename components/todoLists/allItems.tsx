import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';

// typescript
type ItemType = {
    id: number;
    name: string;
    stock: number;
    price: number;
};

// props for the AllItems component
type Props = {
    data: ItemType[];
};

const AllItems: React.FC<Props> = ({ data }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>Items</Text>
                <Text style={styles.headingText}>Qty</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.itemContainer,
                            { backgroundColor: item.stock < 20 ? '#FFCCCC' : '#D7F6BFFF' },
                        ]}
                    >

                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemText}>{item.stock}</Text>
                    </View>
                )}

                contentContainerStyle={styles.flatListContent}
                keyboardShouldPersistTaps="handled"
            />
        </View>
    );
};

export default AllItems;

const styles = StyleSheet.create({
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headingText: {
        fontWeight: '600',
        fontSize: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7,
        marginBottom: 2,
    },
    itemText: {
        fontWeight: '400',
        fontSize: 15,
    },
    flatListContent: {
        flexGrow: 1,
        paddingBottom: 100,
        gap: 10,
    },
});
