import { Button, Input } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const EventSourcing = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const eventSource = new EventSource(`http://localhost:5000/connect`);
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
      setValue('');
    };
  };

  const sendMessage = async () => {
    if (value)
      await axios.post('http://localhost:5000/new-messages', {
        message: value,
        id: Date.now(),
      });
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
            messages.map((mess, id) => {
              return <div key={id}>{mess.message}</div>;
            })
          ) : (
            <div>net soob</div>
          )}
        </div>
      </div>
    </div>
  );
};
