import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { fetchAllItems } from '../service/api.service'; // Certifique-se de ajustar o caminho conforme necessário

const Sop = () => {
  const [items, setItems] = useState({
    fruits: [],
    householdItems: [],
    meat: [],
    cleaningProducts: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllItems();
      setItems(data);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View>
      <Text>Frutas:</Text>
      <FlatList
        data={items.fruits}
        keyExtractor={(item) => item.id}
        renderItem={renderItem} 
        //   <View>
        //     <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
        //     <Text>{item.name}</Text>
        //   </View>
        // )}
      />

      <Text>Casa:</Text>
      <FlatList
        data={items.householdItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <Text>Carne:</Text>
      <FlatList
        data={items.meat}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <Text>Limpeza:</Text>
      <FlatList
        data={items.cleaningProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Sop;
