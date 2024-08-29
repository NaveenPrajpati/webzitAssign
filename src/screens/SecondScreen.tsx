import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

// Dummy data for Eco-Friendly Products
const productsData = [
  {
    id: '1',
    name: 'Reusable kitchen items',
    category: 'Home Goods',
    description:
      'A set of eco-friendly kitchen items including bamboo utensils, stainless steel straws, and reusable food wraps.',
    image: 'https://example.com/kitchen-set.jpg',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Sustainable clothing and accessories',
    category: 'Fashion',
    description:
      'Stylish and comfortable apparel made from 100% organic cotton, recycled materials, and natural dyes.',
    image: 'https://example.com/cotton-tshirt.jpg',
    rating: 5.0,
  },
  {
    id: '3',
    name: 'Energy-efficient gadgets',
    category: 'Technology',
    description:
      'A range of gadgets designed to minimize energy consumption, including LED bulbs, smart thermostats, and solar-powered chargers.',
    image: 'https://example.com/cotton-tshirt.jpg',
    rating: 5.0,
  },
  {
    id: '4',
    name: ' eco-friendly cleaners',
    category: 'Home Goods',
    description:
      'Non-toxic, biodegradable cleaning products made from natural ingredients like vinegar, baking soda, and essential oils.',
    image: 'https://example.com/cotton-tshirt.jpg',
    rating: 5.0,
  },
];

const SecondScreen = () => {
  const [images, setImages] = useState<string[]>([]);
  const [data, setData] = useState([...productsData]);
  async function getImages(): Promise<void> {
    try {
      const response = await fetch(
        'https://pixabay.com/api/?key=34755335-c7198e8965147bd5de2899c78&q=ecofriendly&image_type=photo&pretty=true',
      );
      const data = await response.json();
      const imageUrls = data.hits.map((hit: any) => hit.previewURL);
      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  useEffect(() => {
    getImages();
  }, []);

  const renderProductCard = ({item, index}) => (
    <View style={styles.card}>
      <Image source={{uri: images[index]}} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={[styles.description, {fontWeight: '800'}]}>
        {item.category}
      </Text>

      <Text style={styles.rating}>Rating: {item.rating} ⭐</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          /* Add Linking Logic */
        }}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        numColumns={2} // Grid layout with 2 columns
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: '48%', // Adjust width for grid layout
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: '#ffb400',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default SecondScreen;
