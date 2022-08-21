import React from 'react';

/* CSS Imports */
import './ChatMessage.css';

/* Hook Imports */
import useInfo from 'hooks/useInfo';

function ChatMessage({ author, message, timestamp }) {

    /* Custom Hooks */
    const { username } = useInfo();

    return (
        <div className='chat_message'
        id={author === username ? 'sender' : 'others'}>
            <p className='chat_message_author'>
                {author}
            </p>
            <p className='chat_message_content'>
                <span>{message}</span>
                <span className='chat_message_timestamp'>
                    {timestamp}
                </span>
            </p>
        </div>
    );
}

export default ChatMessage;