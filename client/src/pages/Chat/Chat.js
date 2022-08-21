import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* CSS Imports */
import './Chat.css';

/* MUI Imports */
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

/* Component Imports */
import ChatMessage from './ChatMessage';
import ScrollToBottom from 'components/SPScrollToBottom';

/* Utility Imports */
import socket from 'utils/Socket';
import convertDateTime from 'utils/convertDateTime';
import getDateTimeInLocalTimeZone from 'utils/getDateTimeInLocalTimeZone';

/* Hook Imports */
import useInfo from 'hooks/useInfo';

function Chat() {

    /* useState */
    const [message, setMessage] = useState('');
    const [messageArray, setMessageArray] = useState([]);
    const [dropdown, setDropdown] = useState(false);

    /* useRef */
    const chatRef = useRef();

    /* useNavigate */
    const navigate = useNavigate();

    /* Custom Hooks */
    const { room, setRoom, username, setUsername } = useInfo();

    /* Functions */
    const send = async () => {
        if (message.length !== 0) {
            let timestamp = convertDateTime(getDateTimeInLocalTimeZone(new Date()));
            const messageData = {
                room: room,
                author: username,
                message: message,
                timestamp: `${timestamp.HH}:${timestamp.mm}`
            }

            socket.emit('send_message', messageData);
            setMessage('');
            setMessageArray(prev => [...prev, messageData]);
        }
    };

    const leaveRoom = () => {
        setRoom('');
        setUsername('');
    };

    /* useEffect */
    useEffect(() => {
        if (room.length === 0 || username.length === 0) {
            navigate('/');
        }
    }, [room, username]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageArray(prev => [...prev, data]);
        });
    }, [socket]);

    useEffect(() => {
        chatRef.current.focus();
    }, []);

    return (
        <section className='chat'>
            <div className='chat_wrapper'>
                <div className='chat_header'>
                    <p id='room'>{room}</p>
                    <p id='username'>{`User: ${username}`}</p>
                    <p id='more'>
                        <MoreVertRoundedIcon
                            onClick={() => setDropdown(!dropdown)} />
                        {dropdown &&
                            <span id='dropdown'
                                onClick={() => leaveRoom()}>
                                Leave Room
                            </span>
                        }
                    </p>
                </div>
                <ScrollToBottom className='chat_body'>
                    {messageArray.map((msg, index) => (
                        <ChatMessage key={index}
                            author={msg.author}
                            message={msg.message}
                            timestamp={msg.timestamp} />
                    ))}
                </ScrollToBottom>
                <div className='chat_footer'>
                    <input type='text'
                        placeholder='Enter message...'
                        value={message}
                        ref={chatRef}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') { send() }
                        }} />
                    <SendRoundedIcon onClick={() => send()} />
                </div>
            </div>
        </section>
    );
}

export default Chat;