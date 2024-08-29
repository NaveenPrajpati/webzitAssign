import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import VectorIcon from './VectorIcon';

const AddModal = ({showAdd, setShowAdd, cb}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  function onSubmit() {
    const data = {
      title,
      category,
      description,
      image,
    };
    cb(data);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAdd}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShowAdd(!showAdd);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{textAlign: 'center', color: 'black', marginBottom: 5}}>
              Add Tip
            </Text>
            <VectorIcon
              iconName="close"
              size={20}
              color="black"
              onPress={() => setShowAdd(false)}
              style={styles.closeIcon}
            />
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter the title"
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter the description"
              multiline
            />
            <Text style={styles.label}>Image URL:</Text>
            <TextInput
              style={styles.input}
              value={image}
              onChangeText={setImage}
              placeholder="Enter the image URL"
            />
            <Text style={styles.label}>Category:</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
              placeholder="Enter the category"
            />
            <TouchableOpacity onPress={onSubmit} style={styles.button}>
              <Text style={{color: 'white', textAlign: 'center'}}>Add Tip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  closeIcon: {position: 'absolute', right: 5, top: 5},
  modalView: {
    margin: 10,
    minWidth: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 8,
    borderRadius: 4,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    marginVertical: 2,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 4,
    borderRadius: 4,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 8,
  },
});

export default AddModal;
