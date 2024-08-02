
import { FlatList, Text, View, StyleSheet } from 'react-native';
import Card from './Card';

interface Item {
  id: string;
  name: string;
  image: string;
}

interface CategoryListProps {
  title: string;
  items: Item[];
}

const CategoryList: React.FC<CategoryListProps> = ({ title, items }) => {
  const renderItem = ({ item }: { item: Item }) => (
    <Card key={item.id} title={item.name} image={item.image} />
  );

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  listContainer: {
    paddingLeft: 20,
  },
});

export default CategoryList;
