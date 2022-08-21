const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

/* App Settings */
const PORT = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);

/* Middleware */
app.use(express.json());
app.use(cors());

/* Socket.io */
require('./socket')(server);

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));

