import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* CSS Imports */
import './Join.css';

/* Utility Imports */
import socket from 'utils/Socket';

/* Hook Imports */
import useInfo from 'hooks/useInfo';

function Join() {

    /* useNavigate */
    const navigate = useNavigate();

    /* Custom Hooks */
    const { room, setRoom, username, setUsername} = useInfo();

    /* Functions */
    const joinRoom = async () => {
        await socket.emit('join_room', { room, username });
        navigate('/chat');
    };

    /* useEffect */

    return (
        <section className='join'>
            <div className='join_wrapper'>
                <p>Join Chat Room</p>
                <input type='text'
                    placeholder='Enter Room ID'
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') { joinRoom() }
                    }} />
                <input type='text'
                    placeholder='Enter Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') { joinRoom() }
                    }} />
                <button onClick={() => joinRoom()}>Join Room</button>
            </div>
        </section>
    );
}

export default Join;