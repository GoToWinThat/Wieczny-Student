import React, { Component } from 'react';
import {SignalRHubConfiguration} from './SignalRHubConfiguration.js';
import {
    JsonHubProtocol,
    HubConnectionState,
    HubConnectionBuilder,
    HubConnection,
    LogLevel,
    HttpTransportType
  } from '@microsoft/signalr';

class SignalRHubConnector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nick: 'nie',
      message: '',
      messages: [],
      hubConnection: '',
    };


  }
  componentDidMount = () => {

   /* this.setState({hubConnection:setupSignalRConnection('http://localhost:5001/monopolyhub')},
    ()=>{
      this.state.hubConnection
      .on(
        'ReceiveMessage', (receivedMessage) => 
        {
        const text = `${receivedMessage}`;
        const messages = this.state.messages.concat([text]);
        this.setState({ messages });
        }
        );
    });*/
    this.setState({hubConnection:setupSignalRConnection('https://localhost:5001/monopolyhub')})
  };
  sendMessage = () => {
      console.log("no hej")
    this.state.hubConnection
      .invoke('ReceiveMessage', this.state.nick)
      .catch(err => console.error(err));      
  };
}

export default SignalRHubConnector;
