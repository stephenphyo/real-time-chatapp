import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* CSS Imports */
import './App.css';

/* Utility Imports */
import socket from 'utils/Socket';

/* Page Imports */
import Join from './pages/Join/Join';
import Chat from './pages/Chat/Chat';

function App() {

    /* useEffect */
    useEffect(() => {
        socket.on('reply_message', (data) => {
            console.log(data);
        });
    }, [socket]);

    return (
        <Router>
            <main className='app'>
                <Routes>
                    <Route path='/'>
                        <Route path='/' element={<Join />} />
                        <Route path='/chat' element={<Chat />} />
                    </Route>
                </Routes>
            </main>
        </Router>
    );
}

export default App;