


// src/screens/ProductScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const products = {
  Frutas: [
    { id: '1', name: 'Banana', image: 'https://example.com/banana.jpg' },
    { id: '2', name: 'Maçã', image: 'https://example.com/maca.jpg' },
  ],
  Carnes: [
    { id: '3', name: 'Bife', image: 'https://example.com/bife.jpg' },
    { id: '4', name: 'Frango', image: 'https://example.com/frango.jpg' },
  ],
  Limpeza: [
    { id: '5', name: 'Detergente', image: 'https://example.com/detergente.jpg' },
    { id: '6', name: 'Sabão', image: 'https://example.com/sabao.jpg' },
  ],
};

const ProductScreen = ( ) => {
//   const { category } = route.params;
  const categoryProducts = useState([]);

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
  },
});

export default ProductScreen;
