import { Button, Input } from '@mui/material';
import { useState, useRef } from 'react';

export const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [connected, setConnected] = useState(false);
  const socket = useRef();
  const [username, setUsername] = useState('');

  function connect() {
    socket.current = new WebSocket('ws://localhost:5000');

    socket.current.onopen = () => {
      setConnected(true);

      const message = {
        event: 'connection',
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
      console.log('Socket подключен');
    };
    socket.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((prev) => [...prev, message]);
      console.log('Socket onmessage');
    };
    socket.current.onclose = () => {
      console.log('Socket закрыт');
    };
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка');
    };
  }

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: 'message',
    };
    socket.current.send(JSON.stringify(message));
    setValue('');
  };

  if (!connected) {
    return (
      <div>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Введи имя"
        />
        <Button onClick={connect}>Войти</Button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          <Input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
          <Button onClick={sendMessage}>Отправить</Button>
        </div>
        <div>
          {messages.map((mess, id) => {
            return (
              <div key={id}>
                {mess.event === 'connection' ? (
                  <div> Пользователь {mess.username} подключился</div>
                ) : (
                  <div>
                    {' '}
                    {mess.username}. {mess.message}{' '}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
