/* NPM Module Imports */
import io from 'socket.io-client';

/* Socket.io */
const socket = io.connect('http://20.187.116.95:9000');

export default socket;