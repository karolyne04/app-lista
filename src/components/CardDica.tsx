import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardDica({ title, description }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginVertical: 10,
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6E3CBC",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#555",
    },
});