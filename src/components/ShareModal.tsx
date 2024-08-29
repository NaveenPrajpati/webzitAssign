import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import VectorIcon from './VectorIcon';

const ShareModal = ({showShare, setShowShare}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showShare}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShowShare(!showShare);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 5,
                padding: 10,
              }}>
              <View
                style={{padding: 5, borderRadius: 4, backgroundColor: 'gray'}}>
                <VectorIcon
                  iconName="facebook-square"
                  size={30}
                  color="white"
                />
              </View>
              <View
                style={{padding: 5, borderRadius: 4, backgroundColor: 'gray'}}>
                <VectorIcon
                  iconName="facebook-square"
                  size={30}
                  color="white"
                />
              </View>
              <View
                style={{padding: 5, borderRadius: 4, backgroundColor: 'gray'}}>
                <VectorIcon
                  iconName="facebook-square"
                  size={30}
                  color="white"
                />
              </View>
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowShare(!showShare)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'green',
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
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 4,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 12,
  },
});

export default ShareModal;
