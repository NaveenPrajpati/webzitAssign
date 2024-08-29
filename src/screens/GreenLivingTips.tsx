import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AddModal from '../components/AddModel';
import VectorIcon from '../components/VectorIcon';
import {shareFile} from '../utils/utilityFunction';

const tipsData = [
  {
    id: '1',
    title: 'Energy Efficiency',
    description: 'Tips on reducing energy consumption at home.',
    image: 'https://example.com/energy-efficiency.jpg',
  },
  {
    id: '2',
    title: 'Waste Reduction',
    description:
      'Advice on minimizing waste, including recycling and composting.',
    image: 'https://example.com/waste-reduction.jpg',
  },
];

const GreenLivingTips = () => {
  const [images, setImages] = useState<string[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([...tipsData]);
  const navigation = useNavigation();

  // Fetch images from Pixabay API
  const getImages = async (): Promise<void> => {
    try {
      const response = await fetch(
        'https://pixabay.com/api/?key=34755335-c7198e8965147bd5de2899c78&q=green+living&image_type=photo&pretty=true',
      );
      const result = await response.json();
      const imageUrls = result.hits.map((hit: any) => hit.previewURL);
      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tips');
      const storedData = jsonValue ? JSON.parse(jsonValue) : [];

      // Ensure storedData is an array
      if (Array.isArray(storedData)) {
        setData(prev => [...prev, ...storedData]);
      } else {
        console.error('Stored data is not an array:', storedData);
      }
    } catch (error) {
      console.error('Error fetching stored data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getImages();
      getData();
    }, []),
  );

  const onLikePress = (id: string) => {
    setLiked(prev =>
      prev.includes(id) ? prev.filter(it => it !== id) : [...prev, id],
    );
  };

  const handleAddTip = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('tips', jsonValue);
    } catch (error) {
      console.error('Error saving new tip:', error);
    }
  };

  const callback = async (newTip: any) => {
    newTip.id = (data.length + 1).toString(); // Ensure ID is a string
    await handleAddTip(newTip);
    setData(prev => [newTip, ...prev]);
    setShowAdd(false);
  };

  function onSharePress(data) {
    shareFile({
      title: data.title,
      url: data?.image,
      message: data.description,
    });
  }

  const renderTipCard = ({item, index}) => (
    <View style={styles.card}>
      {images[index] && (
        <Image source={{uri: images[index]}} style={styles.image} />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.actions}>
        <View style={{flexDirection: 'row', columnGap: 2}}>
          <TouchableOpacity
            onPress={() => onLikePress(item.id)}
            style={styles.button}>
            <VectorIcon
              iconName={liked.includes(item.id) ? 'like1' : 'like2'}
              iconPack="AntDesign"
              size={15}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSharePress(item)}
            style={styles.button}>
            <VectorIcon iconName="share" size={15} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Details', {item});
          }}
          style={styles.button}>
          <Text style={{color: 'white'}}>More details..</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderTipCard}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        onPress={() => {
          setShowAdd(true);
        }}
        style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Your Own Tip</Text>
      </TouchableOpacity>

      {showAdd && (
        <AddModal showAdd={showAdd} setShowAdd={setShowAdd} cb={callback} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 8,
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default GreenLivingTips;
