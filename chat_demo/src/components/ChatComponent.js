import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {chatRoom} from '../actions/actions/chat';
import {GiftedChat} from 'react-native-gifted-chat';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.socket = io('http://192.168.0.13:5000');
  }

  componentDidMount() {
    //  this.socket = io('http://192.168.0.13:5000');
    this.socket.connect();
    console.log('montado');
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  onSend(messages = []) {
    this.socket.emit('newMessage', {chat: room, msg: messages}); // TypeError: undefined is not an object (evaluating 'this.socket.emit')
    this._storeMessages(messages);
  }

  _storeMessages(messages) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: '5f4868845779dadbe9c222a5',
          }}></GiftedChat>
      </View>
    );
  }
}
