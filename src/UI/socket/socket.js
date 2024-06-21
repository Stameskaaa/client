import io from 'socket.io-client';
const src = process.env.src;

export const socket = io(src);
