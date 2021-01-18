import {
    JsonHubProtocol,
    HubConnectionState,
    HubConnectionBuilder,
    LogLevel,
    HttpTransportType
  } from '@microsoft/signalr';
  
  
  const startSignalRConnection = async connection => {
    try 
    {
      await connection.start();
      console.assert(connection.state === HubConnectionState.Connected);
      console.log('SignalR connection established');
    } catch (err) 
    {
      console.assert(connection.state === HubConnectionState.Disconnected);
      console.error('SignalR Connection Error: ', err);
    }
  };
  

  export const SignalRHubConfiguration = (connectionHub) => 
  {
    var tosend="test";
    var ourres="onie";

    const connection = new HubConnectionBuilder()
      .withUrl(connectionHub)
      .withAutomaticReconnect()
      .withHubProtocol(new JsonHubProtocol())
      .configureLogging(LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 60000;


   connection.onclose(error => {
      console.assert(connection.state === HubConnectionState.Disconnected);
      console.log('Connection closed due to error. Try refreshing this page to restart the connection', error);
    });
  
    connection.onreconnecting(error => {
      console.assert(connection.state === HubConnectionState.Reconnecting);
      console.log('Connection lost due to error. Reconnecting.', error);
    });
  
    connection.onreconnected(connectionId => {
        console.assert(connection.state === HubConnectionState.Connected);
        console.log('Connection reestablished. Connected with connectionId', connectionId);
      });
      connection
      .on(
        'ReceiveMessage', (receivedMessage) => 
        {
            const text = `${receivedMessage}`;
            ourres=text;
            console.log(ourres)
        }
        );
      startSignalRConnection(connection);


    return connection;
};