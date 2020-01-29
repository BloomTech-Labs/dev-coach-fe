import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import MessageList from './MessageList';
import SendMessageForm from './SendMessage';
import UserList from './UserList';
import { getRooms } from '../../state/actions/chatActions';
import TypingIndicator from './TypingIndicator';

const StyledChatScreen = styled.div`
  margin: 1rem 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;

  .whos-online-list-container {
    border: 1px solid #ced4da;
    border-radius: 6px;
    width: 30%;
    flex: none;
    color: #2f4f4f;
    border-radius: 5px;
    text-align: center;

    p {
      padding-left: 1rem;
      padding-right: 1rem;
      font-size: 1.15rem;
    }

    .smallerP {
      font-size: 1.1rem;
    }
  }
  .chat-list-container {
    width: 60%;
    display: flex;
    flex-direction: column;
    height: 85vh;
    box-sizing: border-box;
    border: 1px solid #ced4da;
    border-radius: 6px;
  }
`;

class ChatScreen extends React.Component {
  state = {
    currentUser: null,
    currentRoom: null,
    messages: [],
    error: null,
    usersWhoAreTyping: [],
  };
  componentDidMount = () => {
    this.props.getRooms(this.props.user.email);
    if (this.props.roomId) this.startChat(this.props.roomId);
  };

  startChat = roomId => {
    if (this.state.currentUser) {
      this.state.currentUser.roomSubscriptions[
        this.state.currentRoom.id
      ].cancel();
    }

    this.setState({ messages: [] });
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:02d03086-c977-4990-bbb8-d915c9090f74',
      userId: this.props.user.email,
      tokenProvider: new Chatkit.TokenProvider({
        url: `${process.env.REACT_APP_BASE_URL}chat/auth`,
      }),
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId,
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message],
              });
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [
                  ...this.state.usersWhoAreTyping,
                  user.name,
                ],
              });
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name,
                ),
              });
            },
          },
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(error => this.setState({ error }));
  };
  sendMessage = text => {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    });
  };
  sendTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => this.setState({ error }));
  };
  render() {
    return (
      <StyledChatScreen className='chat-container'>
        <aside className='whos-online-list-container'>
          <p className='smallerP'>
            Select a conversation to send a message
          </p>
          <UserList
            rooms={this.props.rooms}
            user={this.props.user}
            startChat={this.startChat}
          />
        </aside>
        <section className='chat-list-container'>
          <MessageList
            messages={this.state.messages}
            userId={this.props.user.email}
          />
          <TypingIndicator
            usersWhoAreTyping={this.state.usersWhoAreTyping}
          />
          <SendMessageForm
            onSubmit={this.sendMessage}
            onChange={this.sendTypingEvent}
            currentRoom={this.state.currentRoom}
          />
        </section>
      </StyledChatScreen>
    );
  }
}

const mapStateToProps = state => {
  return {
    roomId: state.chatReducer.roomId,
    messages: state.chatReducer.messages,
    rooms: state.chatReducer.rooms,
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, { getRooms })(ChatScreen);
