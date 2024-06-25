import { socket } from '../../UI/socket/socket';

import { Button, Input } from '@mui/material';
import styles from './roomsauth.module.scss';
import { useEffect, useState } from 'react';

export const JoinRooms = () => {
  console.log(1);
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    socket.on('clientJoined', (message) => {
      console.log(message);
    });
  }, []);

  useEffect(() => {
    socket.on('disconnectUser', (data) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    socket.on('messageReceived', (data) => {
      console.log('Получено сообщение:', data);
    });
  }, []);

  const joinRoom = async () => {
    if (room && name) {
      socket.emit('join', { roomId: room, name });

      setRoom('');
      setName('');
      console.log(3);
    }
  };

  const sendMess = async () => {
    socket.emit('message', { data: value });
    console.log(name, 'name');
  };

  return (
    <div className={styles.container}>
      <Input placeholder="message" onChange={(e) => setValue(e.target.value)} value={value} />
      <Button onClick={sendMess} style={{ marginRight: '100%' }}>
        deop message
      </Button>
      <Input
        placeholder="Введи имя комнаты"
        onChange={(e) => setRoom(e.target.value)}
        value={room}
      />
      <Input placeholder="Введи свое имя" onChange={(e) => setName(e.target.value)} value={name} />
      <Button onClick={joinRoom} style={{ marginRight: '100%' }}>
        Join
      </Button>
    </div>
  );
};
