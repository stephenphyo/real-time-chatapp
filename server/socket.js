const socketIO = require('socket.io');

/* Socket.io */
const socketHandler = (server) => {
    const io = new socketIO.Server(server, {
        cors: {
            origin: ['http://20.187.116.95:9200', 'http://localhost:9200'],
            methods: ['GET', 'POST'],
        }
    });

    io.on('connection', (socket) => {
        console.log(`User Connected: ${socket.id}`);
        socket.emit('reply_message', `User Connected: ${socket.id}`);

        socket.on('join_room', (data) => {
            socket.join(data.room);
            socket.emit('reply_message', `Connected => Socket ID:${socket.id}, Username: ${data.username}, Room: ${data.room}`);
        });

        socket.on('send_message', (data) => {
            socket.to(data.room).emit('receive_message', data);
        });

        socket.on('disconnect', () => {
            console.log('User Disconnected', socket.id);
        });
    });
};

module.exports = socketHandler;