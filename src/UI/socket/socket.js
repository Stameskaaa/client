import io from 'socket.io-client';
const src = 'https://server-production-2c42.up.railway.app';

export const socket = io(src);
