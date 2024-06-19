import { Button, Input } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => subscribe(), []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/get-messages');
      setMessages((prev) => [...prev, data]);
      await subscribe();
    } catch (error) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const sendMessage = async () => {
    if (value)
      await axios.post(
        'http://localhost:5000/new-messages',
        {
          message: value,
          id: Date.now(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    setValue('');
  };

  return (
    <div>
      <div>
        <div>
          <Input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
          <Button onClick={sendMessage}>Отправить</Button>
        </div>
        <div>
          {messages.length > 0 ? (
            messages.map((mess) => {
              return <div key={mess.id}>{mess.message}</div>;
            })
          ) : (
            <div>net soob</div>
          )}
        </div>
      </div>
    </div>
  );
};
