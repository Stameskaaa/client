import io from 'socket.io-client';
const src = process.env.REACT_APP_SRC;
export const socket = io(src);
