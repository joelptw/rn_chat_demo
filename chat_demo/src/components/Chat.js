import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {chatRoom} from '../actions/actions/chat';
import {
  GiftedChat,
  Send,
  InputToolbar,
  Composer,
} from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';

export const Chat = ({
  session,
  route,
  navigation,
  chatRoom,
  chat: {loading, room},
}) => {
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');

  //const employee = navigation.getParam('employeeId');
  const {employeeId} = route.params;

  const {current: socket} = useRef(
    io('http://192.168.0.13:5000', {autoConnect: false}),
  );

  const onClickBoucher = () => {
    setModalVisible(!modalVisible);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => onClickBoucher()}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
            }}>
            Boucher
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    chatRoom(employeeId, '5f4868845779dadbe9c222a5');
    navigation.setParams();
  }, []);

  useEffect(() => {
    if (room != null) {
      //setCurrentSocket(socket);
      socket.open();
      console.log('montado');
      console.log(room);
      socket.emit('getRoom', room);
      socket.on('messages', msg => {
        setMessages([msg][0]);
      });
    }
    //session = socket;
    return () => {
      console.log('Desmontado');
      if (room != null) {
        socket.disconnect();
      }
    };
  }, [room]);

  const customInputToolbar = props => {
    return (
      <Composer
        {...props}
        containerStyle={{
          backgroundColor: 'black',
          borderTopColor: '#E8E8E8',
          borderTopWidth: 1,
        }}
      />
    );
  };

  const onSend = useCallback((messages = [], room) => {
    //console.log('->>>>>>>>><' + onPrint());
    console.log(messages);
    socket.emit('newMessage', {chat: room, msg: messages});
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={{marginRight: 10, marginBottom: 5}}>
          <Ionicons size={25} name="send" color="#0078ff"></Ionicons>
        </View>
      </Send>
    );
  };

  const submitHandle = e => {
    e.preventDefault();
    console.log(price);
    console.log(price + ' ' + address + ' ' + details);
    setModalVisible(false);
    setPrice('');
    setAddress('');
    setDetails('');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Modal
        backdropOpacity={0.4}
        isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={val => setPrice(val)}
              name="precio"
              defaultValue={price}
              placeholder="Precio"
            />
            <TextInput
              style={styles.input}
              onChangeText={val => setAddress(val)}
              defaultValue={address}
              name="direccion"
              placeholder="Dirección"
            />
            <TextInput
              style={styles.input}
              onChangeText={val => setDetails(val)}
              defaultValue={details}
              name="detalles"
              placeholder="Detalles de sevicio"
            />
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: '#2196F3',
                marginTop: 32,
                width: 150,
              }}
              onPress={submitHandle}>
              <Text style={styles.textStyle}>Aceptar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <GiftedChat
        messages={messages}
        placeholder="Escriba un mensaje..."
        renderSend={renderSend}
        renderComposer={props => customInputToolbar(props)}
        onSend={messages => onSend(messages, room)}
        user={{
          _id: '5f4868845779dadbe9c222a5',
        }}></GiftedChat>
    </View>
  );
};

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  session: PropTypes.object,
};

const mapStateToProps = state => ({
  chat: state.chat,
});

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: '#00acee',
    borderColor: '#00acee',
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 35,
    lineHeight: 35,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
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
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
    height: 420,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  input: {
    borderRadius: 30,
    borderColor: '#BAB7C3',
    height: 50,
    width: 200,
    marginTop: 32,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    fontWeight: '600',
    color: '#514E5A',
  },
});

export default connect(mapStateToProps, {chatRoom})(Chat);
